import PurchasesAPI from "../utilities/PurchasesAPI";
import UpdateStockLive from "../utilities/UpdateStockLive";

export default async function DailyUpdate(pantry) {
  let everything = [];
  console.log(`Inside Daily Update...`);
  console.log(`pantry is `, pantry);

  if (pantry) {
    const allPurchases = pantry.map(async item => {
      const purchases = await PurchasesAPI.getPurchases(item.id);
      everything.push(purchases);
    });
    console.log(`Eveything is...`, everything);

    for (const pantryItem of everything) {
      await UpdateStockLive(pantryItem.data);
    }
  }
  return everything;
}
