import { Route, Routes } from 'react-router-dom';
import CreateDiary from './pages/createDiary';
import Intro from './pages/intro';
import Login from './pages/login';
import MyDiary from './pages/myDiary';
import DiaryCardPage from './pages/diaryCardPage';
import SignUp from './pages/signUp';
import PublicCardPage from './pages/publicCardPage';
import Page404 from './pages/page404';
import Layout from './components/layout/Layout';
import UpdateDiary from './pages/updateDiary';

export const PATHS = {
  intro: '/',
  login: '/login',
  signUp: '/signup',
  createDiary : '/creatediary',
  myDiary : '/mydiary',
  diaryCardPage : '/diarycardpage',
  publicCardPage : '/public',
  updateDiary : 'update',
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
          <Route path="/" element={<Intro />} />
          <Route path={PATHS.login} element={<Login />} />
          <Route path={PATHS.signUp} element={<SignUp />} />
          <Route path={PATHS.createDiary} element={<CreateDiary />} />
          <Route path={PATHS.myDiary} element={<MyDiary />} />
          <Route path={PATHS.diaryCardPage}>
            <Route path=':id' element={<DiaryCardPage />} />
          </Route>
          <Route path={PATHS.publicCardPage}>
            <Route path={`${PATHS.publicCardPage}/:id`}  element={<PublicCardPage />} />
          </Route>
          <Route path={PATHS.updateDiary}>
            <Route path=':id' element={<UpdateDiary />} />
          </Route>
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default App;
