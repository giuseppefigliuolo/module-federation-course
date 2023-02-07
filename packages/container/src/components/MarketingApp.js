import { mount } from 'marketing/MarketingApp'
import React, { useRef, useEffect } from 'react'
// importiamo l'history object del container così da poterlo aggiornare e sincronizzare con quello del
import { useHistory } from 'react-router-dom'

export default () => {
  const ref = useRef(null)
  const history = useHistory()

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        // segniamoci qui a quale path la nostra app Marketing è andata e aggiorniamo il container - serve per sincronizzare
        // l'arg location di router history avrà una prop chiamata pathname con il nome del path al quale siamo. Qui la rinominiamo "nextPathName"
        // prima controlliamo però che il path name di history-container sia diverso dal pathname a cui dobbiamo andare
        const { pathname } = history.location
        if (pathname !== nextPathname) history.push(nextPathname)
      }
    })

    history.listen(onParentNavigate)
  }, [])

  return <div ref={ref}></div>
}
