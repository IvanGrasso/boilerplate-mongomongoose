require('dotenv').config();

/** 1) Install & Set up mongoose */
mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

/** 2) Create a 'Person' Model */
const Schema = mongoose.Schema;
const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model("Person", personSchema);

/** 3) Create and Save a Person */
const createAndSavePerson = (done) => {
  var person = new Person({name: "Kevin Furman", age: 29, favoriteFoods: ["Falafel", "Kebab", "Pizza Napoletana"]})
  person.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data);
  })
};

/** 4) Create Many Records with model.create() */
var arrayOfPeople = [
    {name: "Kevin Furman", age: 29, favoriteFoods: ["Falafel", "Kebab", "Pizza Napoletana"]},
    {name: "Matías Valdes", age: 29, favoriteFoods: ["Chocolate"]}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (err, people) {
      if (err) return console.log(err);
      done(null, people);
  });
};

/** 5) Use model.find() to Search Your Database */
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, personFound) {
      if (err) return console.log(err);
      done(null, personFound);
  })
};

/** 6) Use model.findOne() to Return a Single Matching Document from Your Database */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: [food]}, function (err, personFound) {
      if (err) return console.log(err);
      done(null, personFound);
  });
};

/** 7) Use model.findById() to Search Your Database By _id */
const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, personFound) {
      if (err) return console.log(err);
      done(null, personFound);
  })
};

/** 8) Perform Classic Updates by Running Find, Edit, then Save */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, personFound) {
      if (err) return console.log(err);
      personFound.favoriteFoods.push(foodToAdd);
      personFound.save(function(err, data) {
          if (err) return console.error(err);
          done(null, data);
      });
  });
};

/** 9) Perform New Updates on a Document Using model.findOneAndUpdate() */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName}, function (err, doc) {
      if (err) return console.log(err);
      personFound.age = ageToSet;
      done(null, doc);
  }, { new: true });
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
