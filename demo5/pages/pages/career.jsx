import React, {useState, useEffect} from 'react'
import ALink from '~/components/features/alink'
import ShopListOne from '~/components/partials/shop/list/shop-list-one'
import StickyBox from 'react-sticky-box';
import ShopSidebarOne from "@/components/partials/shop/sidebar/shop-sidebar-one"
import Sidebar from "~/components/partials/career/sidebar"
import CareerList from "@/components/partials/career/list"
import { useSelector } from 'react-redux'
import axios from 'axios';
import {actions as jobActions} from '~/store/job'
import { useDispatch } from 'react-redux'
// import { useSelector } from 'react-redux'

function career() {
    const [ toggle, setToggle ] = useState( false );

    const [filteredJobs, setFilteredJobs] = useState([])

    const user = useSelector((state) => state.auth.user);
    const token = useSelector(state => state.auth.token);
    const jobs = useSelector((state) => state.job);
    // console.log(user)
    const dispatch = useDispatch();

    const handleCategorySelect = (category) => {
        if (category === '') {
            // Clear filter, show all jobs
            setFilteredJobs([]);
        } else {
            // Filter jobs by category
            const jobsFiltered = jobs.filter(job => job.jobCategory.some(cat => cat.name === category));
            // console.log(jobsFiltered)
            setFilteredJobs(jobsFiltered);
        }
    };

    const [fullTime, setFullTime] = useState(false);
    const [partTime, setPartTime] = useState(false);
    const [internship, setInternship] = useState(false);

    useEffect(() => {
        const fetchJobDetail = async() => {
            try {
                const response = await axios.get('https://njs.iretiensemble.com/jobs/get-all-job', {
                    headers: {
                        'Content-Type': 'application/json',
                        // authorization: `Bearer ${token}`
                    }
                });

                if(response.status === 200 || response.status === 201){
                    // console.log(response.data)
                    dispatch(jobActions.setJobDetails(response.data.jobs))
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
                dispatch(jobActions.setJobDetails([]))
            }
        }

        fetchJobDetail();
    },[]);


    useEffect(()=>{
        const handleJobType = async ( )=> {
            try {
                const response = await axios.get('https://njs.iretiensemble.com/jobs/get-count-category',{
                    headers: {
                        'Content-Type': 'application/json',
                        // authorization: `Bearer ${token}`
                    }
                })
                if(response.status === 200 || response.status === 201){
                    // console.log(response.data)
                    setFullTime(response.data.totalOpeningsFullTime)
                    setPartTime(response.data.totalOpeningsPartTime)
                    setInternship(response.data.totalOpeningsInternship)
                }else{
                    console.log('error fetching job type')
                }
            } catch (error) {
                console.error('Error fetching job type:', error);
            }
            
        }

        handleJobType();
    },[]);

    const careers = {"type":[
        {
            name:'Full Time',
            slug:'fulltime',
            count:fullTime
        },
        {
            name:'Part Time',
            slug:'parttime',
            count:partTime
        },
        {
            name:'Internship',
            slug:'internship',
            count:internship
        }
    ],"category":[
        {
            name:'Sales, Advertising & Accounting Management',
            count:0
        },
        {
            name:'Administrative Support',
            count:0
        },
        {
            name:'Software Enginner',
            count:0
        }
    ]}

  return (
    <div className='main' style={{background:"#f8f7f3"}}>
        <nav className="breadcrumb-nav mb-2">
            <div className="container">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <ALink href="/"  style={{fontFamily:"'Gotham Light',sans-serif"}}>Home</ALink>
                    </li>
                    <li className="breadcrumb-item">
                        <ALink href="/shop/sidebar/list"  style={{fontFamily:"'Gotham Light',sans-serif",fontWeight:"800"}}>Careers</ALink>
                    </li>
                </ol>
            </div>
        </nav>

        <div className="page-content">
            <div className="container">
                <div className="row skeleton-body">
                    <div className={ `col-lg-9 skel-shop-products loaded` }>
                        <CareerList jobs={filteredJobs.length > 0 ? filteredJobs : jobs.jobDetails}/>
                    </div>
                    <aside className={ `col-lg-3 skel-shop-sidebar order-lg-first skeleton-body ${'loaded'}` }>
                        <StickyBox className="sticky-content" offsetTop={ 70 }>
                            <Sidebar careers={careers} onCategorySelect={handleCategorySelect}></Sidebar>
                        </StickyBox>
                    </aside>
                </div>
            </div>
        </div>
    </div>
  )
}

export default career
