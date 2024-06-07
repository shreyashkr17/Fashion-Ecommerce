import React, {useEffect, useState} from 'react'
import ALink from '~/components/features/alink'
import axios from 'axios'
import { useSelector } from 'react-redux';

function list({jobs}) {
    // const jobs = useSelector((state) => state.job);
    // console.log(jobs)
  return (
    jobs?.map((job, index) => (
        <div className="products mb-3" style={{ padding:"10px"}}>
            <div className="product product-list" style={{background:"#f8f7f3"}}>
                <div className="row pr-2">
                    <div className="col-md-9 order-last">
                        <div className="product-body product-action-inner" style={{background:"#f8f7f3"}}>
                            <div className="product-cat">
                                {
                                    job.jobCategory?.map((item, index) => (
                                        <React.Fragment key={item.slug+'-'+index}>
                                            <ALink style={{fontFamily:"'Gotham Light',sans-serif", fontSize:"1.7rem"}} href={ `/pages/career/`}>
                                                { item.name }
                                            </ALink>
                                            { index < job.jobCategory.length - 1 ? ', ' : "" }
                                        </React.Fragment>
                                    ))
                                }
                            </div>
                            <h3 className="product-title">
                                <ALink style={{fontFamily:"'Gotham Black',sans-serif", fontSize:"1.8rem"}}
                                 href={ `` }
                                >
                                    { job.jobTitle }<span style={{fontFamily:"'Gotham light',sans-serif", fontSize:'1.5rem'}}> (Openings: {job.openings})</span>
                                </ALink>
                            </h3>
                            <div className="product-content">
                                <p style={{fontFamily:"'Gotham Light',sans-serif", fontSize:"1.4rem"}}>{ job.jobDesc[0]['Job Summary'] }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 col-6 order-md-last order-lg-last">
                        <div className="product-list-action">
                        {
                             <>
                                 <span className="ratings-text" style={{fontFamily:"'Gotham Thin',sans-serif", marginLeft:"0px"}}>Posted On</span>
                                 <span className="product-price">{ job.postedDate }</span>
                             </>
                        }
                        <ALink href={ `` } className="btn-product btn-cart btn-select">
                            <span>Apply to careers</span>
                        </ALink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ))
  )
}

export default list
