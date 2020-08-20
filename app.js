require('dotenv').config()

const express = require("express"),
      app = express(),
      axios = require("axios");

app.set("view engine", "ejs");

app.use(express.static("node_modules/@fortawesome/fontawesome-free"));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("search");
});

app.get("/results", (req, res) => {
    let query = req.query.search,
        url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&s=${query}`;
    axios.get(url)
    .then((response) => {
      let data = response["data"].Search;
      res.render("results", {data:data, query:query})
    })
    .catch((error) => {
        console.log(error);
        res.render("error");
    })

});

app.get("/results/:id", function(req, res){
    let id = req.params.id,
        url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_KEY}&i=${id}`;
    axios.get(url)
    .then(function(response){
        let data = response["data"];
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