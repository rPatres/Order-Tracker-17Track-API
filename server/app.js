require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/track-order', async (req, res) => {
    const { orderId } = req.body;

    if (!orderId) {
        return res.status(400).json({ error: 'Order ID is required' });
    }

    try {
        const response = await fetch(`https://api.17track.net/track/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${process.env.TRACK_API_KEY}`
            }
        });

        if (!response.ok) {
            throw new Error('Tracking API error');
        }

        const data = await response.json();
        res.json(data); // Send the response from the tracking API to the frontend
    } catch (error) {
        res.status(500).json({ error: 'Failed to track order' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
