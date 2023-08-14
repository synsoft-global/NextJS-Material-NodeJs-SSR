import { useEffect } from 'react'
import Router from 'next/router'
import nProgress from 'nprogress'
import 'nprogress/nprogress.css'
nProgress.configure({ showSpinner: false })



export default function useNProgress() {
  useEffect(() => {
    Router.ready(() => {
      window.routing = []

      const checkRoute = setInterval(() => {
        if (process.env.NEXT_PUBLIC_APP_ENV === 'development') clearInterval(checkRoute)
        window.routing.map((item, index) => {
          if (Math.floor((new Date() - item?.time) / 1000) > 2) {
            if (!item?.path) return
            Router.push(item.path)
            clearInterval(checkRoute)
            window.routing.splice(index, 1)
            sessionStorage.setItem('routing', `Forcely router redirect to "${item.path}" at "${new Date().toString()}"`)
          }
        })
      }, 1000)

      const handleRoute = (path) => {
        window.routing = window.routing.filter((item) => item.path !== path)
        nProgress.done()
      }

      Router.events.on('routeChangeStart', (path) => {
        window.routing.push({ path, time: new Date() })
        nProgress.start()
      })

      Router.events.on('routeChangeError', (error, path) => {
        handleRoute(path)
      })

      Router.events.on('routeChangeComplete', (path) => {
        handleRoute(path)
        clearInterval(checkRoute)
      })
    })
  }, [])
}
