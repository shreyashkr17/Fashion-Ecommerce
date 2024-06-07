import React from 'react'
import PageHeader from '~/components/features/page-header'
import ALink from '~/components/features/alink'

function sustainable() {
  return (
    <div className="main" style={{background:"#f8f7f3"}}>
        {/* <PageHeader title="F.A.Q" subTitle="Pages" /> */}
        <nav className="breadcrumb-nav" style={{marginBottom:"0rem"}}>
            <div className="container">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <ALink href="/"  style={{fontFamily:"'Gotham Thin',sans-serif"}}>Home</ALink>
                    </li>
                    <li className="breadcrumb-item active"  style={{fontFamily:"'Gotham Thin',sans-serif",fontWeight:"800"}}>Ethical Culture</li>
                </ol>
            </div>
        </nav>
        <div className="container">
            <div className="page-header page-header-big text-center" style={ { backgroundImage: `url(bg1.jpeg)` } } >
                <h1 className="page-title text-white" style={{color:"black", fontSize:"5rem"}}>Ethical Culture<span className="text-white"></span></h1>
            </div>
        </div>
        <div className="page-content">
            <div className="container">
                {/* <h2>Heading H2</h2> */}
                
                <div className="innerContainer">
                    <div className="leftContainer">
                        <h1 style={{fontFamily:"'Gotham Medium',sans-serif", textAlign:"left"}}>We care for our people.</h1>
                        <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem"}}>At Ireti, caring for our people is not just a statement; it's the cornerstone of our ethos. We understand that our success is deeply intertwined with the well-being of our team, from the artisans crafting our garments to the individuals wearing them. That's why we prioritize sourcing the best materials and compensating our collaborators fairly, ensuring their livelihoods are supported. We take pride in creating a working environment that values both the quality of our products and the quality of life of those involved in their creation.
                        <br />
                        <br />
                        Our commitment to mindfulness extends beyond the workplace. We consider the impact on the environment and the community in all our decisions, striving to make choices that are not only sustainable but also enriching. By championing slow fashion, we reject the fast-paced, disposable culture of the fashion industry, opting instead for pieces designed to last.
                        <br />
                        <br />
                        At Ireti, we believe that our dedication to quality and sustainability is not just about fashion; it's about making a positive difference in the world. We invite you to join us in this journey of care and conscientiousness, where every purchase is a vote for a better future for all.
                        </p>
                    </div>
                    <div className="rightContainer">
                        <img src="https://www.qua.clothing/cdn/shop/files/We_care_about_our_people_800x.jpg?v=1629710231"  />
                    </div>
                </div>
                <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem",marginLeft:"15px"}}>
                    At Ireti, our aim is to craft experiences that are enchanting and aspirational, yet firmly grounded in reality, fueled by a deep commitment to mindfulness.
                    <br />
                    <br />
                    While perfection eludes us, our earnest efforts persist, aligning with your own aspirations. Here's our commitment to mindful choices, reflecting your desire for the same. Time isn't our adversary; we champion slow fashion in an era of exponential clothing production.
                    <br />
                    <br />
                    Our motto will always be quality over quantity, and that’s why we practice slow fashion.
                    We eschew the frenzy of multiple seasonal releases. Unswayed by passing trends, our focus lies not in mere sales but in crafting enduring pieces built to withstand the test of time.
                    <br />
                </p>
                <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem",marginLeft:"15px"}}>
                    <br />
                    Picking up high-end quality premium fabrics like cotton and viscose blends that allow comfort, breathability and functionality, and combining them with perfect tailoring and a dedicated workforce, our clothing came into being.
                    <br />
                    <br />
                    Our designs transcend time, seamlessly transitioning from day to night, from trend to workplace. Understanding the challenge of finding pieces that harmonize with both trends and professional settings, we aspire to be your comprehensive solution. Our collections epitomize timeless elegance and enduring quality, promising to accompany you through every era, destined to last a lifetime.
                    <br />
                </p>
                <p style={{fontFamily:"'Gotham Thin',sans-serif",fontSize:"1.6rem",marginLeft:"15px"}}>
                    <br />
                    Reinventing your workwear wardrobe with designs that go beyond the 9-5 is our primary goal.
                    <br />
                    <br />
                    As a fashion label, maximizing sales might seem paramount, yet as conscientious community members, our message is clear: purchase thoughtfully. We eschew mere consumption, prioritizing the longevity of your wardrobe. Invest in pieces destined to endure, enriching your style journey for years to come.
                    <br />
                    Let’s be the change we wish to see.
                </p>
                
            </div>
        </div>
    </div>
  )
}

export default sustainable;
