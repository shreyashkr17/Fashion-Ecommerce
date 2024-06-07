const { gql } = require( 'apollo-server-express' );

const typeDefs = gql`
    type Product {
        id: Int!
        name: String
        slug: ID
        short_desc: String
        price: Float
        sale_price: Float
        review: Int
        ratings: Float
        until: String
        stock: Int
        top: Boolean
        featured: Boolean
        new: Boolean
        author: String
        sold: Int
        category: [Category]
        brands: [Brand]
        pictures: [Media]
        sm_pictures: [Media]
        variants: [Variant]
    }

    type Category {
        name: String
        slug: ID
    }

    type Brand {
        name: String
        slug: ID
    }

    type Media {
        width: Int
        height: Int
        url: String
    }

    type Variant {
        color: String
        color_name: String
        price: Float
        size: [Size]
    }

    type Size {
        name: String
    }

    type Post {
        id: Int!
        author: String
        comments: Int
        content: String
        date: String
        slug: ID
        title: String
        type: PostType
        blog_categories: [Category]
        image: [Media]
    }

    enum PostType {
        image
        video
        gallery
    }

    type ProductSingle {
        single: Product
        prev: Product
        next: Product
        related: [Product]
    }

    type ShopResponse {
        data: [Product],
        totalCount: Int
    }

    type BlogPageResponse {
        data: [Post]
        categories: [BlogCategory]
    }

    type BlogCategory {
        name: String,
        slug: String,
        count: Int
    }

    type PostSingle {
        single: Post,
        prev: Post
        next: Post
        related: [Post]
        categories: [BlogCategory]
    }

    type homeResponse {
        products: [Product],
        posts: [Post]
    }

    type Query {
        elementProducts: [Product]
        elementPosts: [Post]
        homeData(demo: Int): homeResponse
        products(demo: Int!, searchTerm: String, color: [String] = [], size: [String] = [], brand: [String] = [], minPrice: Int = 0, maxPrice: Int = 10000, category: String, rating: [String], sortBy: String, page: Int = 1, perPage: Int = 10, list: Boolean, from: Int = 0 ): ShopResponse,
        product(demo: Int!, slug: String!, onlyData: Boolean): ProductSingle
        postsByPage(page: String, category: String): BlogPageResponse
        post(slug: String!): PostSingle
    }
`

module.exports = typeDefs;