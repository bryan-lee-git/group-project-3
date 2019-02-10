import PurchasesAPI from "../PurchasesAPI";

export default async function MakePurchase(data) {
  await PurchasesAPI.createPurchase(data).then(response => {
    console.log(
      `inside go shopping, here's the response from the db for the item create: `,
      response.data
    );
    return response.data;
  });
}
