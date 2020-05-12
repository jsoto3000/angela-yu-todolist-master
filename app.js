//jshint esversion:6

const express = require('./node_modules/express');
const bodyParser = require("./node_modules/body-parser");
const date = require(__dirname + "/date.js")

const app = express();

app.set('view engine', 'ejs'); //tells the app to use ejs view engine - must be placed below the app const or it will not exist yet!!1
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static("public"));
app.use(bodyParser.json());

let item;
let homeItems = ["Finish JS Course", "Finish Python Course"];
let workItems = [];
// let listsType = ["Home List", "Work List"];


let name = 'Javier';

const clearArrs = (arr) => {
    if (arr.length > 10) {
        arr.shift()
    }  else {
        arr.push(item);
    }
};

const deleteBtn = () => {
    let checkbox = document.querySelector('input[type="checkbox"]');
    let clearBtn = document.querySelector('.clear');

    clearBtn.addEventListener('click', function(event) {
        if (checkbox) {
            let listItem = document.querySelector('.listItem');
            let container = listItem.parentNode;
            container.removeChild(listItem);
        }

    });
};

app.get("/", function (req, res) {

    let day = date.getDate()

    res.render("lists", {
        kindOfDay: day,
        listsType: 'Home List',
        userName: name,
        newListItems: homeItems,

    });
});

app.post("/", function (req, res) {
    item = req.body.newItem;
    console.log(item);
    if (req.body.list === "Work List") {

        clearArrs(workItems);
        res.redirect('/work');


    } else {
        clearArrs(homeItems);
        // homeItems.push(item);
        res.redirect("/");
    }
});

app.get('/work', function(req, res) {

    let day = date.getDate()

    res.render('lists', {
        kindOfDay: day,
        listsType: "Work List",
        userName: name,
        newListItems: workItems });

});

app.post('/profile', function(req, res) {
    res.send("Success");

    let item = req.body.newItem;
    workItems.push(homeItems);
    res.redirect('/work');
});

app.get('/about', function(req, res) {
  res.render('about');
})


app.listen(3001, function () {
    console.log("server is running on port 3001");
});
