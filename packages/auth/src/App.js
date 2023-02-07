import React from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'

import Signin from './components/Signin'
import Signup from './components/Signup'

const generateClassName = createGenerateClassName({
  // questo in prod crea le classi con il prefisso di "ma" - e questo sarà solo per le classi di marketing applications
  productinPrefix: 'au'
})

export default ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin">
              <Signin onSignIn={onSignIn}></Signin>
            </Route>
            <Route path="/auth/signup">
              <Signup onSignIn={onSignIn}></Signup>
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}
