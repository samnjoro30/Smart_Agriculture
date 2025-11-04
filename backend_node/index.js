const express = require('express');
const http = require('http');

app = express();

const server = http.createServer(app);

server.listen(() => console.log('Server running on port 3000'));