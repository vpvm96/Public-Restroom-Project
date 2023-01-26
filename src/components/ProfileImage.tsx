import React from 'react';
import profileImgDefault from '../assets/profileImgDefault.png';

const ProfileImage = () => {
  //   const fileChange = async (event) => {
  //       // setImgUploaded(!imgUploaded);
  //       const {
  //         target: { files },
  //       } = event;

  //       const theFile = files[0];
  //       const reader = new FileReader();
  //       reader.readAsDataURL(theFile);
  //       reader.onloadend = (finishedEvent) => {
  //         const {
  //           currentTarget: { result },
  //         } = finishedEvent;
  //         setAttachment(result);
  //         const profileURL = finishedEvent.currentTarget.result;
  //         localStorage.setItem('profileURL', profileURL);
  //       };
  //     };

  //   const storeImg = async () => {
  //     if (attachment !== '') {
  //       const imgRef = ref(
  //         imgStorage,
  //         `${authService.currentUser.uid}/profileUrl/${uuidv4()}/` //마지막데이터가져오게하려면?
  //       );
  //       const profileURL = localStorage.getItem('profileURL');
  //       const response = await uploadString(imgRef, profileURL, 'data_url');
  //       const tempUrl = await getDownloadURL(response.ref);

  //       let EditedUser = {
  //         id: user[0].id,
  //         email: user[0].email,
  //         photoURL: tempUrl,
  //         displayName: nickName,
  //       };
  //       dispatch(__updateUser(EditedUser));
  //       dispatch(__updateUserList(EditedUser));
  //       await updateProfile(authService.currentUser, {
  //         displayName: nickName,
  //         photoURL: tempUrl,
  //       });
  //     }
  //     alert('프로필 변경 완료!');
  //   };
  return (
    <img alt="프로필이미지" src={profileImgDefault} style={{ width: '30%' }} />
  );
};

export default ProfileImage;
