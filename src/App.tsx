import { Route, Routes } from 'react-router-dom';
import CreateDiary from './pages/createDiary';
import Intro from './pages/intro';
import Login from './pages/login';
import MyDiary from './pages/myDiary.jsx';
import DiaryCardPage from './pages/diaryCardPage';
import SignUp from './pages/signUp';
import PublicCardPage from './pages/publicCardPage';
import Page404 from './pages/page404';
import Layout from './components/layout/Layout';
import UpdateDiary from './pages/updateDiary';
import React from 'react';

function App():JSX.Element {
  return (
    <Routes>
      <Route element={<Layout />}>
          <Route path="/" element={<Intro />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/create' element={<CreateDiary />} />
          <Route path='/:uid' element={<MyDiary />} /> 
          <Route path='/:uid/:id' element={<DiaryCardPage />} />
          <Route path='/public'>
            <Route path=':id'  element={<PublicCardPage />} />
          </Route>
          <Route path='/update'>
            <Route path=':id' element={<UpdateDiary />} />
          </Route>
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
