import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/firebaseService';
import { emailRegex, pwdRegex } from '../utils/UserInfoRegex';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setCnfirmPwd] = useState('');
  const [displayname, setDisplayname] = useState('');
  const navigate = useNavigate();

  //유효성검사
  const [validateEmail, setValidateEmail] = useState('');
  const [validateEmailColor, setValidateEmailColor] = useState(true);
  const [validatePw, setValidatePw] = useState('');
  const [validatePwColor, setValidatePwColor] = useState(true);
  const [validatePwconfirm, setValidatePwconfirm] = useState('');
  const [validatePwconfirmColor, setValidatePwconfirmColor] = useState(true);

  //onchange로 값을 저장한다.
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // console.log('onchnageemail:', email);
    if (email.length > 5) {
      if (emailRegex.test(email) === false) {
        setValidateEmail(' 옳바른 형식을 입력해 주십시오.');
        setValidateEmailColor(true);
      } else {
        setValidateEmail(' 올바른 형식의 이메일 주소입니다.');
        setValidateEmailColor(false);
      }
    }
  };

  // password값을 저장하고 유효성검사를 실시한다.
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log('onchnagepassword:', password);
    //비밀번호 유효성 검사
    if (password.length > 0) {
      if (pwdRegex.test(password) === false) {
        setValidatePw(' 옳바른 형식을 입력해 주십시오.');
      } else {
        setValidatePw(' 올바른 형식의 비밀번호 입니다.');
      }
    }
  };

  //passowrd를 동기적으로 처리하기 위해서 useeffect를 사용
  useEffect(() => {
    if (confirmPwd.length > 0) {
      if (password === confirmPwd) {
        setValidatePwconfirm('비밀번호와 일치합니다.');
      } else {
        setValidatePwconfirm('비밀번호와 일치하지 않습니다.');
      }
    }
  }, [confirmPwd]);

  const onChangeconfirmPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCnfirmPwd(e.target.value);
    console.log('onchnageconfirmPwd:', confirmPwd);
  };

  const onChangeDisplayname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayname(e.target.value);
    console.log('onchnageemail:', displayname);
  };

  // submit & firebase
  const handleSubmitClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // //확인
    // console.log('handleSubmitClick');

    //인증부분
    //패스워드와 패스워드 확인이 일치하고 패스워드의 유효성 검사를 통과해야만 로그인이 가능하다.
    if (password === confirmPwd && pwdRegex.test(password) === true) {
      await createUserWithEmailAndPassword(authService, email, password)
        .then((result) => {
          updateProfile(result.user, {
            displayName: displayname,
          })
            .then(() => {
              console.log('닉네임 입력 성공');
              console.log('회원가입성공:', result.user);
              alert('회원가입성공');
              navigate('/login');
            })
            .catch((error) => {
              console.log('닉네임 입력실패:', error);
            });
        })
        .catch((error) => {
          console.log(error);
          if (
            (error =
              'FirebaseError: Firebase: Error (auth/email-already-in-use).')
          ) {
            alert('중복된 이메일 입니다 다시 확인해 주세요');
          } else if (
            (error =
              'FirebaseError: Firebase: Password should be at least 6 characters (auth/weak-password).')
          ) {
            alert('비밀번호는 최소6글자 이상을 입력해야 합니다.');
          }
        });
    } else {
      alert('이메일과 비밀번호를 확인해 주세요.');
    }
  };

  //유효성검사 함수

  return (
    <div>
      <form onSubmit={handleSubmitClick}>
        <InputBox>
          <button
            onClick={() => navigate('/login')}
            style={{
              border: 'none',
              backgroundColor: 'white',
              cursor: 'pointer',
              color: '#2192ff',
            }}
          >
            뒤로가기
          </button>
          <LoginLogo>
            <h1>회원가입</h1>
          </LoginLogo>

          <InputBoxContent>
            <Inputholder>
              <Input
                name="닉네임"
                placeholder="닉네임"
                onChange={onChangeDisplayname}
              ></Input>
            </Inputholder>
            <Inputholder>
              <Input
                name="아이디"
                placeholder="아이디"
                onChange={onChangeEmail}
              ></Input>
              <Validityfontbox>
                {<Validityfont>{validateEmail}</Validityfont>}
              </Validityfontbox>
            </Inputholder>
            <Inputholder>
              <Input
                // type="password"
                name="비밀번호"
                placeholder="비밀번호"
                onChange={onChangePassword}
                value={password}
              ></Input>
              <Validityfontbox>
                {<Validityfont>{validatePw}</Validityfont>}
              </Validityfontbox>
            </Inputholder>
            <Inputholder>
              <Input
                value={confirmPwd}
                // type="password"
                name="비밀번호 확인"
                placeholder="비밀번호 확인"
                onChange={onChangeconfirmPwd}
              ></Input>
              <Validityfontbox>
                {<Validityfont>{validatePwconfirm}</Validityfont>}
              </Validityfontbox>
            </Inputholder>
          </InputBoxContent>
          <ButtonBox>
            {/* <RegisterBtn>회원 가입</RegisterBtn> */}
            <LoginBtn>회원 가입</LoginBtn>
          </ButtonBox>
        </InputBox>
      </form>
    </div>
  );
};

export default SignUpPage;

const InputBox = styled.div`
  position: relative;
  width: 430px;
  height: 600px;
  border-radius: 30px;
  padding: 5px;
  top: 150px;
  border: 2px solid #2192ff;
`;

//Inputholder안의 진짜 input태그
const Input = styled.input`
  border: none;
  width: 300px;
  height: 38px;
  position: relative;
  left: 30px;
  outline: none;
`;

//Input태그의 테두리
const Inputholder = styled.div`
  border-radius: 30px;
  width: 380px;
  height: 45px;
  border: 3px solid #b2c8df;
  color: #b2c8df;
  margin-top: 25px;
`;

//인풋을 둘러싼 박스
const InputBoxContent = styled.div`
  margin: 20px;
`;

//잠깐만 !
const LoginLogo = styled.div`
  text-align: center;
  margin-top: 84px;
  margin-bottom: 25px;
  font-size: 20px;
  color: #2192ff;
`;

const ButtonBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//회원 가입 버튼
const LoginBtn = styled.button`
  border-radius: 40px;
  width: 110px;
  height: 40px;
  font-size: 20px;
  color: #2192ff;
  border-color: #2192ff;
  font-weight: 900;
  margin-top: 15px;
  background-color: White;
  cursor: pointer;
  &:hover {
    background: cornflowerblue;
    color: white;
    transition: 0.5s;
  }
`;

//유효성검사시 글자
const Validityfont = styled.span`
  color: blue;
  font-size: 15px;
`;

const Validityfontbox = styled.div`
  border: none;
  width: 300px;
  height: 38px;
  position: relative;
  right: 10px;
  margin-top: 3px;
  outline: none;
  color: blue;
`;
