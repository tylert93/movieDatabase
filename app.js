require('dotenv').config()

var express = require("express"),
    app = express(),
    axios = require("axios");

app.set("view engine", "ejs");

app.use(express.static("node_modules/@fortawesome/fontawesome-free"));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("search");
})

app.get("/results", function(req, res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&s=" + query;
    axios.get(url)
    .then(function(response){
      var data = response["data"].Search;
      res.render("results", {data:data, query:query})
    })
    .catch(function(error){
        console.log(error);
        res.render("error");
    })

})

app.get("/results/:id", function(req, res){
    var id = req.params.id;
    var url = "http://www.omdbapi.com/?apikey=" + process.env.OMDB_KEY + "&i=" + id;
    axios.get(url)
    .then(function(response){
        var data = response["data"];
        res.render("show", {data:data})
    })
    .catch(function(error){
        console.log(error);
        res.render("error");        
    })
});

app.get("*", function(req, res){
    res.render("error");
});
      
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("movie database in running ...");
});      