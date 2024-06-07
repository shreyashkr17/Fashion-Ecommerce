import Countdown from 'react-countdown';

import { rendererOne } from '~/components/features/count-down';
import ALink from '~/components/features/alink';

function ComingSoon () {
    return (
        <div className="soon">
            <div className="container">
                <div className="row">
                    <div className="col-md-9 col-lg-8">
                        <div className="soon-content text-center">
                            <div className="soon-content-wrapper">
                                <img src="images/logo-icon.png" alt="Logo" className="soon-logo mx-auto" />

                                <h1 className="soon-title">Coming Soon</h1>

                                <div className="coming-countdown countdown-separator">
                                    <Countdown date={ `2022-02-01T01:02:03` } renderer={ rendererOne } />
                                </div>

                                <hr className="mt-2 mb-3 mt-md-3" />

                                <p className="mb-2">We are currently working on an awesome new site. Stay tuned for more information.
                                    Subscribe to our newsletter to stay updated on our progress.</p>

                                <form action="#">
                                    <div className="input-group mb-5">
                                        <input type="email" className="form-control bg-transparent" placeholder="Enter your Email Address" required />
                                        <div className="input-group-append">
                                            <button className="btn btn-outline-primary-2" type="submit">
                                                <span>SUBSCRIBE</span>
                                                <i className="icon-long-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                <div className="social-icons justify-content-center mb-0">
                                    <ALink href="#" className="social-icon" title="Facebook"><i className="icon-facebook-f"></i></ALink>
                                    <ALink href="#" className="social-icon" title="Twitter"><i className="icon-twitter"></i></ALink>
                                    <ALink href="#" className="social-icon" title="Instagram"><i className="icon-instagram"></i></ALink>
                                    <ALink href="#" className="social-icon" title="Youtube"><i className="icon-youtube"></i></ALink>
                                    <ALink href="#" className="social-icon" title="Pinterest"><i className="icon-pinterest"></i></ALink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="soon-bg bg-image" style={ { backgroundImage: `url(images/backgrounds/soon-bg.jpg)` } }></div>
        </div>
    )
}

export default ComingSoon;