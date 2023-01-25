import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoImg from '../assets/await.png';
import profileImg from '../assets/cat.jpg';
import blankImg from '../assets/blank.png';
import { getAuth, signOut } from 'firebase/auth';

const Navbar = () => {
  const [user, setUser] = useState(false);

  const handleLogin = () => {
    setUser(true);
  };

  const handleLogout = (e: any) => {
    setUser(false);

    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert('로그아웃 되었습니다.');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Nav>
      <LeftSection>
        <Link to="/">
          <img src={logoImg} alt="Logo" />
        </Link>
      </LeftSection>
      <NavUl>
        <NavLi>
          <NavText to="/">Home</NavText>
        </NavLi>
        <NavLi>
          <NavText to="/map">Map Page</NavText>
        </NavLi>
        <NavLi>
          <NavText to="/mypage">My Page</NavText>
        </NavLi>
      </NavUl>
      <div>
        {!user ? (
          <ProfileImg src={profileImg}></ProfileImg>
        ) : (
          <ProfileImg src={blankImg}></ProfileImg>
        )}
      </div>

      <LoginButtonBox to="/login">
        {user ? (
          <LoginButton onClick={handleLogin}>Login</LoginButton> //React.MouseEventHandler<HTMLButtonElement>
        ) : (
          <LoginButton onClick={handleLogout}>Logout</LoginButton>
        )}
      </LoginButtonBox>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9fb;
  padding: 30px 35px 30px 35px;
`;

const LeftSection = styled.div`
  justify-items: flex-start;
  display: flex;
  margin: 0px;
`;

const NavUl = styled.ul`
  display: flex;
  /* width: 40%; */
`;

const NavLi = styled.li`
  list-style: none;
  margin-right: 100px;
  text-decoration: none;
`;
const NavText = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 20px;
`;
const LoginButton = styled.button`
  border: none;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 20px;
  width: 100px;
  background: rgb(7, 7, 101);
  background: linear-gradient(
    90deg,
    rgba(7, 7, 101, 1) 0%,
    rgba(157, 59, 148, 1) 100%
  );
  color: white;
`;
const LoginButtonBox = styled(Link)`
  margin: 0;
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;
