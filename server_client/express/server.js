var express = require('express');
var app = express();

// Settings for server, e.g. allow CORS(Cross - Origin Resource Sharing)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");

    // https://enable-cors.org/server_expressjs.html
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    // "*" is not supported in some browser? e.g. Firefox 68 (below link)
    // https://stackoverflow.com/questions/32332882/missing-token-access-control-allow-headers-in-cors-header-access-control-allo
    // res.header("Access-Control-Allow-Headers", "*");

    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

//express.static to set static files
//add a public folder and put your files
app.use("/public", express.static('public'));

app.get("/", (req, res)=>{
    res.send("hello get");
});

app.get("/my", (req, res)=>{
    res.send("this is my");
});

app.get("/del_user", (req, res)=>{
    res.send("this is delete user");
});

app.get("/ab*cd", (req, res)=>{
    res.send("this is ab*cd");
});

app.post("/", (req, res)=>{
    res.send("hello post");
});

var server = app.listen(8081, ()=>{
    var host = server.address().address;
    var port = server.address().port;
    console.log("server address is http://%s:%s", host, port);
});