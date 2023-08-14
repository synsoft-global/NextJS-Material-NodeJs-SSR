import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


export default function Loader() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [loadingCompleted, setLoadingCompleted] = useState(false)


  useEffect(() => {
    if (router.isReady || !loadingCompleted) setTimeout(() => {
      setLoading(false)
      setLoadingCompleted(true)
    }, 500)
  }, [router.isReady])

  if (!loading || loadingCompleted) return <></>

  return (
    <div id='loader'>
      <style jsx>{`        
        #loader {
          z-index: 1300;
          background-color: rgba(0, 0, 0, 0.8);
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .loader-circle {
          width: 80px;
          height: 80px;
          position: relative;
          animation: 2s linear infinite spin;
        }
        
        .loader-circle:before,
        .loader-circle:after {
          content: '';
          position: absolute;
          inset: 5px;
          border-radius: 100%;
          border: 3px solid transparent;
          border-top-color: #d4b97c;
          animation: 3s linear infinite spin;
        }
        
        .loader-circle:after {
          inset: 15px;
          border-top-color: #70b9c6;
          animation: 1.5s linear infinite spin;
        }
        
        @keyframes spin {
          0% {
              transform: rotate(0);
          }
          100% {
              transform: rotate(360deg);
          }
        }
      `}</style>
      <div className='loader-circle'></div>
    </div>
  )
}