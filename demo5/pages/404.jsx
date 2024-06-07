import React from 'react';
import ALink from '~/components/features/alink';

function ErrorPage () {
    
    return (
        <div className="main">
            <nav className="breadcrumb-nav border-0 mb-0">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="#">Pages</ALink>
                        </li>
                        <li className="breadcrumb-item active">404</li>
                    </ol>
                </div>
            </nav>

            <div className="error-content text-center position-relative" style={ { backgroundImage: `url(images/backgrounds/error-bg.jpg)`, marginBottom: '-1px' } }>
                <div className="container">
                    <h1 className="error-title">Error 404</h1>

                    <p>We are sorry, the page you've requested is not available.</p>
                    <ALink href="/" className="btn btn-outline-primary-2 btn-minwidth-lg">
                        <span>BACK TO HOMEPAGE</span>
                        <i className="icon-long-arrow-right"></i>
                    </ALink>
                </div>
            </div>
        </div>
    )
}

export default React.memo( ErrorPage );