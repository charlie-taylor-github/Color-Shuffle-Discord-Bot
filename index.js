require('dotenv').config();
const express = require('express');
const startBot = require('./src/startBot');
const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is listening... [PORT: ${PORT}]`);
  startBot();
});