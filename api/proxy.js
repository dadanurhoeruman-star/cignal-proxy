export default async function handler(req, res) {
  const PROXY_BASE_URL = 'https://kurseut-cdnkocax.hf.space';
  
  // Mengambil token dari Environment Variable Vercel / fallback manual
  //const SECRET_TOKEN = process.env.PROXY_TOKEN || '1pT4rN7xM0qTrNxMqKwBy_uJhLnPrTvXzAvcFmGsHjQyEoWiUaZlCfVpTrNxMqKwBy_uJhLnPrTvXzAcFmGsHjQyEoWiUaZlCfVpTrNxMqKwBy~9kP_rX2vL-qT48wY6zA1cF~3hJ5n0rB_t9uD_kM4vX6sH8jQ_yE1oW3iU5aZ7lC9fV2pT_rN6xM8qK0wB~y3uJ5hL7nP9rT2vX4zA6cF8mG0sHkzA4cF6hJ8nP0rB_t~k9uD2mG5vX7sH0jQ_yE3oW6iU9aZ_lC2fV4pT_rN7xM0qK3wB~y8uJ1hL4nP6rT9vX2zA5NxMqKwBy~4eQ8tY1pR3xM5vL7qT9wY2zA4cF6hJ8nP0rB_t~k9uD2mG5vX7sH0jQ_yE3oW6iU9aZ_lC2fV4pT_rN6xM8qK0wB~y3uJ5hL7nP9rT2vX4zA6cF8mG0sHkzA4cF6hJ8nP0rB_t~k9uD2mG5vX7sH0jQ_yE3oW6iU9aZ_lC2fV4pT_rN7xM0qK3wB~y8uJ1hL4nP6rT9vX2zA5uJhLnPrTvXzAcFmGsHjQyEoWiUaZlCfVpTrNxMqKwBy_uJhLnPrTvXzAcFmGsHjQyEoWiUaZlCfVpTrNxMqKwBy~4eQ8tY1pR3NxMqKwBy~4eQ8tY1pR3xM5vL7qT9wY2zA4cF6hJ8nP0rB_t~k9uD2mG5vX7sH0jQ_yE3oW6iU9aZ_lC2fV4pT_rN7xM0qK3wB~y8uJ1hL4nP6rT9vX2zA5NxMqKwBy~4eQ8tY1pR3xM5vL7qT9wY2zA4cF6hJ8nP0rB_t~k9uD2mG5vX7sH0jQ_yE3oW6iU9aZ_lC2fV4pT_rN7xM0qK3wB~y8uJ1hL4nP6rT9vX2zA5';
  const SECRET_TOKEN = process.env.PROXY_TOKEN;
  
  const { channel } = req.query; // Panggilan URL nanti: ?channel=cg_hbohd

  if (!channel) {
    return res.status(400).json({ error: "Parameter channel tidak ada" });
  }

  const hfUrl = `${PROXY_BASE_URL}/${channel}/index.mpd?token=${SECRET_TOKEN}`;

  try {
    const hfResponse = await fetch(hfUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': `${PROXY_BASE_URL}/`,
        'Origin': PROXY_BASE_URL,
        'Accept': 'application/json, text/plain, */*'
      }
    });

    const data = await hfResponse.json();

    if (data && data.mpd) {
      // Redirect 302 otomatis ke URL asli Mediaquest
      return res.redirect(302, data.mpd);
    } else {
      return res.status(502).json({ error: "Ditolak HF", response: data });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
