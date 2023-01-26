import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoImg from '../assets/await.png';
import profileImg from '../assets/cat.jpg';
import blankImg from '../assets/blank.png';
import { signOut } from 'firebase/auth';
import { authService } from '../api/firebaseService';
import { useNavigate } from 'react-router-dom';
import useLoginState from '../hooks/useLoginState';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isAuthorizedInSession, setInit, setIsLoggedIn } =
    useLoginState();

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

  //새로고침해도 닉네임 유지 방법 1
  // let userObj = sessionStorage.getItem(`firebase:authUser:${apiKey}:[DEFAULT]`);
  // console.log(userObj);
  // let userObjParsed = JSON.parse(userObj!); //null 이 올 수도 있다. 근데 이 방법은 좋진 않다.
  // console.log(userObjParsed);

  //새로고침해도 닉네임 유지 방법 2
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [setInit, setIsLoggedIn]);

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
        {isLoggedIn && isAuthorizedInSession ? (
          <ProfileImg src={profileImg}></ProfileImg>
        ) : (
          <ProfileImg src={blankImg}></ProfileImg>
        )}
      </div>

      <LoginButtonBox>
        {isLoggedIn && isAuthorizedInSession ? (
          <>
            <LoginButton onClick={handleLogout}>Logout</LoginButton>
            {/* <div>{userObjParsed.displayName}님 안녕하세요!</div> */}
            <div>{authService.currentUser?.displayName}님 안녕하세요!</div>
          </>
        ) : (
          <LoginButton onClick={() => navigate('/login')}>Login</LoginButton>
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
  cursor: pointer;
`;

// const LoginButtonBox = styled(Link)`
//   margin: 0;
// `;

const LoginButtonBox = styled.div``;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 100%;
`;
