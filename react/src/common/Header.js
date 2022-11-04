import React from 'react'
import { NavLink } from 'react-router-dom';

function Header() {
  const activeStyle = { color: 'hotpink' };
  return (
    <header>
      <h1>
        <NavLink to='/'>LOGO</NavLink>
      </h1>

      <ul id="gnb">
        <li>
          <NavLink to='/list' style={({ isActive }) => (isActive ? activeStyle : null)}>Show List</NavLink>
        </li>
        <li>
          <NavLink to='/create' style={({ isActive }) => (isActive ? activeStyle : null)}>Write Post</NavLink>
        </li>
      </ul>
    </header>
  )
}

export default Header