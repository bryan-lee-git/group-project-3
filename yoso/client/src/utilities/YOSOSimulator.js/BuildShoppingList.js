import random from "./Random";

export default function BuildShoppingList(YOSO, pantry, userMemory) {
  let userList = [];
  let nonYOSO = pantry.filter(item => !YOSO.includes(item));
  YOSO.forEach(item => {
    const target = Math.random();
    console.log(
      `inside build shopping list, target is ${target} and userMemory is ${userMemory}`
    );
    if (target < userMemory) {
      // Part One: Determine False Negatives

      userList.push(item);
    }
    const target2 = Math.random();
    console.log(
      `inside build shopping list, target2 is ${target2} and userMemory is ${userMemory}`
    );
    if (target2 > userMemory) {
      // Part Two: Determine False Positives

      userList.push(nonYOSO[random(nonYOSO.length)]);
    }
  });
  return userList;
}
