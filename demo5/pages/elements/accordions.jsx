import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import ElementList from '~/components/partials/elements/element-list';
import Card from '~/components/features/accordion/card';
import Accordion from '~/components/features/accordion/accordion';

function Accordions () {
    return (
        <div className="main">
            <PageHeader title="Accordions" subTitle="Elements" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/elements">Elements</ALink>
                        </li>
                        <li className="breadcrumb-item active">Accordions</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <h2 className="title mb-3">Simple Accordions</h2>

                    <div className="row">
                        <div className="col-md-6">
                            <Accordion>
                                <Card title="Cras ornare tristique elit." expanded="true">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                                <Card title="Vivamus vestibulum ntulla">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                                <Card title="Praesent placerat risus">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                            </Accordion>
                        </div>

                        <div className="col-md-6">
                            <Accordion adClass="accordion-plus">
                                <Card title="Cras ornare tristique elit." expanded="true">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                                <Card title="Vivamus vestibulum ntulla">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                                <Card title="Praesent placerat risus">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                            </Accordion>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    <h2 className="title mb-3">Accordion with Icons</h2>

                    <div className="row">
                        <div className="col-md-6">
                            <Accordion adClass="accordion-icon">
                                <Card title="<i class='icon-star-o'></i>Cras ornare tristique elit." expanded="true">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                                <Card title="<i class='icon-info-circle'></i>Vivamus vestibulum ntulla">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                                <Card title="<i class='icon-heart-o'></i>Praesent placerat risus">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                            </Accordion>
                        </div>

                        <div className="col-md-6">
                            <Accordion adClass="accordion-icon">
                                <Card title="<i class='icon-star-o'></i>Cras ornare tristique elit." expanded="true" adClass="card-box bg-light">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                                <Card title="<i class='icon-info-circle'></i>Vivamus vestibulum ntulla" adClass="card-box bg-light">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                                <Card title="<i class='icon-heart-o'></i>Praesent placerat risus" adClass="card-box bg-light">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                            </Accordion>
                        </div>
                    </div>

                    <hr className="mb-4" />

                    <h2 className="title mb-3">Accordions on Background</h2>

                    <div className="row">
                        <div className="col-md-6">
                            <Accordion adClass="accordion-rounded">
                                <Card title="Cras ornare tristique elit." expanded="true" adClass="card-box card-sm bg-light">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                                <Card title="Vivamus vestibulum ntulla" adClass="card-box card-sm bg-light">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                                <Card title="Praesent placerat risus" adClass="card-box card-sm bg-light">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                            </Accordion>
                        </div>

                        <div className="col-md-6">
                            <Accordion adClass="accordion-rounded accordion-plus">
                                <Card title="Cras ornare tristique elit." expanded="true" adClass="card-box card-sm bg-white">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                                <Card title="Vivamus vestibulum ntulla" adClass="card-box card-sm bg-white">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                                <Card title="Praesent placerat risus" adClass="card-box card-sm bg-white">
                                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                                    </Card>
                            </Accordion>
                        </div>
                    </div>
                </div>
            </div>
            <ElementList />
        </div>
    );
}

export default Accordions;