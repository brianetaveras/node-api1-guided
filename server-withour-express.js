const http = require("http");


const server = http.createServer((req, res)=>{
    res.statusCode = 200;

    res.setHeader("Content-Type", "application/json");
    res.write(`{"message": "hello, world"}`);

    res.end()
});

server.listen(8080, ()=>{
    console.log("Server started at http://localhost:8080");
});