"use strict";

const cardIcon = document.querySelector("#card-icon");
const card = document.querySelector(".card");
const closeCard = document.querySelector("#close-card");

cardIcon.addEventListener("click", () => {
  card.classList.add("active");
});
closeCard.addEventListener("click", () => {
  card.classList.remove("active");
});

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCardButtons = document.getElementsByClassName("card-remove");
  console.log(removeCardButtons);
  for (var i = 0; i < removeCardButtons.length; i++) {
    var button = removeCardButtons[i];
    button.addEventListener("click", removeCardItem);
  }

  var quantityInputs = document.getElementsByClassName("card-quantity");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addCard = document.getElementsByClassName("add-card");
  for (var i = 0; i < addCard.length; i++) {
    var button = addCard[i];
    button.addEventListener("click", addCardClicked);
  }

  document
    .getElementsByClassName("btn-buy")[0]
    .addEventListener("click", buyButtonClicked);
}

function buyButtonClicked() {
  alert("Your order is pleaced");
  var cardContent = document.getElementsByClassName("card-content")[0];
  while (cardContent.hasChildNodes()) {
    cardContent.removeChild(cardContent.firstChild);
  }
  updatetotal();
}

function removeCardItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updatetotal();
}

function addCardClicked(event) {
  var button = event.target;
  var shopProducts = button.parentElement;
  var title = shopProducts.getElementsByClassName("product-title")[0].innerHTML;
  var price = shopProducts.getElementsByClassName("price")[0].innerHTML;
  var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProducToCard(title, price, productImg);
  updatetotal();
}

function addProducToCard(title, price, productImg) {
  var cardShopBox = document.createElement("div");
  cardShopBox.classList.add("card-box");
  var cardItems = document.getElementsByClassName("card-content")[0];
  var cardItemsNames = cardItems.getElementsByClassName("card-product-title");
  for (var i = 0; i < cardItemsNames.length; i++) {
    if (cardItemsNames[i].innerHTML == title) {
      alert("You have already add this item to card");
      return;
    }
  }
  var cardBoxContent = `
      <img src="${productImg}" class="card-img" alt="two">
         <div class="detail-box">
            <div class="card-product-title">${title}</div>
            <div class="card-price">${price}</div>
            <input type="number" value="1" class="card-quantity">
         </div>
      <i class="bx bxs-trash-alt card-remove"></i>
  `;

  cardShopBox.innerHTML = cardBoxContent;
  cardItems.appendChild(cardShopBox);
  cardShopBox
    .getElementsByClassName("card-remove")[0]
    .addEventListener("click", removeCardItem);
  cardShopBox
    .getElementsByClassName("card-quantity")[0]
    .addEventListener("change", quantityChanged);
}
function updatetotal() {
  let cardContent = document.getElementsByClassName("card-content")[0];
  let cardBoxes = cardContent.getElementsByClassName("card-box");
  let total = 0;
  for (var i = 0; i < cardBoxes.length; i++) {
    let cardBox = cardBoxes[i];
    let priceElement = cardBox.getElementsByClassName("card-price")[0];
    let quantityElement = cardBox.getElementsByClassName("card-quantity")[0];
    let price = parseFloat(priceElement.innerHTML.replace("$", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;

  document.getElementsByClassName("total-price")[0].innerHTML = "$" + total;
}
