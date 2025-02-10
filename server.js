const express = require('express');
const app = express();
const axios = require('axios');
const path = require('path');
const port = 8888;

app.use(express.static(path.join(__dirname, 'logans_web_site')));

// Serve static files from the 'html' folder (HTML files)
app.use(express.static(path.join(__dirname, 'html')));

// Serve static files from the 'js' folder (JavaScript files)
app.use(express.static(path.join(__dirname, 'js')));

// Serve static files from the 'img' folder (Images)
app.use(express.static(path.join(__dirname, 'img')));

// Serve static files from the 'css' folder (CSS files)
app.use(express.static(path.join(__dirname, 'css')));

app.use((req, res, next) => {
    console.log(`Request made for: ${req.url}`);
    next();
});

app.get('/callback', (req, res) => {
    // Extract the authorization code from the query parameters
    const code = req.query.code;
    if (!code) {
        return res.status(400).send("No code found in the callback");
    }

    console.log("Authorization code received: " + code);

    // Now, exchange the authorization code for an access token
    const body = new URLSearchParams({
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': 'http://localhost:8888/callback',  // Ensure this matches the registered URI
        'client_id': '940e9849b835492bb40da5b08798c4a0',
        'client_secret': '24a83b1a2259449eb182e0cd10f051f9',
    });

    // Send POST request to Spotify's token endpoint
    axios.post('https://accounts.spotify.com/api/token', body, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
        .then(response => {
            const accessToken = response.data.access_token;
            console.log('Access token:', accessToken);

            // Redirect to the landing page after successful authorization
            res.redirect('/landing_page.html'); // Redirect to your landing page
        })
        .catch(error => {
            console.error('Error exchanging token:', error);
            res.status(500).send('Error during token exchange');
        });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
