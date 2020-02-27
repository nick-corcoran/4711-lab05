var express = require('express');
var app = express();
var bodyParser  = require("body-parser");
var path = require("path");
var fs = require("fs")

app.use(express.static(path.join(__dirname, '/public/css')));
app.use(express.static(path.join(__dirname, '/public/js')));
app.use(bodyParser.json());


const expressHbs = require('express-handlebars');
app.engine(
    'hbs',
    expressHbs({
        layoutsDir: 'views/layouts/',
        defaultLayout: 'main-layout',
        extname: 'hbs'
    })
);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.listen(process.env.PORT || 3000);

 
//called when request for page is made
app.get("/", (req, res) => {
    fs.readFile('./public/jsonData.json', (err, data) => {
        if (err) {
            console.error(err)
        }
        else {
            var array = JSON.parse(data)
            res.render('artist', { "artist": array })
        }
    })

})

// called when request is made to add a new artist
app.post("/new", (req, res) => {
    fs.readFile('./public/jsonData.json', (err, data) => {
        if (err) {
            return console.error(err);
        }
        else {
            var dataToInsert = req.body;
            var array = JSON.parse(data);
            console.log(dataToInsert);
            array.push(dataToInsert);
            var suc = writeToFile(array);
            if (suc){
                sendDataToClient(res)
            }
            
        }
    })
    
})

//called when a request is made to delete an artist
app.get("/delete", (req, res) => {
    var id = req.query.id;
    fs.readFile("./public/jsonData.json", (err, data) => {
        if (err) {
            console.error("error");
        }
        else {
            var array = JSON.parse(data);
            array.splice(id, 1);
            var success = writeToFile(array)
            if (success) {
                console.log("leedle")
                sendDataToClient(res);
            }
        }
    })
})


function sendDataToClient(res) {
    fs.readFile("./public/jsonData.json", (err,data) => {
        if (err) {
            console.log("error")
        }
        else {
            var array = JSON.parse(data);
            res.json(array);
        }
    })
}

function writeToFile(data) {
    fs.writeFile("./public/jsonData.json", JSON.stringify(data), (err) => {
        if (err) {
            console.error(err)
            return next(err);
        }
    
    })
    console.log("file write success");
    return true;
    
}
