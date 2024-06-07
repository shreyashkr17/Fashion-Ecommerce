import React from 'react';
import SlideToggle from 'react-slide-toggle';

import { safeContent } from '~/utils';

function Card ( props ) {
    const { title, expanded, adClass = "", type = "default" } = props;

    return (
        "default" === type ?
            <SlideToggle style={{background:"#f8f7f3"}}
                collapsed={ expanded ? false : true } >
                {
                    ( { onToggle, setCollapsibleElement, toggleState } ) => (
                        <div className={ `card ${adClass}` }>
                            <div className="card-header" onClick={ onToggle } >
                                <h2 className="card-title" style={{fontFamily:"'Gotham Medium',sans-serif"}}>
                                    <span className={ `toggle-button ${toggleState.toLowerCase()}` } dangerouslySetInnerHTML={ safeContent( title ) } style={ { height: 'auto' } }></span>
                                </h2>
                            </div>
                            <div ref={ setCollapsibleElement }>
                                <div className="card-body">
                                    { props.children }
                                </div>
                            </div>
                        </div>
                    )
                }
            </SlideToggle> :

            <SlideToggle
                collapsed={ expanded ? false : true } >
                {
                    ( { onToggle, setCollapsibleElement, toggleState } ) => (
                        <div className={ `acc-item ${adClass}` }>
                            <h5>
                                <span className={ `toggle-button ${toggleState.toLowerCase()}` } dangerouslySetInnerHTML={ safeContent( title ) } onClick={ onToggle } style={ { height: 'auto' } }></span>
                            </h5>
                            <div ref={ setCollapsibleElement }>
                                <div className="collapse-wrap">
                                    { props.children }
                                </div>
                            </div>

                        </div>
                    )
                }
            </SlideToggle>
    );
}

export default React.memo( Card );