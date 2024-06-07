import React from 'react'
import ALink from '~/components/features/alink';
import styled from 'styled-components';

const jobs = {
    "job": {
        "jobId": "5204d753-e554-4970-aae8-df8561ab1263",
        "jobTitle": "Software Engineer Intern (Full Stack)",
        "jobLocation": "Bangalore, KA, IND",
        "jobCategory": [
            {
                "name": "Software Engineering",
                "slug": "software-engineering",
                "_typename": "Type"
            },
            {
                "name": "Internship",
                "slug": "internship",
                "_typename": "Category"
            }
        ],
        "jobDesc": [
            {
                "Job Summary": "The Seller Support on Boarding Associate acts as the primary interface between Amazon and our business partners. Associate are dedicated towards helping new seller get on-boarded on A.IN platform, the success measure is not just launching seller but more focused on how do we enable them to be successful on A.IN platform. The Seller Support Associate will be responsible for providing timely and accurate operational support to Merchants selling on the Amazon platform. The successful candidate has an immediate, distinct effect on the experience of customers of Amazon, making a strong record of customer focus a high standard for the role. A Seller Support on Boarding Associate is expected to address chronic system issues, provide process improvements, develop internal documentation, and contribute to a team environment, all while adhering to service level agreements for phone and/or email cases."
            },
            {
                "Key Job Responsibilities": "SHIFT REQUIREMENTS (24/7) The Seller Support Onboarding Associate acts as the primary interface between Amazon and our 3rd party sellers, providing phone and/or e-mail support governed by internal service level agreements. The Seller Support Onboarding Associate will be responsible for onboarding New Selling partners to the Amazon .IN platform and also providing timely and accurate operational support to 3rd party Sellers on the Amazon platform. The successful candidate has an immediate, distinct effect on the experience of customers of Amazon, making a strong record of customer focus a high standard for the role. A Seller Support on Boarding Associate is expected to address chronic system issues, provide process improvements, develop internal documentation, and contribute to a team environment."
            },
            {
                "Basic Qualifications": "Excellent written and verbal communication. Along with English, this role also requires communicating in Hindi. • Demonstrates effective, clear and professional written and oral communication. • Provides prompt and efficient service to Amazon Sellers and Merchants including the appropriate escalation of Sellers' issues. • Maintains a positive and professional demeanor always portraying the company in a positive light and effectively managing sensitive issues. • Demonstrates excellent time-management skills and the ability to work independently while using departmental resources, policies and procedures. • Contributes to a positive team environment and proactively aids team members with difficult contacts as needed. • Maintains acceptable performance metrics such as quality, productivity, first contact resolution, and attendance. • Actively seeks solutions through logical reasoning and data interpretation skills and identifies trends to appropriate channel including improvement suggestions. • Liaise with other departments such as Customer Service, Merchant Investigations, or Payments teams as required to resolve Seller's issues and questions."
            }
        ],
        "jobQualification": null,
        "openings": 10,
        "slug": "software-engineer-internship",
        "postedDate": "2024-04-12",
        "jobForm": "https://www.schiaparelli.com/en/haute-couture/haute-couture-spring-summer-2024-1/"
    }
};
const Container = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
width:60%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledButton = styled.div`
  background-color: #14151A;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  display:flex;
  justify-content:center;
  
  
  width: 130%;
`;


function Career() {
    return (
        <>
            <div style={{fontFamily:"'Gotham Medium',sans-serif", display: "flex", justifyContent: "center", margin: "1rem", marginTop: "3rem" }}>
                <div style={{fontFamily:"'Gotham Medium',sans-serif", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "1rem", marginRight: "2rem" }}>
                    <div style={{
                        maxWidth: 'container',  // Equivalent of mx-auto
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: '1rem 2.5rem',  // Equivalent of px-4 py-8
                    }}>
                        <h1 style={{
                            fontSize: '2.5rem',  // Equivalent of text-3xl (assuming base font size is 1rem)
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginBottom: '1rem',  // Equivalent of mb-4
                        }}>
                            {jobs.job.jobTitle}
                        </h1>
                        <p style={{
                            fontFamily:"'Gotham Medium',sans-serif",
                            fontSize: '1.25rem',  // Equivalent of text-xl
                            color: '#71717A',     // Equivalent of text-gray-700
                            marginBottom: '1rem',  // Equivalent of mb-4
                        }}>
                            {jobs.job.jobLocation}
                        </p>
                    </div>
                    <ALink href={`${jobs.job.jobForm}`}>
                        <StyledButton>
                        <button style={{color:"#f8f7f3"}}>
                            Apply Now
                        </button>
                        </StyledButton>
                    </ALink>
                </div>

            </div>
            <Container>
                <h2 style={{ fontFamily:"'Gotham Medium',sans-serif", fontWeight: '600', marginLeft: "1rem" }}>
                    BASIC QUALIFICATIONS
                </h2>
                <div style={{ color: "black", fontSize: "1.9rem",fontFamily:"'Gotham Medium',sans-serif", fontWeight: '700', marginLeft: "1rem" }}>
                    What qualifications do we need from you?
                </div>
                <div style={{ color: "black", fontSize: "1.5rem", margin: "1rem", fontFamily:"'Gotham Medium',sans-serif", fontWeight: 'normal' }}>
                    <ul>
                        {jobs?.job.jobDesc[2]['Basic Qualifications'].split('•')  // Split the string at each bullet point symbol
                            .map((item) => (
                                <li key={item.trim()}> {/* Add key for each list item */}
                                    {" • " + item.trim()}
                                </li>))}
                    </ul>
                </div>
                <h2 style={{ fontFamily:"'Gotham Medium',sans-serif", fontWeight: '600', marginLeft: "1rem",marginTop:"3rem" }}>
                    DESCRIPTION
                </h2>
                <div style={{ color: "black", fontSize: "1.9rem", fontFamily:"'Gotham Medium',sans-serif", fontWeight: '700', marginLeft: "1rem",marginTop:"2.5rem" }}>
                    Job Summary:
                </div>
                <div style={{ color: "black", fontSize: "1.5rem",fontFamily:"'Gotham Medium',sans-serif", fontWeight: '600', marginLeft: "1rem" }}>
                    {jobs.job.jobCategory[0]._typename}: {jobs.job.jobCategory[1].name}
                </div>
                
                <div style={{ color: "black", fontSize: "1.5rem", margin: "1rem",fontFamily:"'Gotham Medium',sans-serif", fontWeight: 'normal' }}>
                    {jobs.job.jobDesc[0]['Job Summary']}
                </div>
                <div style={{ color: "black", fontSize: "1.9rem", fontFamily:"'Gotham Medium',sans-serif", fontWeight: '700', marginLeft: "1rem",marginTop:"2.5rem" }}>
                    Responsibilities:
                </div>
                <div style={{ color: "black", fontSize: "1.5rem", margin: "1rem", fontFamily:"'Gotham Medium',sans-serif", fontWeight: 'normal' }}>
                    {jobs.job.jobDesc[1]['Key Job Responsibilities']}
                </div>


            </Container>
        </>
    )
};

export default Career;
