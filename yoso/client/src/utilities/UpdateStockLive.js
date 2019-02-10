import PantryAPI from "../utilities/PantryAPI";
import moment from "moment";

export default async function UpdateStock(purchases) {
  console.log(`purchases we're working with are: `, purchases);
  const time = moment();
  if (purchases.length > 0) {
    console.log(` purchases[0].PantryId is ${purchases[0].PantryId}`);
    const pantry = await PantryAPI.getPantryItembyId(purchases[0].PantryId);

    console.log(`the pantry is `, pantry);
    // Step 1: Update the frequency of the pantry item based on the purchases.
    const length = purchases.length;
    if (length > 1) {
      const daysBetween = moment(time).diff(
        moment(purchases[length - 1].createdAt),
        "days"
      );
      console.log(`daysbetween is ${daysBetween} and length is ${length}`);
      const data = {
        frequency: Math.floor(daysBetween / length) + 1
      };
      const result = await PantryAPI.updatePantryItem(
        purchases[0].PantryId,
        data
      );
      console.log(`Update pantry frequency: `, result);
    }

    // Step 2: Update stock for each item in the pantry
    console.log(
      `purchases[length-1].expiration: ${
        purchases[length - 1].expiration
      }; simDate = ${purchases[length - 1].createdAt}; frequency is ${
        pantry.data.frequency
      }
      }`
    );
    if (purchases[length - 1].expiration !== undefined) {
      console.log(`checking for outdates...`);
      const lastPurchaseDate = purchases[length - 1].createdAt;
      const nextPurchaseDate = moment(lastPurchaseDate).add(
        pantry.data.frequency,
        "days"
      );
      if (
        moment(purchases[length - 1].expiration).diff(
          moment(nextPurchaseDate),
          "days"
        ) < 0
      ) {
        const data = { stock: "OUT" };
        const result = await PantryAPI.updatePantryItem(
          purchases[length - 1].PantryId,
          data
        );
        console.log(result);
      } else if (
        moment(purchases[length - 1].expiration).diff(
          moment(moment(nextPurchaseDate).add(pantry.data.frequency, "days")),
          "days"
        ) < 0
      ) {
        const data = { stock: "LOW" };
        const result = await PantryAPI.updatePantryItem(
          purchases[length - 1].PantryId,
          data
        );
        console.log(result);
      } else {
        const data = { stock: "ENOUGH" };
        const result = await PantryAPI.updatePantryItem(
          purchases[length - 1].PantryId,
          data
        );
        console.log(result);
      }
    } else {
      const data = { stock: "OUT" };
      const result = await PantryAPI.updatePantryItem(
        purchases[length - 1].PantryId,
        data
      );
      console.log(result);
    }
  }
}
