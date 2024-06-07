const resolvers = {
    Query: {
        elementProducts: async ( root, args, ctx, info ) => {
            const data = require( `./data/elements.json` );
            return data.products.slice( 0, 6 );
        },

        elementPosts: async ( root, args, ctx, info ) => {
            const data = require( `./data/elements.json` );
            return data.posts;
        },

        homeData: async ( root, args, ctx, info ) => {
            return require( `./data/demo${args.demo}.json` );
        },

        product: async ( root, args, ctx, info ) => {
            const elements = require( `./data/elements.json` ).products;
            const demoProducts = require( `./data/demo${args.demo}.json` ).products;
            let products = [ ...elements ];
            demoProducts.map( ( item, index ) => {
                products.findIndex( p => p.id == item.id ) == -1 ?
                    products.push( item )
                    : '';
            } );

            let product = products.find( item => item.slug == args.slug );

            if ( args.onlyData ) {
                return { single: product };
            } else {
                const relatedProducts = products.filter( item => {
                    return item.category.find( cat => product.category.find( c => c.slug == cat.slug ) );
                } );
                const index = relatedProducts.findIndex( item => item.slug === product.slug );

                return {
                    single: product,
                    prev: index > 0 ? relatedProducts[ index - 1 ] : null,
                    next: index < relatedProducts.length - 1 ? relatedProducts[ index + 1 ] : null,
                    related: relatedProducts.filter( item => item.slug !== product.slug ).slice( 0, 5 )
                };
            }
        },

        products: async ( root, args, ctx, info ) => {
            const elements = require( `./data/elements.json` ).products;
            const demoProducts = require( `./data/demo${args.demo}.json` ).products;
            let products = [ ...elements ];

            let page = args.page ? args.page : 1;
            let minPrice, maxPrice;
            minPrice = args.minPrice ? args.minPrice : 0;
            maxPrice = args.maxPrice ? args.maxPrice : 10000;
            let sizeArray = [];

            demoProducts.map( ( item, index ) => {
                products.findIndex( p => p.id == item.id ) == -1 ?
                    products.push( item )
                    : '';
            } );

            sizeArray = args.size ? args.size : [];

            for ( let i = 0; i < sizeArray.length; i++ ) {
                if ( sizeArray[ i ] == "XS" ) sizeArray[ i ] = "Extra Small";
                else if ( sizeArray[ i ] == "S" ) sizeArray[ i ] = "Small";
                else if ( sizeArray[ i ] == "M" ) sizeArray[ i ] = "Medium";
                else if ( sizeArray[ i ] == "L" ) sizeArray[ i ] = "Large";
                else if ( sizeArray[ i ] == "XL" ) sizeArray[ i ] = "Extra Large";
            }

            let filteredProducts = products.filter( product => {
                let flag = true;

                if ( args.category ) {
                    flag = product.category.find( cat => cat.slug == args.category );
                }

                if ( flag && args.searchTerm ) {
                    flag = product.name.toLowerCase().includes( args.searchTerm.toLowerCase() );
                }

                if ( flag && args.brand && args.brand.length ) {
                    flag = product.brands.find( brand => args.brand.find( b => b == brand.slug ) );
                }

                if ( flag && args.rating && args.rating.length ) {
                    flag = args.rating.find( r => r == product.ratings );
                }

                if ( flag && ( args.color.length || args.size.length ) ) {
                    flag = product.variants.find( variant => (
                        ( !args.color.length || ( variant.color && args.color.find( item => item == variant.color_name ) ) ) &&
                        ( !args.size.length || ( variant.size && variant.size.find( item => sizeArray.find( sa => sa == item.name ) ) ) )
                    ) )
                }

                if ( flag ) {
                    flag = false;
                    if ( product.variants.length > 0 ) {
                        for ( let i = 0; i < product.variants.length; i++ ) {
                            if ( minPrice < product.variants[ i ].price && product.variants[ i ].price < maxPrice )
                                flag = true;
                        }
                    } else if ( product.sale_price !== null ) {
                        ( minPrice < product.sale_price && product.sale_price < maxPrice ) && ( flag = true );
                    } else {
                        ( minPrice < product.price && product.price < maxPrice ) && ( flag = true );
                    }
                }

                return flag;
            } )

            filteredProducts = filteredProducts.sort( ( a, b ) => {
                return a.id - b.id;
            } )

            switch ( args.sortBy ) {
                case 'new':
                    filteredProducts.sort( ( a, b ) => {
                        var newA = ( a.new === true ? 1 : 0 );
                        var newB = ( b.new === true ? 1 : 0 );
                        if ( newA < newB ) {
                            return 1;
                        } else if ( newA === newB ) {
                            return 0;
                        } else {
                            return -1;
                        }
                    } );
                    break;
                case 'featured':
                    filteredProducts.sort( ( a, b ) => {
                        var featuredA = ( a.featured === true ? 1 : 0 );
                        var featuredB = ( b.featured === true ? 1 : 0 );
                        if ( featuredA < featuredB ) {
                            return 1;
                        } else if ( featuredA === featuredB ) {
                            return 0;
                        } else {
                            return -1;
                        }
                    } );
                    break;
                case 'rating':
                    filteredProducts.sort( ( a, b ) => {
                        return b.ratings - a.ratings;
                    } );
                    break;
                case 'high-to-low':
                    filteredProducts.sort( ( a, b ) => {
                        var priceA = a.salePrice ? a.salePrice : a.price;
                        var priceB = b.salePrice ? b.salePrice : b.price;

                        return priceB - priceA;
                    } );
                    break;
                case 'low-to-high':
                    filteredProducts.sort( ( a, b ) => {
                        var priceA = a.salePrice ? a.salePrice : a.price;
                        var priceB = b.salePrice ? b.salePrice : b.price;

                        return priceA - priceB;
                    } );
                    break;
                default:
                    break;
            }

            return {
                data: filteredProducts.slice( ( args.from + ( page - 1 ) * args.perPage ), ( args.from + page * args.perPage ) ),
                totalCount: filteredProducts.length
            }
        },

        postsByPage: async ( root, args, ctx, info ) => {
            let posts = require( './data/blog-page.json' )[ 'blog' ][ args.page ];

            if ( args.category ) {
                posts = posts.filter( post => post.blog_categories.find( item => item.slug == args.category ) );
            }

            const categories = require( './data/blog-page.json' )[ 'categories' ][ args.page ];

            return {
                data: posts,
                categories: categories
            };
        },

        post: async ( root, args, ctx, info ) => {
            const blog = require( './data/blog.json' );
            const post = blog.find( item => item.slug == args.slug );

            const relatedPosts = blog.filter( item => {
                return item.blog_categories.find( cat => post.blog_categories.find( c => c.slug == cat.slug ) );
            } );

            const index = relatedPosts.findIndex( item => item.slug == post.slug );

            return {
                single: post,
                prev: index > 0 ? relatedPosts[ index - 1 ] : null,
                next: index < relatedPosts.length - 1 ? relatedPosts[ index + 1 ] : null,
                related: relatedPosts.filter( item => item.slug !== post.slug ).slice( 0, 3 ),
                categories: require( './data/blog-page.json' )[ 'categories' ][ 'classic' ]
            }
        }
    }
}

module.exports = resolvers;