import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const HeaderWrap = styled.header`
  width: 350px;
  height: 100vh;
  background: #222;
  position: fixed;
  top: 0;
  left: 0;
  padding: 50px;
`
const Logo = styled.h1`
  margin-bottom: 40px;
  a {
    font: 50px/1 'arial';
    color: #fff;
  }
`
const Gnb = styled.ul`
  a {
    display: block;
    padding: 10px;
    font: bold 16px/1 'arial';
    color: #bbb;
    &:hover {
      color: hotpink;
    }
  }
`

const Util = styled.ul`
  position: absolute;
  bottom: 50px;
  left: 50px;
  display: flex;
  gap: 20px;
  li {
    a {
      font: 14px/1 'arial';
      color: #777;
    }
  }
`

function Header() {
  const activeStyle = { color: 'hotpink' };

  return (
    <HeaderWrap>
      <Logo>
        <NavLink to='/'>LOGO</NavLink>
      </Logo>

      <Gnb>
        <li>
          <NavLink to='/list' style={({ isActive }) => (isActive ? activeStyle : null)}>Show List</NavLink>
        </li>
        <li>
          <NavLink to='/create' style={({ isActive }) => (isActive ? activeStyle : null)}>Write Post</NavLink>
        </li>
      </Gnb>

      <Util>

        <li>
          <NavLink to='/login' style={({ isActive }) => (isActive ? activeStyle : null)}>Login</NavLink>
        </li>
        <li>
          <NavLink to='/join' style={({ isActive }) => (isActive ? activeStyle : null)}>Join</NavLink>
        </li>

      </Util>
    </HeaderWrap>
  );
}

export default Header;