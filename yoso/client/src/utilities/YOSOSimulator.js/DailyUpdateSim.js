import PurchasesAPI from "../PurchasesAPI";
import moment from "moment";
import PantryAPI from "../PantryAPI";
import UpdateStock from "./UpdateStockSim";

export default async function DailyUpdate(pantry, time) {
  let everything = [];

  const allPurchases = pantry.map(async item => {
    const purchases = await PurchasesAPI.getPurchases(item.id);
    everything.push(purchases);
    // console.log(
    //   `inside dailyupdate, here is the length of the purchases result for pantry id= ${
    //     item.id
    //   } length: ${purchases.length}`
    // );
  });
  console.log(`Eveything is...`, everything);

  const results = await Promise.all(allPurchases);

  for (const pantryItem of everything) {
    await UpdateStock(pantryItem.data, time);
  }
  return everything;
}
