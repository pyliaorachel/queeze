const path = require('path');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

// Need to redirect all initial traffic to indez.html so that react router can start to take on the work
// https://tylermcginnis.com/react-router-cannot-get-url-refresh/
app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

app.listen(PORT, error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}`)
));