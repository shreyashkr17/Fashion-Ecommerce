import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';

import ALink from '~/components/features/alink';

function BlogSidebar ( props ) {
    const user = useSelector(state => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const { categories = [], toggle = false } = props;
    const router = useRouter();
    const query = router.query;

    const [category, setCategory] = useState([]);

    useEffect(()=>{
        const fetchCategory = async() => {
            try {
                const response = await axios.get('https://njs.iretiensemble.com/posts/gather-distinct-slug', {
                    headers:{
                        'Content-Type':'application/json',
                        // authorization: `Bearer ${token}`
                    }
                });

                if(response.status === 200|| response.status===201){
                    // console.log(response.data.result);
                    setCategory(response.data.result);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchCategory();
    })

    return (
        <div className={ `sidebar mt-0 ${toggle ? 'sidebar-filter px-3 right pt-3' : ''}` }>
            <div className="widget widget-search">
                <h3 className="widget-title">Search</h3>

                <form action="#" method="get">
                    <div className="header-search-wrapper search-wrapper-wide">
                        <label  htmlFor="ws" className="sr-only" style={{fontFamily:"'Gotham Medium',sans-serif"}}>Search in blog</label>
                        <input style={{fontFamily:"'Gotham Medium',sans-serif"}} type="search" className="form-control" name="ws" id="ws" placeholder="Search in blog" required />
                        <button type="submit" className="btn"><i className="icon-search"></i><span className="sr-only">Search</span></button>
                    </div>
                </form>
            </div>

            <div className="widget widget-cats">
                <h3 className="widget-title">Categories</h3>

                <ul>
                    {
                        router.pathname.includes( 'single' ) ?
                            categories?.map( ( category, index ) => (
                                <li key={ index }><ALink href={ { pathname: '/blog/listing/', query: { category: category.slug } } } className={ `${query.category == category.slug ? 'active' : ''}` } scroll={ false } style={{fontFamily:"'Gotham Medium',sans-serif"}}>{ category.name }<span style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>{ category.count }</span></ALink></li>
                            ) )
                            :
                            categories?.map( ( category, index ) => (
                                <li key={ index }><ALink style={{fontFamily:"'Gotham Medium',sans-serif"}} href={ { pathname: router.pathname, query: { category: category.slug } } } className={ `${query.category == category.slug ? 'active' : ''}` } scroll={ false }>{ category.name }<span style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.6rem"}}>{ category.count }</span></ALink></li>
                            ) )
                    }
                </ul>
            </div>

            <div className="widget">
                <h3 className="widget-title">Popular Posts</h3>

                <ul className="posts-list">
                    <li>
                        <figure className="position-relative">
                            <ALink href="/blog/single/default/sed-adipiscing-ornare." className="w-100">
                                <div className="lazy-overlay"></div>

                                <LazyLoadImage
                                    alt="Post"
                                    src={ process.env.NEXT_PUBLIC_ASSET_URI + '/uploads/post_1_b9361c0eac.jpg' }
                                    threshold={ 500 }
                                    effect="blur"
                                    height="80"
                                />
                            </ALink>
                        </figure>

                        <div>
                            <span style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.7rem"}}>Nov 22, 2018</span>
                            <h4><ALink href="/blog/single/default/sed-adipiscing-ornare." style={{fontFamily:"'Gotham Medium',sans-serif"}}>Sed adipiscing ornare..</ALink></h4>
                        </div>
                    </li>
                    <li>
                        <figure className="position-relative">
                            <ALink href="/blog/single/default/fusce-pellentesque-suscipit." className="w-100">
                                <div className="lazy-overlay"></div>

                                <LazyLoadImage
                                    alt="Post"
                                    src={ process.env.NEXT_PUBLIC_ASSET_URI + '/uploads/post_4_be80872f91.jpg' }
                                    threshold={ 500 }
                                    effect="blur"
                                    height="80"
                                />
                            </ALink>
                        </figure>

                        <div>
                            <span style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.7rem"}}>Nov 19, 2018</span>
                            <h4><ALink style={{fontFamily:"'Gotham Medium',sans-serif"}} href="/blog/single/default/fusce-pellentesque-suscipit.">Fusce pellentesque suscipit.</ALink></h4>
                        </div>
                    </li>
                    <li>
                        <figure className="position-relative">
                            <ALink href="/blog/single/default/donec-nec-justo-eget-felis-facilisis-fermentum." className="w-100">
                                <div className="lazy-overlay"></div>

                                <LazyLoadImage
                                    alt="Post"
                                    src={ process.env.NEXT_PUBLIC_ASSET_URI + '/uploads/post_5_3c9d9563f6.jpg' }
                                    threshold={ 500 }
                                    effect="blur"
                                    height="80"
                                />
                            </ALink>
                        </figure>

                        <div>
                            <span style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.7rem"}}>Nov 12, 2018</span>
                            <h4><ALink style={{fontFamily:"'Gotham Medium',sans-serif"}} href="/blog/single/default/donec-nec-justo-eget-felis-facilisis-fermentum.">Donec nec justo eget felis facilisis  fermentum.</ALink></h4>
                        </div>
                    </li>
                    <li>
                        <figure className="position-relative">
                            <ALink href="/blog/single/default/vivamus-vestibulum-ngtulla-necante." className="w-100">
                                <div className="lazy-overlay"></div>

                                <LazyLoadImage
                                    alt="Post"
                                    src={ process.env.NEXT_PUBLIC_ASSET_URI + '/uploads/post_2_a2b4601de7.jpg' }
                                    threshold={ 500 }
                                    effect="blur"
                                    height="80"
                                />
                            </ALink>
                        </figure>

                        <div>
                            <span style={{fontFamily:"'Gotham Thin',sans-serif", fontSize:"1.7rem"}}>Nov 25, 2018</span>
                            <h4><ALink style={{fontFamily:"'Gotham Medium',sans-serif"}} href="/blog/single/default/vivamus-vestibulum-ngtulla-necante.">Vivamus vestibulum ngtulla necante.</ALink></h4>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="widget">
                <h3 className="widget-title">Browse Tags</h3>

                <div className="tagcloud">
                    <ALink href="#" style={{background:"#323C33"}}>fashion</ALink>
                    <ALink href="#" style={{background:"#323C33"}}>style</ALink>
                    <ALink href="#" style={{background:"#323C33"}}>women</ALink>
                    <ALink href="#" style={{background:"#323C33"}}>photography</ALink>
                    <ALink href="#" style={{background:"#323C33"}}>travel</ALink>
                    <ALink href="#" style={{background:"#323C33"}}>shopping</ALink>
                    <ALink href="#" style={{background:"#323C33"}}>hobbies</ALink>
                </div>
            </div>

            {/* <div className="widget widget-text">
                <h3 className="widget-title">About Blog</h3>

                <div className="widget-text-content">
                    <p>Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, pulvinar nunc sapien ornare nisl.</p>
                </div>
            </div> */}
        </div>
    );
}

export default React.memo( BlogSidebar );