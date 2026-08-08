export default async function handler(req, res) {
  const PROXY_BASE_URL = 'https://kurseut-cdnkocax.hf.space';
  
  // Wajib mengambil dari Environment Variable Vercel
  const SECRET_TOKEN = process.env.PROXY_TOKEN;

  if (!SECRET_TOKEN) {
    return res.status(500).json({ error: "PROXY_TOKEN belum diset di Environment Variables Vercel!" });
  }

  const { channel } = req.query;

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
      return res.redirect(302, data.mpd);
    } else {
      return res.status(502).json({ error: "Ditolak HF", response: data });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
