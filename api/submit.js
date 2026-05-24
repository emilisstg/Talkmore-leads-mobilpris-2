export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = req.body;
    const recordId = body.recordId;
    const fields = body.fields;

    const AIRTABLE_URL = 'https://api.airtable.com/v0/appFDZvEK2WMBtjoi/tblk6zq7y5eKGHVPE';
    const AIRTABLE_KEY = process.env.AIRTABLE_KEY;

    const url = recordId ? AIRTABLE_URL + '/' + recordId : AIRTABLE_URL;
    const method = recordId ? 'PATCH' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Authorization': 'Bearer ' + AIRTABLE_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fields: fields })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
}
