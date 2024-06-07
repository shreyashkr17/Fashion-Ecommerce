
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import ElementList from '~/components/partials/elements/element-list';

function ElementTitles () {
    const category = [ "ALL PRODUCTS", "WOMEN", "MEN", "ACCESSORIES" ];
    return (
        <div className="main">
            <PageHeader title="Titles" subTitle="Elements" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/elements">Elements</ALink>
                        </li>
                        <li className="breadcrumb-item active">Titles</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <h2 className="title">Simple title</h2>
                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>

                    <hr className="mt-4 mb-4" />

                    <div className="heading">
                        <h2 className="title">Simple title <span className="title-separator">/</span> Subtitle</h2>
                        <p className="title-desc">Donec consectetuer ligula vulputate sem tristique cursus. </p>
                    </div>
                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>

                    <hr className="mt-4 mb-4" />

                    <Tabs selectedTabClassName="show">
                        <div className="heading heading-flex">
                            <div className="heading-left">
                                <h2 className="title">Simple title <span className="title-separator">/</span> Product Filter</h2>
                            </div>

                            <div className="heading-right">
                                <TabList className="nav nav-pills justify-content-center" role="tablist">
                                    { category?.map( ( cat, index ) =>
                                        <Tab className="nav-item" key={ index }>
                                            <span className="nav-link">{ cat }</span>
                                        </Tab>
                                    ) }
                                </TabList>
                            </div>
                        </div>

                        { category?.map( ( cat, index ) =>
                            <TabPanel key={ index }>
                                <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>
                            </TabPanel>
                        ) }
                    </Tabs>

                    <hr className="mt-4 mb-4" />

                    <Tabs selectedTabClassName="show">
                        <div className="heading heading-flex align-items-start">
                            <div className="heading-left">
                                <h2 className="title">Simple title <span className="title-separator">/</span> Subtitle <span className="title-separator">/</span> Product Filter</h2>
                                <p className="title-desc">Donec consectetuer ligula vulputate sem tristique cursus. </p>
                            </div>

                            <div className="heading-right">
                                <TabList className="nav nav-pills justify-content-center" role="tablist">
                                    { category?.map( ( cat, index ) =>
                                        <Tab className="nav-item" key={ index }>
                                            <span className="nav-link">{ cat }</span>
                                        </Tab>
                                    ) }
                                </TabList>
                            </div>
                        </div>

                        { category?.map( ( cat, index ) =>
                            <TabPanel key={ index }>
                                <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>
                            </TabPanel>
                        ) }
                    </Tabs>

                    <hr className="mt-4 mb-4" />

                    <div className="heading heading-flex">
                        <div className="heading-left">
                            <h2 className="title">Simple title <span className="title-separator">/</span> Link</h2>
                        </div>

                        <div className="heading-right">
                            <ALink href="#" className="title-link">Click here to view <i className="icon-long-arrow-right"></i></ALink>
                        </div>
                    </div>
                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>

                    <hr className="mt-4 mb-4" />

                    <div className="heading heading-flex">
                        <div className="heading-left">
                            <h2 className="title">Simple title <span className="title-separator">/</span> Substitle <span className="title-separator">/</span> Link</h2>
                            <p className="title-desc">Donec consectetuer ligula vulputate sem tristique cursus. </p>
                        </div>

                        <div className="heading-right">
                            <ALink href="#" className="title-link link-underline">Click here to view <i className="icon-long-arrow-right"></i></ALink>
                        </div>
                    </div>
                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>

                    <hr className="mt-4 mb-4" />

                    <div className="text-center">
                        <h2 className="title">Centered title</h2>
                        <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>
                    </div>

                    <hr className="mt-4 mb-4" />

                    <Tabs selectedTabClassName="show">
                        <div className="heading heading-center">
                            <div className="heading-left">
                                <h2 className="title">Centered title <span className="title-separator">/</span> Product Filter</h2>
                            </div>

                            <div className="heading-right">
                                <TabList className="nav nav-pills justify-content-center" role="tablist">
                                    { category?.map( ( cat, index ) =>
                                        <Tab className="nav-item" key={ index }>
                                            <span className="nav-link">{ cat }</span>
                                        </Tab>
                                    ) }
                                </TabList>
                            </div>
                        </div>

                        { category?.map( ( cat, index ) =>
                            <TabPanel key={ index }>
                                <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>
                            </TabPanel>
                        ) }
                    </Tabs>

                    <hr className="mt-4 mb-4" />

                    <h2 className="title-sm">Small Title</h2>
                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>

                    <hr className="mt-4 mb-4" />

                    <div className="heading">
                        <p className="title-desc mb-1">Quisque a lectus.</p>
                        <h2 className="title-sm">Small title <span className="title-separator">/</span> Subtitle</h2>
                    </div>
                    <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>

                    <hr className="mt-4 mb-4" />

                    <div className="text-center">
                        <h2 className="title-sm">Centered Small Title</h2>
                        <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>
                    </div>



                    <hr className="mt-4 mb-4" />

                    <div className="heading text-center">
                        <p className="title-desc mb-1">Quisque a lectus.</p>
                        <h2 className="title-sm">Centered Small title <span className="title-separator">/</span> Subtitle</h2>
                    </div>
                    <p className="text-center">Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.</p>
                </div>
            </div>
            <ElementList />
        </div>
    );
}

export default ElementTitles;