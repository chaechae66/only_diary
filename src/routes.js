import { Route, Switch } from 'react-router-dom';
import CreateDiary from './pages/createDiary';
import Intro from './pages/intro';
import Login from './pages/login';
import MyDiary from './pages/myDiary';
import DiaryCardPage from './pages/diaryCardPage';
import SignUp from './pages/signUp';
import PublicCardPage from './pages/publicCardPage';

export const PATHS = {
  intro: '/',
  login: '/login',
  signUp: '/signUp',
  createDiary : '/createDiary',
  myDiary : '/myDiary',
  diaryCardPage : '/diaryCardPage/:id',
  publicCardPage : '/publicCardPage/:id',
}

export default function Routes() {
  return (
    <Switch>
      <Route exact path={PATHS.intro} component={Intro} />
      <Route exact path={PATHS.login} component={Login} />
      <Route exact path={PATHS.signUp} component={SignUp} />
      <Route exact path={PATHS.createDiary} component={CreateDiary} />
      <Route exact path={PATHS.myDiary} component={MyDiary} />
      <Route exact path='/diaryCardPage' component={DiaryCardPage} />
      <Route path={PATHS.diaryCardPage} component={DiaryCardPage} />
      <Route exact path='/publicCardPage' component={PublicCardPage} />
      <Route path={PATHS.publicCardPage} component={PublicCardPage} />
    </Switch>
  )
}