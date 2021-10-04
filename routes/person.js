const express = require("express");
const router = express.Router();
const Person = require("../models/person");

//Create and Save a Record of a Model
const addSavePerson = new Person({
  name: "someDude",
  age: 100,
  favoriteFoods: ["fish", "pasta"],
});
addSavePerson
  .save()
  .then((human) => {
    console.log(human);
  })
  .catch((error) => {
    console.error(error);
  });

//Create Many Records with model.create()
let people = [
  { name: "haythem", age: 28, favoriteFoods: ["mloukhia", "chawarma"] },
  { name: "ali", age: 26, favoriteFoods: ["coffee", "pizza"] },
  { name: "salah", age: 20, favoriteFoods: ["spaguetti", "loubia"] },
  { name: "ahmed", age: 30, favoriteFoods: ["pizza", "pasta"] }
];
Person.create(people, (error, data) => {
  {
    if (error) {
      return console.log(error);
    } else {
      return console.log(null, data);
    }
  }
});

//Use model.find() to Search Your Database
Person.find({ name: "ali" }, (error, data) => {
  {
    if (error) {
      return console.log(error);
    } else {
      return console.log(null, data);
    }
  }
});

//Use model.findOne() to Return a Single Matching Document from Your Database
Person.findOne({ favoriteFoods: { $all: ["pizza"] } }, (error, data) => {
  if (error) {
    return console.log(error);
  } else {
    return console.log(null, data);
  }
});

//Use model.findById() to Search Your Database By _id
Person.findById({ _id: "615751b7ade9ffc2dadb4907" }, (error, data) => {
  if (error) {
    return console.log(error);
  } else {
    return console.log(null, data);
  }
});

//Perform Classic Updates by Running Find, Edit, then Save
Person.findOne({ name: "haythem" }, (error, data) => {
  if (error) {
    return console.log(error);
  } else {
    data.favoriteFoods.push("pizza");
    data.save();
  }
});

//Perform New Updates on a Document Using model.findOneAndUpdate()
Person.findOneAndUpdate({age: 17}, {$set:{name:"Naomi"}}, {new: true}, (err, data) => {
    if (err) {
        console.log("Something wrong when updating data!");
    }

    console.log(data);
});

//Delete One Document Using model.findByIdAndRemove
Person.findByIdAndRemove({ _id: "615751b7ade9ffc2dadb4907" }, (error, data) => {
  if (error) {
    return console.log(error);
  } else {
    return console.log(null, data);
  }
});

//MongoDB and Mongoose - Delete Many Documents with model.remove()
Person.remove({ name: "ali" }, (error, data) => {
  if (error) {
    console.log(error);
  } else {
    return console.log(null, data);
  }
});

//Chain Search Query Helpers to Narrow Search Results
Person.find({ favoriteFoods: ["pasta"] })
  .sort({ name: "asc" })
  .limit(2)
  .select("-age")
  .exec((error, data) => {
    if (error) {
      console.log(error);
    } else {
      return console.log(null, data);
    }
  });

//Export
module.exports = router;
