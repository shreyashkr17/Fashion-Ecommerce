import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import ElementList from '~/components/partials/elements/element-list';

function IconBoxes () {
    return (
        <div className="main">
            <PageHeader title="Icon Boxes" subTitle="Elements" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/elements">Elements</ALink>
                        </li>
                        <li className="breadcrumb-item active">Icon Boxes</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <h2 className="title mb-4 text-center">
                        Simple Icons
                            <span className="title-separator">/</span> Centered Align
                            <span className="title-separator">/</span> 3 Columns
                        </h2>

                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-info-circle"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Quisque a lectus</h3>

                                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-star-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Suspendisse potenti</h3>

                                    <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Phasellus hendrerit</h3>

                                    <p>Pellentesque a diam sit amet mi ullamcorper vehicula. Nullam quis massa sit amet nibh viverra malesuada.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-6" />

                    <h2 className="title mb-5 text-center">
                        Simple Icons
                            <span className="title-separator">/</span> Left Align
                            <span className="title-separator">/</span> 3 Columns
                        </h2>

                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-left">
                                <span className="icon-box-icon">
                                    <i className="icon-info-circle"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Quisque a lectus</h3>

                                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-left">
                                <span className="icon-box-icon">
                                    <i className="icon-star-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Suspendisse potenti</h3>

                                    <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-left">
                                <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Phasellus hendrerit</h3>

                                    <p>Pellentesque a diam sit amet vehicula. Nullam quis massa sit amet nibh viverra malesuada.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-6" />

                    <h2 className="title mb-4 text-center">
                        Circle Icons
                            <span className="title-separator">/</span> Centered Align
                            <span className="title-separator">/</span> 3 Columns
                        </h2>

                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-circle text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-info-circle"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Quisque a lectus</h3>

                                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-circle text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-star-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Suspendisse potenti</h3>

                                    <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-circle text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Phasellus hendrerit</h3>

                                    <p>Pellentesque a diam sit amet mi ullamcorper vehicula. Nullam quis massa sit amet nibh viverra malesuada.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-6" />

                    <h2 className="title mb-5 text-center">
                        Circle Icons
                            <span className="title-separator">/</span> Left Align
                            <span className="title-separator">/</span> 3 Columns
                        </h2>

                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-left icon-box-circle">
                                <span className="icon-box-icon">
                                    <i className="icon-info-circle"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Quisque a lectus</h3>

                                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus augue.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-left icon-box-circle">
                                <span className="icon-box-icon">
                                    <i className="icon-star-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Suspendisse potenti</h3>

                                    <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate eu erat.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="icon-box icon-box-left icon-box-circle">
                                <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Phasellus hendrerit</h3>

                                    <p>Pellentesque a diam sit amet vehicula. Nullam quis massa sit amet nibh viverra malesuada.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-6" />

                    <h2 className="title mb-4 text-center">
                        Simple Icons
                            <span className="title-separator">/</span> Centered Align
                            <span className="title-separator">/</span> 4 Columns
                        </h2>

                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-sm-6">
                            <div className="icon-box text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-info-circle"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Quisque a lectus</h3>

                                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="icon-box text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-star-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Suspendisse potenti</h3>

                                    <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="icon-box text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Phasellus hendrerit</h3>

                                    <p>Pellentesque a diam sit amet mi ullamcorper vehicula.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="icon-box text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-cog"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Fusce pellentesque</h3>

                                    <p>Nullam quis massa sit amet nibh viverra malesuada.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-6" />

                    <h2 className="title mb-5 text-center">
                        Simple Icons
                            <span className="title-separator">/</span> Left Align
                            <span className="title-separator">/</span> 4 Columns
                        </h2>

                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-sm-6">
                            <div className="icon-box icon-box-left">
                                <span className="icon-box-icon">
                                    <i className="icon-info-circle"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Quisque a lectus</h3>

                                    <p>Sed egestas, ante et vulputate volutpat eros</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="icon-box icon-box-left">
                                <span className="icon-box-icon">
                                    <i className="icon-star-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Suspendisse potenti</h3>

                                    <p>Praesent dapibus, neque id cursus faucibus tortor</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="icon-box icon-box-left">
                                <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Phasellus hendrerit</h3>

                                    <p>Pellentesque a diam sit amet vehicula.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="icon-box icon-box-left">
                                <span className="icon-box-icon">
                                    <i className="icon-cog"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Fusce pellentesque</h3>

                                    <p>Nullam quis massa sit amet nibh viverra</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr className="mb-6" />

                    <h2 className="title mb-4 text-center">
                        Circle Icons
                            <span className="title-separator">/</span> Centered Align
                            <span className="title-separator">/</span> 4 Columns
                        </h2>

                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-sm-6">
                            <div className="icon-box icon-box-circle text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-info-circle"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Quisque a lectus</h3>

                                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="icon-box icon-box-circle text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-star-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Suspendisse potenti</h3>

                                    <p>Praesent dapibus, neque id cursus faucibus, tortor neque egestas</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="icon-box icon-box-circle text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-heart-o"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Phasellus hendrerit</h3>

                                    <p>Pellentesque a diam sit amet mi ullamcorper vehicula.</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6">
                            <div className="icon-box icon-box-circle text-center">
                                <span className="icon-box-icon">
                                    <i className="icon-cog"></i>
                                </span>
                                <div className="icon-box-content">
                                    <h3 className="icon-box-title">Fusce pellentesque</h3>

                                    <p>Nullam quis massa sit amet nibh viverra malesuada.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ElementList />
        </div>
    )
}

export default IconBoxes;