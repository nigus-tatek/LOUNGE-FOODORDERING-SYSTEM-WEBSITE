import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../page-css/Messages.css';

import AdminSidebar from '../../components/component-Js/AdminSidebar';

export default function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/contact/messages');
        setMessages(response.data.reverse()); // Reverse the fetched data to show the latest first
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <>
      <AdminSidebar />
      <div className='MessageFull'>
        <div className='messages'>
          <h1>Messages</h1>
          {messages.map((message) => (
            <div key={message._id} className='message'>
              <h2>{message.subject}</h2>
              <p><strong>Name:</strong> {message.name}</p>
              <p><strong>Email:</strong> {message.email}</p>
              <p><strong>Message:</strong> {message.message}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
