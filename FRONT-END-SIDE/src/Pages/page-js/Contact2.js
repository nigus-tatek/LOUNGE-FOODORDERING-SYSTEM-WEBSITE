import React, { useState } from 'react';
import axios from 'axios';
import '../page-css/Contact.css';
import { FaPhoneVolume, FaLocationDot, FaTelegram } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";


export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const { name, email, subject, message } = formData;
    const newErrors = {};

    if (!name) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!subject) newErrors.subject = 'Subject is required';
    if (!message) newErrors.message = 'Message is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:5000/api/contact/submit', formData);
        
        if (response.status === 200) {
          setSuccessMessage('Your message has been sent successfully!');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });
        } else {
          setSuccessMessage('Failed to send your message.');
        }
      } catch (error) {
        setSuccessMessage('An error occurred while sending your message.');
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>

    <div className='contactBg'>
      <div className='contactBoth'>
        <div className='contactUs'>
          <p className='topic'>Contact Us</p>
          <p>
            <FaPhoneVolume className='icon' /> +251933232
          </p>
          <p>
            <FaLocationDot className='icon' /> Debre Berhan
          </p>
          <p>
            <a href="https://t.me/Lounge1" target="_blank" rel="noopener noreferrer">
              <FaTelegram className='icon' /> http./lounge1
            </a>
          </p>
          <p>
            <a href="nigustatek2@gmail.com">
              <MdOutlineMail className='icon' /> lou@gmail.com
            </a>
          </p>
        </div>
        <div className='contactForm'>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type='text'
              name='name'
              placeholder='Enter your full name'
              value={formData.name}
              onChange={handleChange}
              className='nameInput'
            />
            {errors.name && <p className='error'>{errors.name}</p>}
            
            <label htmlFor="email">Email</label>
            <input
              type='email'
              name='email'
              placeholder='Enter email'
              value={formData.email}
              onChange={handleChange}
              className='emailInput'
            />
            {errors.email && <p className='error'>{errors.email}</p>}
            
            <label htmlFor="subject">Subject</label>
            <input
              type='text'
              name='subject'
              placeholder='Enter subject'
              value={formData.subject}
              onChange={handleChange}
              className='subjectInput'
            />
            {errors.subject && <p className='error'>{errors.subject}</p>}
            
            <label htmlFor="message">Message</label>
            <textarea
              name='message'
              placeholder='Enter your message'
              value={formData.message}
              onChange={handleChange}
              className='messageInput'
            ></textarea>
            {errors.message && <p className='error'>{errors.message}</p>}
            
            <button type='submit' className='contactFormButton'>Send</button>
            {successMessage && <p className='success'>{successMessage}</p>}
          </form>
        </div>
      </div>
    </div>
    </>
  );
}
