import config from '@/config/config.json'

export default async function handler(req, res) {
  let { url } = req.query
  url = url?.replace(config.baseUrl, '')
  if (!url.endsWith('/')) url = url + '/'
  try {
    await res.revalidate(url)
    return res.json({ revalidated: true })
  } catch (error) {
    return res.status(400).send({ error, url, message: 'Error revalidating ' })
  }
}