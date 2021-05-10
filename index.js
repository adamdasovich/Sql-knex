const server = require('./api/server');

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`);
});