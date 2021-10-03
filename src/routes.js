import { Route, Switch } from 'react-router-dom'
import Intro from './pages/intro'

export const PATHS = {
  intro: '/',
}

export default function Routes() {
  return (
    <Switch>
      <Route exact path={PATHS.intro} component={Intro} />
    </Switch>
  )
}