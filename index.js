// UI & Global Variable Declarations
const select = document.getElementById("select");
const addBtn = document.querySelector(".add-btn");
const ulList = document.getElementById("ul-items");
const clearItems = document.querySelector(".clear-items");

const container = document.querySelector(".container");
const masterlist = document.querySelector(".masterlist");

const crispDramatic = document.querySelector(".crispy-dramatic");
const mintChoco = document.querySelector(".mint-choco");
const surfTurf = document.querySelector(".surf-turf");
const blackWhite = document.querySelector(".black-white");
const themeStandard = document.querySelector(".theme-standard");

//change themes
select.addEventListener("change", () => {
  changeTheme();
});

function changeTheme() {
  document.body.classList.forEach((className) =>
    document.body.classList.remove(className)
  );

  if (select.value === "Crisp Dramatic") {
    document.body.classList.add("theme-crisp-dramatic");
  } else if (select.value === "Mint Chocolate") {
    document.body.classList.add("theme-mint-choco");
  } else if (select.value === "Surf & Turf") {
    document.body.classList.add("theme-surf-turf");
  } else if (select.value === "Black & White") {
    document.body.classList.add("theme-black-white");
  } else if (select.value === "Theme") {
    document.body.classList.add("theme-standard");
  }
  //set or save to local storage
  window.localStorage.setItem("Current_Theme", select.value);
};

//add items
(function addlist() {
  addBtn.addEventListener("click", (e) => {
    createListItem();
    e.preventDefault();
  });
})();

clearItems.addEventListener("click", (e) => {
  const listItems = document.querySelectorAll("li");
  listItems.forEach((listItem) => {
    ulList.removeChild(listItem);
  });
  e.preventDefault();
});

function createListItem(itemInputValue) {
  const list = document.createElement("li");
  const cbItem = document.createElement("input");
  cbItem.classList.add("cb-bought");
  cbItem.setAttribute("type", "checkbox");
  const itemList = document.createElement("input");
  itemList.classList.add("item-list");
  itemList.setAttribute("type", "text");
  itemList.value = itemInputValue ?? ""; //if first is undefined then ''.
  list.appendChild(cbItem);
  list.appendChild(itemList);
  ulList.appendChild(list);

  itemList.addEventListener("change", () => {
    itemList.value = itemList.value.toLowerCase();
  });
}

//set or save to local storage
function saveToLocalStorage(itemList) {
  localStorage.setItem("List_of_Items", JSON.stringify(itemList));
  // localStorage.getItem('List_of_Items');
}

// get or load from local storage
// (function getItems() {
const retrieveItems = JSON.parse(localStorage.getItem("List_of_Items")) ?? [];
retrieveItems.forEach((itemInputValue) => {
  createListItem(itemInputValue);
});
// })();

masterlist.addEventListener("click", () => {
  const itemInputFields = document.querySelectorAll(".item-list");
  const itemValues = [];
  itemInputFields.forEach((inputField) => {
    itemValues.push(inputField.value);
  });
  saveToLocalStorage(itemValues);
});

//load - get item - theme from local storage
const theme = window.localStorage.getItem("Current_Theme") ?? "Theme";
console.log('saved theme', theme);
select.value = theme;
changeTheme();
