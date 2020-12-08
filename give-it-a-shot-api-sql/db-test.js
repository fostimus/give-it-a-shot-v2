const db = require("./models");

db.user
  .findOrCreate({
    where: {
      firstName: "Brock"
    }
  })
  .then(([returnedUser, created]) => {
    db.drink
      .findOrCreate({
        where: {
          name: "Strawberry Margarita"
        }
      })
      .then(([returnedDrink, created]) => {
        returnedUser.addDrink(returnedDrink).then(relationInfo => {
          console.log(
            `${returnedUser.firstName} favorited ${returnedDrink.name}`
          );
        });
      });
  });

const testDrink = "Mezcal Negroni";
db.drink
  .findOrCreate({
    where: {
      name: testDrink
    }
  })
  .then(([returnedDrink, created]) => {
    returnedDrink.getUsers().then(returnedUsers => {
      console.log("We love " + testDrink + "!");
      returnedUsers.forEach(user => {
        console.log(user.firstName);
      });
    });
  });

const testUser = "Brock";
db.user
  .findOrCreate({
    where: {
      firstName: testUser
    }
  })
  .then(([returnedUser, created]) => {
    returnedUser.getDrinks().then(returnedDrinks => {
      console.log(testUser + " loves:");
      returnedDrinks.forEach(drink => {
        console.log(drink.name);
      });
    });
  });
