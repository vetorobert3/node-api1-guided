const express = require('express');

const server = express();

server.listen(4000, () => {
  console.log("listening on port 4000...");
});