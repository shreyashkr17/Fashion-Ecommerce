import React from 'react';

function PageHeader ( props ) {
    const { title, subTitle } = props;

    return (
        // <div className="page-header text-center" style={ { backgroundImage: `url(images/page-header-bg.jpg)` } } >
        //     <div className="container">
        //         <h1 className="page-title">{ title }<span>{ subTitle }</span></h1>
        //     </div>
        // </div>
        null
    );
}

export default React.memo( PageHeader );