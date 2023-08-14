import config from '@/config/config.json'

export default async (req, res) => {
  try {
    const response = await fetch(config.apiBaseUrl + '/custom_api/v2/sitemapxml').then(res => res.json())
    const data = response.links
    const xml = buildXmlSitemap(data)
    res.setHeader('Content-Type', 'application/xml')
    res.send(xml)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    res.status(500).end()
  }
}


const buildXmlSitemap = (data) => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>'
  xml += '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="https://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml" xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="https://www.google.com/schemas/sitemap-image/1.1" xmlns:video="https://www.google.com/schemas/sitemap-video/1.1">'

  data = data.map(item => {
    xml += '  <url>'
    xml += `    <loc>${escapeSpecialChars(item.loc)}</loc>`
    xml += `    <lastmod>${escapeSpecialChars(item.lastmod)}</lastmod>`
    xml += `    <priority>${escapeSpecialChars(item.priority)}</priority>`
    xml += '  </url>'
  })

  xml += '</urlset>'
  return xml
}


function escapeSpecialChars(value) {
  return value.replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}