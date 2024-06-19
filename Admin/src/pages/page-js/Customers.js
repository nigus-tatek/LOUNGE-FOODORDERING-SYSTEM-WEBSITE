import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../page-css/Customers.css';

import AdminSidebar from '../../components/component-Js/AdminSidebar';

export default function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/customer');
        setCustomers(response.data.reverse()); // Reverse the fetched data to show the latest first
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <>  
      <AdminSidebar />
      <div className='AllCustomers'>
        <div className='customers'>
          <h1>Customers</h1>
          <table className='customersTable'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer._id}>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
