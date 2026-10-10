// pages/api/submit-indexnow.js
// Call this route after adding new pages to auto-submit to Bing/Yahoo/DuckDuckGo
// GET /api/submit-indexnow?secret=YOUR_SECRET
// Or call it from a deploy hook

export default async function handler(req, res) {
  // Optional: protect with a secret
  // if (req.query.secret !== process.env.INDEXNOW_SECRET) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }

  const INDEXNOW_KEY = '488e82797bd84c99ab2cd80006f92316';
  const HOST = 'www.hamropets.com';

  const urlsToSubmit = [
    'https://www.hamropets.com/donate',
    // Add more URLs here as you create new pages
  ];

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: urlsToSubmit,
      }),
    });

    if (response.ok || response.status === 200 || response.status === 202) {
      return res.status(200).json({
        success: true,
        submitted: urlsToSubmit,
        status: response.status,
        message: 'URLs submitted to IndexNow (Bing, Yahoo, DuckDuckGo)',
      });
    } else {
      const text = await response.text();
      return res.status(500).json({
        success: false,
        status: response.status,
        message: text,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
