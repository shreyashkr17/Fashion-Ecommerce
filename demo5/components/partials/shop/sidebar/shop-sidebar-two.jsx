import React from 'react';
import ALink from '~/components/features/alink';

function ShopSidebarTwo () {
    function cleanAllFilter ( e ) {
        e.preventDefault();
        let allInputs = document.querySelectorAll(
            '.sidebar-filter input[type=checkbox]'
        );
        for ( let i = 0; i < allInputs.length; i++ ) {
            allInputs[ i ].checked = false;
        }
    }

    function closeSidebar () {
        document
            .querySelector( 'body' )
            .classList.remove( 'sidebar-filter-active' );
    }

    return (
        <aside className="sidebar-shop sidebar-filter sidebar-filter-banner">
            <div className="sidebar-filter-wrapper">
                <div className="widget widget-clean">
                    <button onClick={ closeSidebar }>
                        <i className="icon-close"></i>Filters
                </button>
                    <ALink href="#" className="sidebar-filter-clear" style={{color:"#323c33"}} onClick={ cleanAllFilter }>Clear All</ALink>
                </div>
                <div className="widget">
                    <h3 className="widget-title">Browse Category</h3>

                    <div className="widget-body">
                        <div className="filter-items filter-items-count">
                            <div className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="cat-1" />
                                    <label className="custom-control-label" htmlFor="cat-1">Women</label>
                                </div>

                                <span className="item-count">3</span>
                            </div>

                            <div className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="cat-2" />
                                    <label className="custom-control-label" htmlFor="cat-2">Men</label>
                                </div>

                                <span className="item-count">0</span>
                            </div>

                            <div className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="cat-3" />
                                    <label className="custom-control-label" htmlFor="cat-3">Holiday Shop</label>
                                </div>

                                <span className="item-count">0</span>
                            </div>

                            <div className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="cat-4" />
                                    <label className="custom-control-label" htmlFor="cat-4">Gifts</label>
                                </div>

                                <span className="item-count">0</span>
                            </div>

                            <div className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="cat-5" />
                                    <label className="custom-control-label" htmlFor="cat-5">Homeware</label>
                                </div>

                                <span className="item-count">0</span>
                            </div>

                            <div className="filter-item">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="cat-6"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="cat-6"
                                    >Grid Categories Fullwidth</label>
                                </div>

                                <span className="item-count">13</span>
                            </div>

                            <div className="sub-filter-items">
                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="cat-7" />
                                        <label className="custom-control-label" htmlFor="cat-7">Dresses</label>
                                    </div>

                                    <span className="item-count">3</span>
                                </div>

                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="cat-8" />
                                        <label className="custom-control-label" htmlFor="cat-8">T-shirts</label>
                                    </div>

                                    <span className="item-count">0</span>
                                </div>

                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="cat-9" />
                                        <label className="custom-control-label" htmlFor="cat-9">Bags</label>
                                    </div>

                                    <span className="item-count">4</span>
                                </div>

                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="cat-10" />
                                        <label className="custom-control-label" htmlFor="cat-10">Jackets</label>
                                    </div>

                                    <span className="item-count">2</span>
                                </div>

                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="cat-11" />
                                        <label className="custom-control-label" htmlFor="cat-11">Shoes</label>
                                    </div>

                                    <span className="item-count">2</span>
                                </div>

                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="cat-12" />
                                        <label className="custom-control-label" htmlFor="cat-12">Jumpers</label>
                                    </div>

                                    <span className="item-count">1</span>
                                </div>

                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="cat-13" />
                                        <label className="custom-control-label" htmlFor="cat-13">Jeans</label>
                                    </div>

                                    <span className="item-count">1</span>
                                </div>

                                <div className="filter-item">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="cat-14" />
                                        <label className="custom-control-label" htmlFor="cat-14">Sportwear</label>
                                    </div>

                                    <span className="item-count">0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default React.memo( ShopSidebarTwo );