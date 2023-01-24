import React, {
  memo,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { pwdRegex } from '../utils/UserInfoRegex';
import { useSelector, useDispatch } from 'react-redux';
import { useAppSelector, useAppDispatch } from '../redux/config/configStore';
import {
  getCurrentPwd,
  createNewPwd,
  getConfirmPwd,
  updateUserNickname,
} from '../redux/modules/userSlice';
import { stringify } from 'querystring';
// import { RootState } from '../redux/config/configStore';

//Mypage로부터 받았던 label props -> { label }: { label: string }
const CustomInput = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const userInfo: any = useAppSelector((state) => state.user);
  const [currentPwd, setCurrentPwd] = useState<string>('');
  const [newPwd, setNewPwd] = useState<string>('');
  const [confirmNewPwd, setConfirmNewPwd] = useState<string>('');
  // const [nickname, setNickname] = useState<string>('');
  // console.log('userInfo', userInfo.newPwd);

  //여러 Input에 대해서는 하나의 useState, onchange에 객체로 관리하는 것이 더 좋음.
  // const [pwdInputValues, setPwdInputValues] = useState<PwdObjType>({
  //   currentPwd: '',
  //   newPwd: '',
  //   confirmNewPwd: '',
  // });
  // const { currentPwd, newPwd } = pwdInputValues;

  //useRef mutableRef
  // const currentPwd = useRef<string>('');
  // const newPwd = useRef<string>('');
  // const confirmNewPwd = useRef<string>('');

  //input focus(useRef DOM 접근)
  // const currentPwdInput = useRef<HTMLInputElement>(null);
  // const newPwdInput = useRef<HTMLInputElement>(null);
  // const confirmPwdInput = useRef<HTMLInputElement>(null);

  //유효성 검사
  const [isCurrentPwd, setIsCurrentPwd] = useState<boolean>(false);
  const [isValidPwd, setIsValidPwd] = useState<boolean>(false);
  const [isSamePwd, setIsSamePwd] = useState<boolean>(false);
  const [currentPwdObserver, setCurrentPwdObserver] = useState<string>('');
  const [newPwdObserver, setNewPwdObserver] = useState<string>('');
  const [confirmNewPwdObserver, setConfirmNewPwdObserver] =
    useState<string>('');

  // console.log(
  //   'currentPwd와',
  //   currentPwd,
  //   'newPwd와',
  //   newPwd,
  //   'confirmNewPwd:',
  //   confirmNewPwd
  // );

  // const onChangePwd = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   if (name === 'currentPwd') {
  //     const inputCurrentPwdValue = value;
  //     setPwdInputValues({ ...pwdInputValues, [name]: inputCurrentPwdValue });
  //     if (!pwdRegex.test(inputCurrentPwdValue)) {
  //       setCurrentPwdObserver('올바르지 않은 형식의 비밀번호입니다.');
  //       setIsCurrentPwd(false);
  //     } else {
  //       setCurrentPwdObserver('올바른 형식의 비밀번호입니다.');
  //       setIsCurrentPwd(true);
  //     }
  //   } else if (name === 'newPwd') {
  //     const InputNewPwdValue = value;
  //     setPwdInputValues({ ...pwdInputValues, [name]: InputNewPwdValue });
  //     if (!pwdRegex.test(InputNewPwdValue)) {
  //       setNewPwdObserver(
  //         '숫자 + 영문자 + 특수문자 조합으로 8자리 이상 입력해주세요.'
  //       );
  //       setIsValidPwd(false);
  //     } else {
  //       setNewPwdObserver('올바른 형식의 비밀번호입니다.');
  //       setIsValidPwd(true);
  //     }
  //   }
  //   else if (name === 'confirmNewPwd') {
  //     if (pwdInputValues.newPwd === currentInputPwdValue) {
  //       setConfirmNewPwdObserver('비밀번호가 일치합니다.');
  //       setIsSamePwd(true);
  //     } else {
  //       setConfirmNewPwdObserver('비밀번호가 일치하지 않습니다.');
  //       setIsSamePwd(false);
  //     }
  //   }
  // }, []);

  const onChangeCurrentPwd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // currentPwd.current = e.target.value
      const currentPwdValue = e.target.value;
      setCurrentPwd(currentPwdValue);
      dispatch(getCurrentPwd(currentPwdValue));
      if (!pwdRegex.test(currentPwdValue)) {
        setCurrentPwdObserver('올바르지 않은 형식의 비밀번호입니다.');
        setIsCurrentPwd(false);
      } else {
        setCurrentPwdObserver('올바른 형식의 비밀번호입니다.');
        setIsCurrentPwd(true);
      }
    },
    []
  );

  const onChangeNewPwd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      // newPwd.current = e.target.value;
      const newPwdValue = e.target.value;
      setNewPwd(newPwdValue);
      dispatch(createNewPwd(newPwdValue));
      if (!pwdRegex.test(newPwdValue)) {
        setNewPwdObserver(
          '숫자 + 영문자 + 특수문자 조합으로 8자리 이상 입력해주세요.'
        );
        setIsValidPwd(false);
      } else {
        setNewPwdObserver('올바른 형식의 비밀번호입니다.');
        setIsValidPwd(true);
      }

      if (confirmNewPwd === newPwdValue) {
        setConfirmNewPwdObserver('비밀번호가 일치합니다.');
        setIsSamePwd(true);
      } else {
        setConfirmNewPwdObserver('비밀번호가 일치하지 않습니다.');
        setIsSamePwd(false);
      }
    },
    [confirmNewPwd, dispatch]
  );

  const onChangeConfirmPwd = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // confirmNewPwd.current = e.target.value
      const currentComparePwdValue = e.target.value;
      setConfirmNewPwd(currentComparePwdValue);
      dispatch(getConfirmPwd(currentComparePwdValue));
      if (newPwd === currentComparePwdValue) {
        setConfirmNewPwdObserver('비밀번호가 일치합니다.');
        setIsSamePwd(true);
      } else {
        setConfirmNewPwdObserver('비밀번호가 일치하지 않습니다.');
        setIsSamePwd(false);
      }
    },
    [newPwd]
  );

  return (
    <>
      <InputStyle
        // ref={pwdInput}
        type="password"
        value={currentPwd}
        placeholder="기존 비밀번호를 입력하세요"
        onChange={onChangeCurrentPwd}
        name="currentPwd"
        // onChange={onChangePwd}
      />
      <ObserverWrapper>
        {currentPwd.length > 0 && (
          <CurrentPwdObserver isCurrentPwd={isCurrentPwd}>
            {currentPwdObserver}
          </CurrentPwdObserver>
        )}
      </ObserverWrapper>
      <InputStyle
        type="password"
        value={newPwd}
        placeholder="새 비밀번호를 입력하세요"
        onChange={onChangeNewPwd}
        name="newPwd"
        // onChange={onChangePwd}
      />
      <ObserverWrapper>
        {newPwd.length > 0 && (
          <NewPwdObserver isValidPwd={isValidPwd}>
            {newPwdObserver}
          </NewPwdObserver>
        )}
      </ObserverWrapper>
      <InputStyle
        type="password"
        value={confirmNewPwd}
        placeholder="같은 비밀번호를 입력하세요"
        onChange={onChangeConfirmPwd}
        name="confirmNewPwd"
        // onChange={onChangePwd}
      />
      <ObserverWrapper>
        {confirmNewPwd.length > 0 && (
          <ConfirmPwdObserver isSamePwd={isSamePwd}>
            {confirmNewPwdObserver}
          </ConfirmPwdObserver>
        )}
      </ObserverWrapper>
    </>
  );

  // switch (label) {
  //   case 'current':
  //     return (
  //       <>
  //         <InputStyle
  //           // ref={currentPwdInput}
  //           type="password"
  //           value={currentPwd}
  //           placeholder="기존 비밀번호를 입력하세요"
  //           // onChange={onChangeCurrentPwd}
  //           name="currentPwd"
  //           onChange={onChangeCurrentPwd}
  //         />
  //         <ObserverWrapper>
  //           {currentPwd.length > 0 && (
  //             <CurrentPwdObserver isCurrentPwd={isCurrentPwd}>
  //               {currentPwdObserver}
  //             </CurrentPwdObserver>
  //           )}
  //         </ObserverWrapper>
  //       </>
  //     );
  //   case 'new':
  //     return (
  //       <>
  //         <InputStyle
  //           // ref={newPwdInput}
  //           type="password"
  //           value={newPwd}
  //           placeholder="새 비밀번호를 입력하세요"
  //           // onChange={onChangeNewPwd}
  //           name="newPwd"
  //           onChange={onChangeNewPwd}
  //         />
  //         <ObserverWrapper>
  //           {newPwd.length > 0 && (
  //             <NewPwdObserver isValidPwd={isValidPwd}>
  //               {newPwdObserver}
  //             </NewPwdObserver>
  //           )}
  //         </ObserverWrapper>
  //       </>
  //     );
  //   case 'confirm':
  //     return (
  //       <>
  //         <InputStyle
  //           // ref={confirmPwdInput}
  //           type="password"
  //           value={confirmNewPwd}
  //           placeholder="같은 비밀번호를 입력하세요"
  //           // onChange={onChangeConfirmPwd}
  //           name="confirmNewPwd"
  //           onChange={onChangeConfirmPwd}
  //         />
  //         <ObserverWrapper>
  //           {confirmNewPwd.length > 0 && (
  //             <ConfirmPwdObserver isSamePwd={isSamePwd}>
  //               {confirmNewPwdObserver}
  //             </ConfirmPwdObserver>
  //           )}
  //         </ObserverWrapper>
  //       </>
  //     );
  //   default:
  //     return null;
  // }
};

export default CustomInput;

const InputStyle = styled.input`
  width: 200px;
  height: 30px;
  border: none;
  background-color: #eeeeee;
`;

const CurrentPwdObserver = styled.p<{ isCurrentPwd: boolean }>`
  font-weight: 500;
  font-size: 0.5rem;
  line-height: 20px;
  letter-spacing: -0.5px;
  position: relative;
  bottom: 20px;
  /* left: 0; */
  color: ${(props) => (props.isCurrentPwd ? '#189701' : '#ff2727')};
`;

const NewPwdObserver = styled.p<{ isValidPwd: boolean }>`
  margin-left: 0;

  font-weight: 500;
  font-size: 0.5rem;
  line-height: 20px;
  letter-spacing: -0.5px;
  position: relative;
  bottom: 20px;
  /* left: 0; */
  color: ${(props) => (props.isValidPwd ? '#189701' : '#ff2727')};
`;

const ConfirmPwdObserver = styled.p<{ isSamePwd: boolean }>`
  margin-left: 0;
  font-weight: 500;
  font-size: 0.5rem;
  line-height: 20px;
  letter-spacing: -0.5px;
  position: relative;
  bottom: 20px;
  /* left: 0; */
  color: ${(props) => (props.isSamePwd ? '#189701' : '#ff2727')};
`;

const ObserverWrapper = styled.div`
  width: 200px;
  height: 20px;
`;
