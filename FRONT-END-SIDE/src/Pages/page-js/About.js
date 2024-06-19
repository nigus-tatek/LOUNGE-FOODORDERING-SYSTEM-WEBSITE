import React from 'react';
import "../page-css/About.css";
import chef1 from '../../assets/chef1.png';
import chef2 from '../../assets/chef2.png';
import Header from '../../components/components-js/Header';

export default function About() {
  return (
    <>
    <Header/>
      <div className='AboutFullPage'>
        <div className='AboutTextAndChef'>
          <div className='AboutText'>
            <h1>About Us</h1>
            <p>Welcome to our restaurant, where 
              culinary artistry meets exceptional dining. 
              Our mission is to create unforgettable experiences 
              through our passion for food, commitment to quality, 
              and dedication to service.</p>
              <div className='MissionAndVision'>
                <div className='Mission'>
                  <h2>Our Mission</h2>
                  <p>Our mission is to create unforgettable 
                    experiences through our passion for food, 
                    commitment to quality, and dedication to service.</p>
                </div>
                <div className='Vision'>
                  <h2>Our Vision</h2>
                  <p>Our vision is to create unforgettable 
                    experiences through our passion for food, 
                    commitment to quality, and dedication to service.</p>

                </div>
              </div>
            
          </div>
         <h5>  our chefs</h5>
    
          <div className='AboutChefs'>
            
            <div className='AboutFirstChef'>
            <img src={chef1} alt="Chef Jane Smith" className="ChefImage"/>
              
            <h2>Chef John Doe</h2>
            </div>
            
            <div className='AboutSecondChef'>
            <img src={chef2} alt="Chef Jane Smith" className="ChefImage"/>
              <h2>Chef Jane Smith</h2>
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
