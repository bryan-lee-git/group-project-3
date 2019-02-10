import hedge from "./Hedge";

export default function BuildPantry(category, index, target, UserId) {
  //console.log(`UserId is ${UserId} and index for the category is ${index}`);
  // console.log(`category length is ${category.length}`);

  const item = {};
  item.name = category[target];
  item.UserId = UserId;

  switch (index) {
    case 0: //nonVegan
      item.shelfLife = 14 + hedge(3);
      item.frequency = 10 + hedge(5);
      item.stock = Math.random < 0.5 ? "LOW" : "ENOUGH";
      item.category = "Non-Vegan";
      break;
    case 1: //bread
      item.shelfLife = 10 + hedge(3);
      item.frequency = 8 + hedge(5);
      item.stock = Math.random < 0.5 ? "LOW" : "ENOUGH";
      item.category = "Bread";
      break;
    case 2: //cheese
      item.shelfLife = 30 + hedge(10);
      item.frequency = 45 + hedge(10);
      item.stock = Math.random < 0.5 ? "LOW" : "ENOUGH";
      item.category = "Cheese";
      break;
    case 3: //stable
      item.shelfLife = 200 + hedge(50);
      item.frequency = 100 + hedge(90);
      item.stock = Math.random < 0.5 ? "LOW" : "ENOUGH";
      item.category = "Shelf-Stable Groceries";
      break;
    case 4: //condiments
      item.shelfLife = 250 + hedge(60);
      item.frequency = 250 + hedge(240);
      item.stock = Math.random < 0.5 ? "LOW" : "ENOUGH";
      item.category = "Condiments";
      break;
    case 5: //produce
      item.shelfLife = 10 + hedge(5);
      item.frequency = 14 + hedge(9);
      item.stock = Math.random < 0.5 ? "LOW" : "ENOUGH";
      item.category = "Produce";
      break;
    case 6: // canned
      item.shelfLife = 730 + hedge(60);
      item.frequency = 365 + hedge(340);
      item.stock = Math.random < 0.5 ? "LOW" : "ENOUGH";
      item.category = "Canned Goods";
      break;
    case 7: // spices
      item.shelfLife = 730 + hedge(60);
      item.frequency = 365 + hedge(60);
      item.stock = Math.random < 0.5 ? "LOW" : "ENOUGH";
      item.category = "Spices";
      break;
    case 8: // frozen
      item.shelfLife = 365 + hedge(120);
      item.frequency = 200 + hedge(170);
      item.stock = Math.random < 0.5 ? "LOW" : "ENOUGH";
      item.category = "Frozen Foods";
      break;
    case 9: // household
      item.shelfLife = 1000;
      item.frequency = 100 + hedge(80);
      item.stock = Math.random < 0.5 ? "LOW" : "ENOUGH";
      item.category = "Household";
      break;
    default:
      item.shelfLife = 14 + hedge(4);
      item.frequency = 14 + hedge(4);
      item.stock = Math.random < 0.5 ? "LOW" : "ENOUGH";
  }

  console.log(
    `targetIndex is ${target} and the item category is: `,
    item.category
  );

  return item;
}
