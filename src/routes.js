import { Route, Switch } from 'react-router-dom'
import CreateDiary from './pages/createDiary'
import Intro from './pages/intro'
import Login from './pages/login'
import MyDiary from './pages/myDiary'
import SignUp from './pages/signUp'

export const PATHS = {
  intro: '/',
  login: '/login',
  signUp: '/signUp',
  createDiary : '/createDiary',
  myDiary : '/myDiary',
}

export default function Routes() {
  return (
    <Switch>
      <Route exact path={PATHS.intro} component={Intro} />
      <Route path={PATHS.login} component={Login} />
      <Route path={PATHS.signUp} component={SignUp} />
      <Route path={PATHS.createDiary} component={CreateDiary} />
      <Route path={PATHS.myDiary} component={MyDiary} />
    </Switch>
  )
}