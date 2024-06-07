import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import InputRange from 'react-input-range';
import SlideToggle from 'react-slide-toggle';
import 'react-input-range/lib/css/index.css';

import ALink from '~/components/features/alink';
import { careers } from '~/utils/data';
import axios from 'axios';
import { useSelector } from 'react-redux'

function sidebar(props) {
    const {careers, onCategorySelect} = props;
    // console.log(careers)
    const { toggle = false } = props;
    const router = useRouter();
    const query = useRouter().query;
    const [ priceRange, setRange ] = useState( { min: 0, max: 1000 } );

    const handleCategoryClick = (category) => {
        onCategorySelect(category);
    };
    
  return (
    <>
      <aside className={ `${toggle ? 'sidebar-filter' : 'sidebar'} sidebar-shop` }>
        <div className={ toggle ? 'sidebar-filter-wrapper' : '' }>
            <div className="widget widget-clean">
                <label  style={{fontFamily:"'Gotham Medium',sans-serif",fontSize:"1.5rem"}}>Filters:</label>
                <ALink onClick={() => onCategorySelect('')} href={ { pathname: router.pathname, query: {type: query.type} } } className="sidebar-filter-clear" scroll={ false }  style={{fontFamily:"'Gotham Black',sans-serif",color:"red"}}>Clean All</ALink>
            </div>
            <SlideToggle collapsed={ false }>
                { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                    <div className="widget widget-collapsible">
                        <h3 className="widget-title mb-2">
                            <a href="#category" className={ `${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}` } onClick={ ( e ) => { onToggle( e ); e.preventDefault() } }>Job Type</a>
                        </h3>

                        <div ref={ setCollapsibleElement }>
                            <div className="widget-body pt-0">
                                <div className="filter-items filter-items-count">
                                    {
                                        careers.type?.map( ( item, index ) =>
                                            <div className="filter-item" key={ `cat_${index}` }>
                                                <ALink onClick={() => handleCategoryClick(item.name)}  style={{fontFamily:"'Gotham Light',sans-serif",fontSize:"1.5rem"}} className={ `${query.category == item.slug ? 'active' : ''}` } href={ {pathname: router.pathname, query: { type: query.type, category: item.slug } } } scroll={ false }>{ item.name }</ALink>
                                                <span className="item-count"  style={{fontFamily:"'Gotham Medium',sans-serif"}}>{ item.count }</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) }
            </SlideToggle>
            <SlideToggle collapsed={ false }>
                { ( { onToggle, setCollapsibleElement, toggleState } ) => (
                    <div className="widget widget-collapsible">
                        <h3 className="widget-title mb-2">
                            <a href="#category" className={ `${toggleState.toLowerCase() == 'collapsed' ? 'collapsed' : ''}` } onClick={ ( e ) => { onToggle( e ); e.preventDefault() } }>Job Category</a>
                        </h3>

                        <div ref={ setCollapsibleElement }>
                            <div className="widget-body pt-0">
                                <div className="filter-items filter-items-count">
                                    {
                                        careers.category?.map( ( item, index ) =>
                                            <div className="filter-item" key={ `cat_${index}` }>
                                                <ALink  style={{fontFamily:"'Gotham Light',sans-serif",fontSize:"1.5rem"}} className={ `${query.category == item.slug ? 'active' : ''}` } href={ {pathname: router.pathname, query: { type: query.type, category: item.slug } } } scroll={ false }>{ item.name }</ALink>
                                                <span className="item-count"  style={{fontFamily:"'Gotham Medium',sans-serif"}}>{ item.count }</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) }
            </SlideToggle>
        </div>
      </aside>
    </>
  )
}

export default sidebar
