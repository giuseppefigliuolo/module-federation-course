import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

// mount function to start up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  // default history (browser history in questo caso) è per marketing run in isolation, se non c'è allora si usa la memory history
  const history =
    defaultHistory ||
    createMemoryHistory({
      // specifichiamo il path iniziale, e glielo passiamo da AuthApp dentro il container tramite history.location.path quando lanciamo la funzione di mount
      initialEntries: [initialPath]
    })

  //whenever a navigation occurs we have to call onNavigate function -> history.listen()
  if (onNavigate) {
    history.listen(onNavigate)
  }

  // passiamo history come memoria dove vengono salvati i dati di navigazione dentro il componente App
  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el)

  return {
    // quando il container fa della navigazione - i parametri, compreso pathname, li riceviamo da history.listen() che invocherà la nostra funzione in MarketingApp
    onParentNavigate({ pathname: nextPathname }) {
      // per non andare in loop ci serve fare un controllo se il path a cui vogliamo andare è diverso da quello vecchio
      const { pathname } = history.location
      if (pathname !== nextPathname) {
        history.push(nextPathname)
      }
    }
  }
}

// if we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root')

  // if we run marketing in isolation we wanna call a browserHistory and not a memory history (perchè in isolation non c'è conflitto con altre app)
  if (devRoot) mount(devRoot, { defaultHistory: createBrowserHistory() })
}

// we are running through container and we should export the mount function
export { mount }
