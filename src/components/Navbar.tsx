import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { authService } from '../api/firebaseService';
import { useNavigate } from 'react-router-dom';
import useLoginState from '../hooks/useLoginState';
import blankImg from '../assets/blank.png';
import DfProfileImg from '../assets/profile.png';
import profileImg from '../assets/cat.jpg';
import logoImg from '../assets/await.png';
import styled from 'styled-components';

const Navbar = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const { isLoggedIn, isAuthorizedInSession } = useLoginState();

  const handleLogout = () => {
    signOut(authService)
      .then(() => {
        alert('로그아웃 되었습니다.');
        navigate('/', { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Nav>
      <LeftSection>
        <Link to="/">
          <LogoImg src={logoImg} alt="Logo" />
        </Link>
      </LeftSection>
      <MenuSection>
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
      </MenuSection>
      <InfoSection>
        {isLoggedIn && isAuthorizedInSession ? (
          <ImgNick>
            <FbImg>
              {auth.currentUser?.photoURL ? (
                <ProfileImg src={auth.currentUser.photoURL} />
              ) : (
                <ProfileImg src={DfProfileImg} />
              )}
            </FbImg>
            <FontBox>
              <Font>{auth.currentUser?.displayName} </Font>
            </FontBox>
          </ImgNick>
        ) : (
          <FontBox>
            <Font>{auth.currentUser?.displayName} </Font>
          </FontBox>
        )}
        {/* <LoginButtonBox to="/login"> */}
        <LoginButtonBox>
          {isLoggedIn && isAuthorizedInSession ? (
            <LoginButton onClick={handleLogout}>Logout</LoginButton> //React.MouseEventHandler<HTMLButtonElement>
          ) : (
            <LoginButton onClick={() => navigate('/login')}>Login</LoginButton>
          )}
        </LoginButtonBox>
      </InfoSection>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9fb;
`;

const LeftSection = styled.div`
  width: 15%;
  margin-left: 4rem;
`;

const LogoImg = styled.img`
  width: 150px;
`;

const ImgNick = styled.div`
  display: flex;
  flex-direction: row;
  justify-items: center;
  text-align: center;
  gap: 1rem;
`;

const FbImg = styled.div`
  display: flex;
  align-items: center;
`;

const FontBox = styled.div`
  width: 100%;
`;

const Font = styled.p`
  font-weight: 500;
  font-size: 35px;
  font-style: oblique;
  margin-bottom: 0.5rem;
`;

const MenuSection = styled.div`
  width: 45%;
`;

const NavUl = styled.ul`
  display: flex;
  flex-direction: row;
`;

const NavLi = styled.li`
  list-style: none;
  text-decoration: none;
`;
const NavText = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 20px;
`;

const InfoSection = styled.div`
  width: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LoginButton = styled.button`
  border: none;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 20px;
  width: 100px;
  background: #4285f4;
  background: linear-gradient(90deg, #4285f4 0%, #3b5d9d 100%);
  color: white;
  cursor: pointer;
`;
const LoginButtonBox = styled.div`
  margin-right: 1.5rem;
  align-items: flex-end;
`;

const ProfileImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 100%;
`;
