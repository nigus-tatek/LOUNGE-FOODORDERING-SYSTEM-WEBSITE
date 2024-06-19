import React from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaUpload, FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineMessage, MdBorderColor } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import "../component-css/AdminSidebar.css";

export default function AdminSidebar() {
  return (
    <div className='header'>
      <div className='header-options'>
        <div className='header-option'>
          <Link className="link" to="/AddFoods">
            <FaUpload />
            <p>Add Items</p>
          </Link>
        </div>
        <div className='header-option'>
          <Link className="link" to="/Orders">
            <MdBorderColor />
            <p>Orders</p>
          </Link>
        </div>
        <div className='header-option'>
          <Link className="link" to="/List">
            <FaList />
            <p>Menu Foods</p>
          </Link>
        </div>
        <div className='header-option'>
          <Link className="link" to="/Customer">
            <BiFoodMenu />
            <p>Customers</p>
          </Link>
        </div>
        <div className='header-option'>
          <Link className="link" to="/Message">
            <MdOutlineMessage />
            <p>Messages</p>
          </Link>
        </div>
      </div>
      <div className='logout'>
        <Link className="link logout-link" to="/">
          <FaSignOutAlt />
          <p>Logout</p>
        </Link>
      </div>
    </div>
  );
}
