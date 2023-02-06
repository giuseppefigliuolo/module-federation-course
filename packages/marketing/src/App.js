import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import {
  StylesProvider,
  createGenerateClassName
} from '@material-ui/core/styles'

import Landing from './components/Landing'
import Pricing from './components/Pricing'

const generateClassName = createGenerateClassName({
  // questo in prod crea le classi con il prefisso di "ma" - e questo sarà solo per le classi di marketing applications
  productinPrefix: 'ma'
})

export default () => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/pricing" component={Pricing} />
            <Route path="/" component={Landing} />
          </Switch>
        </BrowserRouter>
      </StylesProvider>
    </div>
  )
}
