import config from "@/config/config.json"



export function getTextFromHTML(htmlString) {
  try {
    const element = document.createElement('div')
    element.innerHTML = htmlString
    return element.textContent || element.innerText || ''
  }
  catch (error) { return htmlString }
}


export function convertStringToHTML(string) {
  var element = document.createElement('div')
  element.innerHTML = string
  return element
}


export function capitalizeWords(str) {
  return str.toLowerCase().replace(/\b\w/g, function (match) {
    return match.toUpperCase()
  })
}


export function upperCaseWords(str) {
  return str.toUpperCase()
}


export function replaceUrl(originalString, onlyPath) {
  var regex1 = /https:\/\/www\.synsoftglobal\.net\/synsoft-react/gi
  var regex2 = /https:\/\/api\.synsoftglobal\.com/gi
  var url = originalString.replace(regex1, onlyPath ? '' : config.baseUrl).replace(regex2, onlyPath ? '' : config.baseUrl)
  url = url == '#' ? '#!' : url
  return url || '#!'
}


export const handleMeta = (content) => {
  content = replaceUrl(content)

  const replacements = [
    { search: '<meta property="og:image" content="https://www', replace: '<meta property="og:image" content="https://api' },
    { search: '<meta name="twitter:image" content="https://www', replace: '<meta name="twitter:image" content="https://api' },
  ]

  if (process.env.NEXT_PUBLIC_APP_ENV === 'production') {
    replacements.push(
      { search: 'noindex', replace: 'index' },
      { search: 'nofollow', replace: 'follow' }
    )
  }

  replacements.forEach(({ search, replace }) => {
    content = content.replace(new RegExp(search, 'g'), replace)
  })

  return content
}
