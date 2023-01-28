import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/firebaseService';
import { emailRegex, nicknameRegex, pwdRegex } from '../utils/UserInfoRegex';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPwd, setCnfirmPwd] = useState('');
  const [displayname, setDisplayname] = useState('');
  const navigate = useNavigate();

  //유효성검사
  const [validateEmail, setValidateEmail] = useState('');
  const [validateEmailColor, setValidateEmailColor] = useState(false);
  const [validatePw, setValidatePw] = useState('');
  const [validatePwColor, setValidatePwColor] = useState(true);
  const [validatePwconfirm, setValidatePwconfirm] = useState('');
  const [validatePwconfirmColor, setValidatePwconfirmColor] = useState(true);
  const [validateDisplayname, setValidateDisplayname] = useState('');
  const [validateDisplaynameColor, setValidateDisplayColor] = useState(true);

  //onchange로 값을 저장한다.
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (email.length > 5) {
      if (emailRegex.test(email) === false) {
        setValidateEmail(' 옳바른 형식을 입력해 주십시오.');
        setValidateEmailColor(false);
      } else {
        setValidateEmail(' 올바른 형식의 이메일 주소입니다.');
        setValidateEmailColor(true);
      }
    }
  };

  // password값을 저장하고 유효성검사를 실시한다.
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    //비밀번호 유효성 검사
    if (password.length > 0) {
      if (pwdRegex.test(password) === false) {
        setValidatePw(' 옳바른 형식을 입력해 주십시오.');
        setValidatePwColor(false);
      } else {
        setValidatePw(' 올바른 형식의 비밀번호 입니다.');
        setValidatePwColor(true);
      }
    }
  };

  //passowrd를 동기적으로 처리하기 위해서 useeffect를 사용
  useEffect(() => {
    if (confirmPwd.length > 0) {
      if (password === confirmPwd) {
        setValidatePwconfirm('비밀번호와 일치합니다.');
        setValidatePwconfirmColor(true);
      } else {
        setValidatePwconfirm('비밀번호와 일치하지 않습니다.');
        setValidatePwconfirmColor(false);
      }
    }
  }, [confirmPwd]);

  const onChangeconfirmPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCnfirmPwd(e.target.value);
  };

  //닉네임
  const onChangeDisplayname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayname(e.target.value);
    //유효성검사
    if (displayname.length > 0) {
      if (nicknameRegex.test(displayname) === false) {
        setValidateDisplayname(
          '한글,영문,숫자 포함 1자 이상 7자 이하로 작성해 주세요.'
        );
        setValidateDisplayColor(false);
      } else {
        setValidateDisplayname('옳바른 형식의 닉네임 입니다.');
        setValidateDisplayColor(true);
      }
    }
  };

  // submit & firebase
  const handleSubmitClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //패스워드와 패스워드 확인이 일치하고 패스워드의 유효성 검사를 통과하고 닉네임을 작성해야만 로그인이 가능하다.
    if (
      nicknameRegex.test(displayname) === true &&
      password === confirmPwd &&
      pwdRegex.test(password) === true &&
      emailRegex.test(email) === true
    ) {
      await createUserWithEmailAndPassword(authService, email, password)
        .then((result) => {
          updateProfile(result.user, {
            displayName: displayname,
          })
            .then(() => {
              console.log('닉네임 입력 성공');
              alert('회원가입성공');
              navigate('/login');
            })
            .catch((error) => {
              console.log('에러 발생:', error);
              alert('에러 발생');
            });
        })
        .catch((error) => {
          console.log(error);

          if (
            (error =
              'FirebaseError: Firebase: Error (auth/email-already-in-use).')
          ) {
            alert('중복된 이메일 입니다. 새로운 이메일 주소를 입력해 주세요.');
          }
        });
    } else if (confirmPwd !== password) {
      alert('비밀번호가 일치하지 않습니다.');
    } else if (nicknameRegex.test(displayname) === false) {
      alert('닉네임을 입력해 주세요');
    } else if (email.length === 0) {
      alert('이메일을 입력해 주세요');
    } else if (emailRegex.test(email) === false) {
      alert('옳바른 형식의 이메일을 입력해 주세요.');
    } else if (pwdRegex.test(password) === false) {
      alert('비밀번호를 확인해 주세요');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitClick}>
        <InputBox>
          <Backbtn
            type="button"
            onClick={() => navigate('/login')}
            style={{
              border: 'none',
              backgroundColor: 'white',
              cursor: 'pointer',
              color: '#2192ff',
            }}
          >
            뒤로가기
          </Backbtn>
          <LoginLogo>
            <h1>회원가입</h1>
          </LoginLogo>
          <InputBoxContent>
            <Inputholder>
              <Input
                type="text"
                name="닉네임"
                placeholder="닉네임"
                onChange={onChangeDisplayname}
              ></Input>
              <Validityfontbox>
                {
                  <ValidityNicnamefont
                    validateDisplaynameColor={validateDisplaynameColor}
                  >
                    {validateDisplayname}
                  </ValidityNicnamefont>
                }
              </Validityfontbox>
            </Inputholder>
            <Inputholder>
              <Input
                type="email"
                name="아이디"
                placeholder="아이디"
                onChange={onChangeEmail}
              ></Input>
              <Validityfontbox>
                {
                  <ValidityEmailfont validateEmailColor={validateEmailColor}>
                    {validateEmail}
                  </ValidityEmailfont>
                }
              </Validityfontbox>
            </Inputholder>
            <Inputholder>
              <Input
                type="password"
                name="비밀번호"
                placeholder="비밀번호"
                onChange={onChangePassword}
                value={password}
              ></Input>
              <Validityfontbox>
                {
                  <ValidityPasswordfont validatePwColor={validatePwColor}>
                    {validatePw}
                  </ValidityPasswordfont>
                }
              </Validityfontbox>
            </Inputholder>
            <Inputholder>
              <Input
                value={confirmPwd}
                type="password"
                name="비밀번호 확인"
                placeholder="비밀번호 확인"
                onChange={onChangeconfirmPwd}
              ></Input>
              <Validityfontbox>
                {
                  <ValidityConfirmPwdfont
                    validatePwconfirmColor={validatePwconfirmColor}
                  >
                    {validatePwconfirm}
                  </ValidityConfirmPwdfont>
                }
              </Validityfontbox>
            </Inputholder>
          </InputBoxContent>
          <ButtonBox>
            <LoginBtn type="submit">회원 가입</LoginBtn>
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
const ValidityNicnamefont = styled.span<{ validateDisplaynameColor: boolean }>`
  color: ${(Props) => (Props.validateDisplaynameColor ? 'blue' : 'red')};
  font-size: 15px;
`;
const ValidityEmailfont = styled.span<{ validateEmailColor: boolean }>`
  color: ${(Props) => (Props.validateEmailColor ? 'blue' : 'red')};
  font-size: 15px;
`;
const ValidityPasswordfont = styled.span<{ validatePwColor: boolean }>`
  color: ${(Props) => (Props.validatePwColor ? 'blue' : 'red')};
  font-size: 15px;
`;
const ValidityConfirmPwdfont = styled.span<{
  validatePwconfirmColor: boolean;
}>`
  color: ${(Props) => (Props.validatePwconfirmColor ? 'blue' : 'red')};
  font-size: 15px;
`;

const Validityfontbox = styled.div`
  border: none;
  width: 330px;
  height: 38px;
  position: relative;
  right: 10px;
  margin-top: 3px;
  outline: none;
  color: blue;
`;

const Backbtn = styled.button`
  position: relative;
  left: 22px;
`;
