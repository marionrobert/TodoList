//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items = ["Go shopping", "Do the dishes", "Do the laundry"];
var workItems = [];

app.get("/", function(req, res){
  let day = date.getDate();
  res.render("list", { listTitle: day, tasks: items });
});

app.post("/", function(req, res){
  console.log(req.body)
  newTask = req.body.newItem;
  if (req.body.list == "Work") {
    workItems.push(newTask);
    res.redirect("/work");
  } else {
    items.push(newTask);
    res.redirect("/");
  }
});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", tasks: workItems});
});


app.listen(3000, function(){
  console.log("Server started on port 3000");
})
