let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];
let currencyUnits = [
  ["PENNY", 0.01],
  ["NICKEL", 0.05],
  ["DIME", 0.1],
  ["QUARTER", 0.25],
  ["ONE", 1],
  ["FIVE", 5],
  ["TEN", 10],
  ["TWENTY", 20],
  ["ONE HUNDRED", 100],
];

let cash = document.getElementById("cash");
let changeDueDiv = document.getElementById("change-due");
let registerDiv = document.getElementById("register-div");
let priceContainer = document.getElementById("price-container");
let cidContainer = document.getElementById("cid-container");
let purchaseButton = document.getElementById("purchase-btn");

// purchaseButton.addEventListener("click", () => {
//   const cashVal = parseFloat(cash.value);
//   const changeDue = cashVal - price;
//   if (cashVal < price) {
//     window.alert("Customer does not have enough money to purchase the item");
//     return;
//   } else if (cashVal === price) {
//     changeDueDiv.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
//     return;
//   }

//   const changeResult = getChange(changeDue, cid);

//   if (
//     changeResult.status === "INSUFFICIENT_FUNDS" ||
//     changeResult.status === "CLOSED"
//   ) {
//     changeDueDiv.innerText = `Status: ${changeResult.status} ${formatChange(
//       changeResult.change
//     )}`;
//   } else {
//     changeDueDiv.innerText = `Status: ${changeResult.status} ${formatChange(
//       changeResult.change
//     )}`;
//   }
// }); //end of purchaseButton eventListener

purchaseButton.addEventListener("click", () => {
  const cashVal = parseFloat(cash.value);
  const changeDue = cashVal - price;
  if (cashVal < price) {
    window.alert("Customer does not have enough money to purchase the item");
    return;
  } else if (cashVal === price) {
    changeDueDiv.innerHTML = `<p>No change due - customer paid with exact cash</p>`;
    return;
  }

  const changeResult = getChange(changeDue, cid);

  changeDueDiv.innerText = `Status: ${
    changeResult.status
  }, Change: ${formatChange(changeResult.change)}`;
});


// const getChange = (changeDue, cid) => {
//   //gets total amount of money in drawer
//   let totalCid = parseFloat(
//     cid.reduce((sum, [_, amount]) => sum + amount, 0).toFixed(2)
//   );
//   //returns a new status object if the changeDue is greater than totalCid (cash in drawer)
//   if (totalCid < changeDue) {
//     return { status: "INSUFFICIENT_FUNDS", change: [] };
//   }

//   if (totalCid === changeDue) {
//     return { status: "CLOSED", change: cid };
//   }

//   let changeArray = [];
//   let remainingChange = [];

//   //iterate currency units backwards
//   for (let i = currencyUnits.length - 1; i >= 0; i--) {
//     let unit = currencyUnits[i][0];
//     let unitValue = currencyUnits[i][1];
//     let unitInDrawer = cid[i][0];

//     if (unitValue <= remainingChange && unitInDrawer > 0) {
//       let amountFromUnit = 0;

//       while (remainingChange >= unitValue && unitInDrawer > 0) {
//         remainingChange = (remainingChange - unitValue).toFixed(2);
//         unitInDrawer -= unitValue;
//         amountFromUnit += unitValue;
//       }

//       if (amountFromUnit > 0) {
//         changeArray.push([unit, amountFromUnit]);
//       }
//     }
//   } //end of for loop

//   if (remainingChange > 0) {
//     return { status: "INSUFFICIENT_FUNDS", change: [] };
//   }

//   if (changeDue === totalCid) {
//     return { status: "CLOSED", change: cid };
//   }

//   return { status: "OPEN", change: changeArray };
// }; //end of getChange() function

const getChange = (changeDue, cid) => {
  //gets total amount of money in drawer
  let totalCid = parseFloat(
    cid.reduce((sum, [_, amount]) => sum + amount, 0).toFixed(2)
  );
  //returns a new status object if the changeDue is greater than totalCid (cash in drawer)
  if (totalCid < changeDue) {
    return (changeDueDiv.innerText = "Status: INSUFFICIENT_FUNDS");
  }

  if (totalCid === changeDue) {
    return { status: "CLOSED", change: cid };
  }

  let changeArray = [];
  let remainingChange = changeDue;

  //iterate currency units backwards
  for (let i = currencyUnits.length - 1; i >= 0; i--) {
    let unit = currencyUnits[i][0];
    let unitValue = currencyUnits[i][1];
    let unitInDrawer = cid[i][1];

    if (unitValue <= remainingChange && unitInDrawer > 0) {
      let amountFromUnit = 0;

      while (remainingChange >= unitValue && unitInDrawer > 0) {
        remainingChange = (remainingChange - unitValue).toFixed(2);
        unitInDrawer -= unitValue;
        amountFromUnit += unitValue;
        remainingChange = parseFloat(remainingChange);
      }

      if (amountFromUnit > 0) {
        changeArray.push([unit, amountFromUnit]);
      }
    }
  } //end of for loop

  if (remainingChange > 0) {
    return (changeDueDiv.innerText = "Status: INSUFFICIENT_FUNDS");
  }

  return { status: "OPEN", change: changeArray };
}; //end of getChange() function


// const formatChange = (changeArray) => {
//   changeArray
//     .map(([unit, amount]) => {
//       if (amount !== 0) {
//         return `${unit}: $${amount.toFixed(2)}`;
//       }
//     })
//     .join(" ");
// };

const formatChange = (changeArray) => {
  return changeArray
    .map(([unit, amount]) => {
      return `${unit}: $${amount.toFixed(2)}`;
    })
    .join(" ");
};



//  takes whatever price variable is and generates up to date HTML
// const generatePrice = (currentPrice) => {
//   priceContainer.innerHTML = `<h3>Price: ${currentPrice}</h3>`;
// };
// generatePrice(price);

// // takes whatever is curred Cash In Drawer (cid) and generates up to date HTML
// const genereateCID = (currentCID) => {
//   let HTMLString = "<h3>Cash In Drawer</h3>";
//   currentCID.map((c) => {
//     HTMLString += `<p>${c[0]}: $${c[1]}</p>`;
//   });
//   cidContainer.innerHTML = HTMLString;
// };
// genereateCID(cid);
