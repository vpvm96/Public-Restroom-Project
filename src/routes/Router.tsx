import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage, LoginPage, SignUpPage, MapPage, MyPage } from '../pages';
import Navbar from '../components/Navbar';
const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
