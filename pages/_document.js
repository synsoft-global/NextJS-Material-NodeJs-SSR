import { Html, Head, Main, NextScript } from 'next/document'
import config from '@/config/config.json'
import Script from 'next/script'



export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="google-site-verification" content="MDX6CZQFHcFnhui8AQZ5re3hjUJ5zSykea6O9Y6lVDg" />
        <link rel="shortcut icon" href={`${config.basePath}/image/favicon.ico`} type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href={`${config.basePath}/image/apple-touch-icon.png`} />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700;800&family=Special+Elite&display=swap" rel="stylesheet"></link>
        <style>{`#clustrmaps-widget-v2{display:none !important}`}</style>
      </Head>
      <body>
        <Main />
        <NextScript />


        {/* == Google Tag Manager */}
        <noscript><iframe loading='lazy' src="https://www.googletagmanager.com/ns.html?id=GTM-5S5NM6T" title='google tag manager' height="0" width="0" style={{ display: "none", visibility: "hidden" }}></iframe></noscript>
        <Script
          id='google-tag-manager'
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-5S5NM6T');
          `,
          }}
        />


        {/* == Google Analytics == */}
        <Script strategy="lazyOnload" src="https://www.googletagmanager.com/gtag/js?id=UA-109274789-1" />
        <Script
          id='google-analytics'
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-109274789-1');
          `,
          }}
        />


        {/* == Tawk == */}
        <Script strategy="lazyOnload" dangerouslySetInnerHTML={{
          __html: `
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
          var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
          s1.async=true;
          s1.src='https://embed.tawk.to/5bda8c9522b2be1613fe53e3/default';
          s1.charset='UTF-8';
          s1.setAttribute('crossorigin','*');
          s0.parentNode.insertBefore(s1,s0);
          })();
        `}} />

        <Script strategy="lazyOnload" id="clustrmaps" src="https://cdn.clustrmaps.com/map_v2.js?d=4wmXXxwTUTol0cneLq1EVRKnWkwcN1hullMAms0TULo&cl=ffffff&w=a" />
      </body>
    </Html>
  )
}
