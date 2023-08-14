import { useLayoutEffect } from 'react'
import { useRouter } from 'next/router'



export default function useElementsVariable() {
  const router = useRouter()


  function setVariables() {
    document.documentElement.style.setProperty('--screen-height', `${window.innerHeight}px`)
    document.documentElement.style.setProperty('--header-height', `${document.querySelector('#header')?.offsetHeight || 0}px`)
  }


  useLayoutEffect(() => {
    window.addEventListener('resize', setVariables)
  }, [])


  useLayoutEffect(() => {
    setVariables()
    setTimeout(() => setVariables(), 200)
  }, [router.route, router.isReady])

}
