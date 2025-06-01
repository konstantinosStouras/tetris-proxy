export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const sheetUrl = 'https://script.google.com/macros/s/AKfycbzT-UK27qirDrcPyfNldgAAXEd0UUTMler2vXaq4zETdxvKvx6kcZru8fx6lIjFDEZIGg/exec';

  try {
    const response = await fetch(sheetUrl, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' }
    });

    const text = await response.text();
    return res.status(200).send(text);
  } catch (error) {
    console.error('Error posting to Google Sheet:', error);
    return res.status(500).send('Server Error');
  }
}
