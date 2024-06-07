import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';

import ALink from '~/components/features/alink';
import PageHeader from "~/components/features/page-header";
import ElementList from '~/components/partials/elements/element-list';

function ElementTabs () {
    return (
        <div className="main">
            <PageHeader title="Tabs" subTitle="Elements" />
            <nav className="breadcrumb-nav">
                <div className="container">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <ALink href="/">Home</ALink>
                        </li>
                        <li className="breadcrumb-item">
                            <ALink href="/elements">Elements</ALink>
                        </li>
                        <li className="breadcrumb-item active">Tabs</li>
                    </ol>
                </div>
            </nav>

            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="title mb-3">Left Align Style</h2>
                        </div>
                        <div className="col-md-6 mb-2">
                            <Tabs defaultIndex={ 0 } selectedTabClassName="show">
                                <TabList className="nav nav-tabs nav-tabs-bg" id="tabs-1" role="tablist">
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 1</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 2</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 3</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 4</span>
                                    </Tab>
                                </TabList>
                                <div className="tab-pane tab-content tab-content-border">
                                    <TabPanel>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Nobis perspiciatis natus cum, sint dolore earum rerum tempora aspernatur numquam velit tempore omnis, delectus repellat facere voluptatibus nemo non fugiat consequatur repellendus! Enim, commodi, veniam ipsa voluptates quis amet.</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Perspiciatis quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>
                        <div className="col-md-6">
                            <Tabs defaultIndex={ 0 } selectedTabClassName="show">
                                <TabList className="nav nav-tabs" id="tabs-2" role="tablist">
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 1</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 2</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 3</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 4</span>
                                    </Tab>
                                </TabList>
                                <div className="tab-pane tab-content tab-content-border">
                                    <TabPanel>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Nobis perspiciatis natus cum, sint dolore earum rerum tempora aspernatur numquam velit tempore omnis, delectus repellat facere voluptatibus nemo non fugiat consequatur repellendus! Enim, commodi, veniam ipsa voluptates quis amet.</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Perspiciatis quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>
                    </div>

                    <hr className="mt-5 mb-4" />

                    <div className="row">
                        <div className="col-12">
                            <h2 className="title mb-3">Centered Align Style</h2>
                        </div>
                        <div className="col-md-6 mb-2">
                            <Tabs defaultIndex={ 0 } selectedTabClassName="show">
                                <TabList className="nav nav-tabs nav-tabs-bg justify-content-center" id="tabs-3" role="tablist">
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 1</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 2</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 3</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 4</span>
                                    </Tab>
                                </TabList>
                                <div className="tab-pane tab-content tab-content-border">
                                    <TabPanel>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Nobis perspiciatis natus cum, sint dolore earum rerum tempora aspernatur numquam velit tempore omnis, delectus repellat facere voluptatibus nemo non fugiat consequatur repellendus! Enim, commodi, veniam ipsa voluptates quis amet.</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Perspiciatis quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                    </TabPanel>
                                </div>
                            </Tabs>

                        </div>

                        <div className="col-md-6">
                            <Tabs defaultIndex={ 0 } selectedTabClassName="show">
                                <TabList className="nav nav-tabs justify-content-center" id="tabs-4" role="tablist">
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 1</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 2</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 3</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 4</span>
                                    </Tab>
                                </TabList>
                                <div className="tab-pane tab-content tab-content-border">
                                    <TabPanel>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Nobis perspiciatis natus cum, sint dolore earum rerum tempora aspernatur numquam velit tempore omnis, delectus repellat facere voluptatibus nemo non fugiat consequatur repellendus! Enim, commodi, veniam ipsa voluptates quis amet.</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Perspiciatis quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>
                    </div>

                    <hr className="mt-5 mb-4" />

                    <div className="row">
                        <div className="col-12">
                            <h2 className="title mb-3">Line Style Tabs</h2>
                        </div>
                        <div className="col-md-6 mb-2">
                            <Tabs defaultIndex={ 0 } selectedTabClassName="show">
                                <TabList className="nav nav-pills" id="tabs-5" role="tablist">
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 1</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 2</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 3</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 4</span>
                                    </Tab>
                                </TabList>
                                <div className="tab-pane tab-content">
                                    <TabPanel>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Nobis perspiciatis natus cum, sint dolore earum rerum tempora aspernatur numquam velit tempore omnis, delectus repellat facere voluptatibus nemo non fugiat consequatur repellendus! Enim, commodi, veniam ipsa voluptates quis amet.</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Perspiciatis quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>

                        <div className="col-md-6">
                            <Tabs defaultIndex={ 0 } selectedTabClassName="show">
                                <TabList className="nav nav-pills justify-content-center" id="tabs-6" role="tablist">
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 1</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 2</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 3</span>
                                    </Tab>
                                    <Tab className="nav-item">
                                        <span className="nav-link">Tab 4</span>
                                    </Tab>
                                </TabList>
                                <div className="tab-pane tab-content">
                                    <TabPanel>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum. </p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Nobis perspiciatis natus cum, sint dolore earum rerum tempora aspernatur numquam velit tempore omnis, delectus repellat facere voluptatibus nemo non fugiat consequatur repellendus! Enim, commodi, veniam ipsa voluptates quis amet.</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Perspiciatis quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                    </TabPanel>
                                    <TabPanel>
                                        <p>Quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                    </TabPanel>
                                </div>
                            </Tabs>
                        </div>
                    </div>

                    <hr className="mt-4 mb-4" />

                    <div className="row">
                        <div className="col-12">
                            <h2 className="title mb-3">Vertical Style</h2>
                        </div>
                        <div className="col-md-6 mb-2">
                            <Tabs defaultIndex={ 0 } selectedTabClassName="show">
                                <div className="tabs-vertical">
                                    <TabList className="nav nav-tabs nav-tabs-bg flex-column" id="tabs-7" role="tablist">
                                        <Tab className="nav-item">
                                            <span className="nav-link">Tab 1</span>
                                        </Tab>
                                        <Tab className="nav-item">
                                            <span className="nav-link">Tab 2</span>
                                        </Tab>
                                        <Tab className="nav-item">
                                            <span className="nav-link">Tab 3</span>
                                        </Tab>
                                        <Tab className="nav-item">
                                            <span className="nav-link">Tab 4</span>
                                        </Tab>
                                    </TabList>
                                    <div className="tab-pane tab-content tab-content-border">
                                        <TabPanel>
                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum int dolore earum rerum tempora aspernatur numquam velit. </p>											</TabPanel>
                                        <TabPanel>
                                            <p>Nobis perspiciatis natus cum, sint dolore earum rerum tempora aspernatur numquam velit tempore omnis, delectus repellat facere voluptatibus nemo non fugiat consequatur repellendus! Enim, commodi, veniam ipsa voluptates quis amet.</p>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>Perspiciatis quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>Quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                        </TabPanel>
                                    </div>
                                </div>
                            </Tabs>
                        </div>

                        <div className="col-md-6">
                            <Tabs defaultIndex={ 0 } selectedTabClassName="show">
                                <div className="tabs-vertical">
                                    <TabList className="nav nav-tabs flex-column" id="tabs-8" role="tablist">
                                        <Tab className="nav-item">
                                            <span className="nav-link">Tab 1</span>
                                        </Tab>
                                        <Tab className="nav-item">
                                            <span className="nav-link">Tab 2</span>
                                        </Tab>
                                        <Tab className="nav-item">
                                            <span className="nav-link">Tab 3</span>
                                        </Tab>
                                        <Tab className="nav-item">
                                            <span className="nav-link">Tab 4</span>
                                        </Tab>
                                    </TabList>
                                    <div className="tab-pane tab-content tab-content-border">
                                        <TabPanel>
                                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede. Donec nec justo eget felis facilisis fermentum int dolore earum rerum tempora aspernatur numquam velit. </p>											</TabPanel>
                                        <TabPanel>
                                            <p>Nobis perspiciatis natus cum, sint dolore earum rerum tempora aspernatur numquam velit tempore omnis, delectus repellat facere voluptatibus nemo non fugiat consequatur repellendus! Enim, commodi, veniam ipsa voluptates quis amet.</p>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>Perspiciatis quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                        </TabPanel>
                                        <TabPanel>
                                            <p>Quis nobis, adipisci quae aspernatur, nulla suscipit eum. Dolorum, earum. Consectetur pariatur repellat distinctio atque alias excepturi aspernatur nisi accusamus sed molestias ipsa numquam eius, iusto, aliquid, quis aut.</p>
                                        </TabPanel>
                                    </div>
                                </div>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>

            <ElementList />
        </div>
    );
}

export default ElementTabs;