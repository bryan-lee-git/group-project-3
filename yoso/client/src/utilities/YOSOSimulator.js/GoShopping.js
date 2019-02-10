import random from "./Random";
import PurchasesAPI from "../PurchasesAPI";
import PantryAPI from "../PantryAPI";
import moment from "moment";

export default async function goShopping(pantry, time, userMemory) {
  console.log(
    `Made it inside GoShopping. Here's time: ${moment(time).format(
      "MMM DD, YYYY"
    )} userMemory: ${userMemory} and pantry: `,
    pantry
  );
  //time = the simulated shopping date.

  const userList = [];

  const YOSO = pantry.filter(item => item.stock !== "ENOUGH");
  //Step 1: Write the user's shopping list

  // Part One: Determine False Negatives

  YOSO.forEach(item => {
    const target = Math.random();
    if (target < userMemory) {
      userList.push(item);
    }
  });

  // Part Two: Determine False Positives

  pantry.forEach(item => {
    if (!YOSO.includes(item)) {
      const target = Math.random();
      if (target > userMemory) {
        userList.push(item);
      }
    }
  });

  // Step 2: Make purchases off of userList.
  console.log(`userList is: `, userList);

  const list = userList.map(async item => {
    console.log(
      `Inside goShopping, here's the item.id before making the data to go to the db: ${
        item.id
      }`
    );
    const data = {
      simDate: time,
      quantity: random(4) + 1,
      expiration: moment(time).add(random(item.shelfLife), "days"),
      PantryId: item.id
    };
    await PurchasesAPI.createPurchase(data).then(response => {
      const data = { stock: "ENOUGH" };
      const result = PantryAPI.updatePantryItem(response.data.id, data);
      console.log(result);
    });
  });
  const results = await Promise.all(list);

  console.log(results);
}
