# Public-Restroom (주변 공중화장실 찾기)

## 📃 개요
- 프로젝트 소개  
살면서 갑자기 화장실이 급한적이 없으신가요? 화장실은 찾았는데 비밀번호를 몰라 고생한적은 없으신가요?  
서울에서 화장실이 급하다면 이 프로젝트를 이용해 보세요. 주변 반경 화장실을 마커로 표시해주고 클릭시 주변 위치를 로드뷰로 보여줍니다.

- 개발 기간  
2023-01-17 ~ 2023-01-27

- API 문서 & SA 문서 정리 노션 페이지  
[Notion](https://www.notion.so/B-2-659a6f280108402ca783570fbd049676)  
### [사이트 이용 링크]

📖 [링크](https://public-restroom-project.vercel.app/)  

📖 [시연영상](https://www.youtube.com/watch?v=OeeAc9vG3HE)

## 👥 팀원 소개

| 이름   | 깃허브                                          |
| ------ | --------------------------------------------  |
| 이상원 | [@vpvm96](https://github.com/vpvm96)           |
| 라형선 | [@rhsok](https://github.com/rhsok)             |
| 예재현 | [@dwg787](https://github.com/dwg787)           |
| 차상현 | [@mr-chacha](https://github.com/mr-chacha)     |
| 송원석 | [@CircleSeok](https://github.com/CircleSeok)   |

## 🔧 기술 스택

### Client  

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=React Query&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">

### API

- Kakao Map API
- Public Restroom API

### Depoloy

<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">

## 📁프로젝트 구조

📦src  
 ┣ 📂api  
 ┃ ┣ 📜firebaseService.ts  
 ┃ ┗ 📜mapService.ts  
 ┣ 📂assets  
 ┃ ┣ 📜Banner.jpg  
 ┃ ┣ 📜Info.png  
 ┃ ┣ 📜await.png  
 ┃ ┣ 📜blank.png  
 ┃ ┣ 📜cat.jpg  
 ┃ ┗ 📜profile.png  
 ┣ 📂components  
 ┃ ┣ 📂Modals  
 ┃ ┃ ┣ 📂LoginModal  
 ┃ ┃ ┃ ┣ 📜LoginModal.tsx  
 ┃ ┃ ┃ ┗ 📜LoginModla.css  
 ┃ ┃ ┣ 📂MyModal  
 ┃ ┃ ┃ ┣ 📜MyModals.tsx  
 ┃ ┃ ┃ ┗ 📜style.js  
 ┃ ┃ ┣ 📂YourModal  
 ┃ ┃ ┃ ┣ 📜YourModal.tsx  
 ┃ ┃ ┃ ┗ 📜style.js  
 ┃ ┃ ┣ 📜Modal.tsx  
 ┃ ┃ ┣ 📜style.css  
 ┃ ┃ ┗ 📜style.js  
 ┃ ┣ 📂map  
 ┃ ┃ ┣ 📜MapLocation.tsx  
 ┃ ┃ ┣ 📜MapSearch.tsx  
 ┃ ┃ ┗ 📜MapSearchList.tsx  
 ┃ ┣ 📜CustomButton.tsx  
 ┃ ┣ 📜CustomInput.tsx  
 ┃ ┣ 📜Navbar.tsx  
 ┃ ┣ 📜ProfileImage.tsx  
 ┃ ┗ 📜index.ts  
 ┣ 📂hooks  
 ┃ ┣ 📜useButtonReactions.ts  
 ┃ ┣ 📜useEditProfile.ts  
 ┃ ┣ 📜useLoginState.ts  
 ┃ ┣ 📜useMapLocation.ts  
 ┃ ┣ 📜usePwdManager.ts  
 ┃ ┗ 📜useRestroom.ts  
 ┣ 📂pages  
 ┃ ┣ 📜LoginPage.tsx  
 ┃ ┣ 📜MainPage.tsx  
 ┃ ┣ 📜MapPage.tsx  
 ┃ ┣ 📜MyPage.tsx  
 ┃ ┣ 📜SignUpPage.tsx  
 ┃ ┗ 📜index.ts  
 ┣ 📂redux  
 ┃ ┣ 📂config  
 ┃ ┃ ┗ 📜configStore.ts  
 ┃ ┗ 📂modules  
 ┃ ┃ ┗ 📜userSlice.ts  
 ┣ 📂routes  
 ┃ ┗ 📜Router.tsx  
 ┣ 📂styles  
 ┃ ┗ 📜GlobalStyle.tsx  
 ┣ 📂utils  
 ┃ ┣ 📜UserInfoRegex.ts  
 ┃ ┗ 📜common.ts  
 ┣ 📜App.css  
 ┣ 📜App.tsx  
 ┣ 📜index.css  
 ┣ 📜index.tsx  
 ┣ 📜react-app-env.d.ts  
 ┣ 📜reportWebVitals.ts  
 ┗ 📜setupTests.ts  
