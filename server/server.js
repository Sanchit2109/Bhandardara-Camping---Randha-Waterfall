const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

const WEATHER_API_KEY = 'YOUR_WEATHER_API_KEY';
const LOCATION = 'Your Location';

// Weather API Endpoint
app.get('/weather', async (req, res) => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${LOCATION}&appid=${WEATHER_API_KEY}&units=metric`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// Hotel Search Endpoint
app.post('/search-hotels', async (req, res) => {
    const { destination, checkIn, checkOut, guests } = req.body;
    try {
        const hotels = [
            { name: 'Hotel Luxury', price: 150, rating: 4.5 },
            { name: 'Cozy Inn', price: 90, rating: 4.0 },
            { name: 'Seaside Resort', price: 200, rating: 4.8 }
        ];
        res.json({ success: true, hotels });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching hotel data' });
    }
});

// Serve subpages
app.get('/accommodation', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/accommodation.html'));
});

app.get('/weather', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/weather.html'));
});

app.get('/tourist-spots', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/tourist-spots.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
