import { Product, getNewProduct } from "./Product";
import { ShopCart } from "./ShopCart";

const content = document.querySelector(".content");
const shopItems = document.querySelector(".shop-items");
const shopTotal = document.querySelector(".shop-total");
const totalPrice = document.querySelector("#total-price");
let shopCart = new ShopCart();

// --------------------- PRODUCT'S IMG --------------------------//

const IMG_WIDTH = "200";
const IMG_HEIGHT = "200";

/**
 * Constructs the product's img element
 * @param {string} src
 * @returns {HTMLImageElement}
 */
function newImgElement(src) {
    const img = document.createElement("img");
    img.src = src;
    img.width = IMG_WIDTH;
    img.height = IMG_HEIGHT;
    img.loading = "lazy";
    img.classList.add("product-img");
    return img;
}
// --------------------- PRODUCT'S IMG --------------------------//

// ---------------- PRODUCTS NAME ----------------------------//

/**
 * Construct a new span that hold the product's id
 * @param {string} productId
 * @returns {HTMLSpanElement}
 */
function newSpanId(productId) {
    const spanId = document.createElement("span");
    spanId.classList.add("product-id");
    spanId.textContent = productId;
    spanId.style.display = "none";
    return spanId;
}

/**
 * Constructs a new span element that hold the product's name
 * @param {string} productName
 * @returns {HTMLSpanElement}
 */
function newSpanName(productName) {
    const spanName = document.createElement("span");
    spanName.textContent = productName;
    spanName.classList.add("m-0", "p-1", "product-name");
    return spanName;
}

const COL_PRODUCT_NAME_CLASSES = [
    "col",
    "p-0",
    "m-0",
    "text-center",
    "product-name-container",
];

/**
 * Constructs a new div element that holds the product's name
 * @param {string} productId
 * @param {string} productName
 * @returns {HTMLDivElement}
 */
function newProductName(productId, productName) {
    const spanName = newSpanName(productName);
    const spanId = newSpanId(productId);
    const colName = document.createElement("div");
    colName.classList.add(...COL_PRODUCT_NAME_CLASSES);
    colName.appendChild(spanId);
    colName.appendChild(spanName);
    return colName;
}
// ---------------- PRODUCTS NAME ----------------------------//

// ---------------- PRODUCTS PRICE ---------------------------//

/**
 * Make a new span that holds the product's price
 * @param {string} productPrice
 * @returns {HTMLSpanElement}
 */
function newSpanPrice(productPrice) {
    const spanPrice = document.createElement("span");
    spanPrice.textContent = productPrice;
    spanPrice.classList.add("product-price");
    return spanPrice;
}

/**
 *
 * @param {string} buttonText
 * @returns {HTMLButtonElement}
 */
function newButton(buttonText) {
    const button = document.createElement("button");
    button.textContent = buttonText;
    return button;
}

const COL_PRODUCT_PRICE_CLASSES = [
    "col",
    "p-0",
    "m-0",
    "product-price-container",
];

/**
 * Constructs a new div element that holds the product's price and buttons
 * @param {string} productPrice
 * @returns {HTMLDivElement}
 */
function newProductPrice(productPrice) {
    const spanPrice = newSpanPrice(productPrice);
    const plus = newButton("+");
    plus.classList.add("plus");
    const minus = newButton("-");
    minus.classList.add("minus");
    const colPrice = document.createElement("div");
    colPrice.classList.add(...COL_PRODUCT_PRICE_CLASSES);
    colPrice.appendChild(spanPrice);
    colPrice.appendChild(plus);
    colPrice.appendChild(minus);
    return colPrice;
}

// ---------------- PRODUCTS PRICE ---------------------------//

// ---------------- PRODUCTS INFO ----------------------------//

const ROW_INFO_CLASSES = ["row", "m-0", "p-0", "row-product-info"];

/**
 * Construct the container that holds the product's info
 * @param {string} productId
 * @param {string} productName
 * @param {string} productPrice
 * @returns {HTMLDivElement}
 */
function newProductInfo(productId, productName, productPrice) {
    const nameContainer = newProductName(productId, productName);
    const priceContainer = newProductPrice(productPrice);
    const row = document.createElement("div");
    row.classList.add(...ROW_INFO_CLASSES);
    row.appendChild(nameContainer);
    row.appendChild(priceContainer);
    const container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(row);
    return container;
}
// ---------------- PRODUCTS INFO ----------------------------//

// --------------- PRODUCTS CONTAINER ------------------------//

const PRODUCT_CONTAINER_CLASSES = ["col-4", "p-0", "product-container"];

/**
 * Returns a new products container with all its information
 * @param {string} src Product's img source
 * @param {string} productName
 * @param {string} productPrice
 * @returns {HTMLDivElement}
 */
function newProductContainer(src, productId, productName, productPrice) {
    const img = newImgElement(src);
    const info = newProductInfo(productId, productName, productPrice);
    const container = document.createElement("div");
    container.classList.add(...PRODUCT_CONTAINER_CLASSES);
    container.appendChild(img);
    container.appendChild(info);
    return container;
}
// --------------- PRODUCTS CONTAINER ------------------------//

// ---------------- PRODUCTS ROW ----------------------------//

const ROW_PRODUCT_CLASSES = ["row", "g-2", "my-2", "row-products"];

/**
 * Returns a new row that can contains at most 3 products container
 * @returns {HTMLDivElement}
 */
function newProductRow() {
    const row = document.createElement("div");
    row.classList.add(...ROW_PRODUCT_CLASSES);
    return row;
}
// ---------------- PRODUCTS ROW ----------------------------//

// ---------------- ADDING PRODUCTS -------------------------//
const NROWS = 3;

async function addProducts(nRows) {
    for (let i = 0; i < nRows; i++) {
        let row = newProductRow();
        for (let j = 0; j < 3; j++) {
            let product = await getNewProduct();
            if (product === null) return;
            let productContainer = newProductContainer(
                product.img,
                product.id,
                product.name,
                product.price.toString()
            );
            row.appendChild(productContainer);
        }
        content.appendChild(row);
    }
    addEventButtons();
}

addProducts(NROWS).catch((error) => console.error(error));
// ---------------- ADDING PRODUCTS -------------------------//

// ---------------- SHOW SHOP CART  -------------------------//

const DIV_ITEM_COMMON_CLASSES = ["ms-2", "me-auto", "col-2"];

/**
 * Returns a new div item element
 * @param {string} [text=""]
 * @returns {HTMLDivElement}
 */
function newDivItem(text = "") {
    const divItem = document.createElement("div");
    divItem.classList.add(...DIV_ITEM_COMMON_CLASSES);
    divItem.textContent = text;
    return divItem;
}

const BUTTON_ITEM_CLASSES = ["btn-close", "delete-item"];

/**
 * Returns a new div item element with the close button
 * @returns {HTMLDivElement}
 */
function newDivButtonItem(productId) {
    const divButton = newDivItem();
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add(...BUTTON_ITEM_CLASSES);
    button.ariaLabel = "Close";
    button.addEventListener("click", () => {
        shopCart.deleteProduct(productId);
        updateShopCart();
    });
    divButton.appendChild(button);
    return divButton;
}

const SHOP_ITEM_CLASSES = [
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center",
];

/**
 * Returns a new item for the list of the products
 * @param {number} productId
 * @param {string} productName
 * @param {string} productCount
 * @returns {HTMLLIElement}
 */
function newShopItem(productId, productName, productCount) {
    const divName = newDivItem(productName);
    divName.classList.remove("col-2");
    divName.classList.add("col-8");
    const divCount = newDivItem(productCount);
    const divButton = newDivButtonItem(productId);
    const item = document.createElement("li");
    item.classList.add(...SHOP_ITEM_CLASSES);
    item.appendChild(divName);
    item.appendChild(divCount);
    item.appendChild(divButton);
    return item;
}

function updateShopCart() {
    shopItems.innerHTML = "";
    shopCart.productsList.forEach((item) => {
        let newItem = newShopItem(
            item.product.id,
            item.product.name,
            item.count
        );
        shopItems.appendChild(newItem);
    });
    shopTotal.textContent = "Total: R$" + shopCart.total;
    totalPrice.textContent = "Total: R$" + shopCart.total;
}

// ---------------- SHOW SHOP CART  -------------------------//

// ---------------- EVENTS BUTTONS --------------------------//

function addEventButtons() {
    const rowsProductsInfo = document.querySelectorAll(".row-product-info");

    rowsProductsInfo.forEach((row) => {
        let plus = row.querySelector(".plus");
        let minus = row.querySelector(".minus");
        let productId = row.querySelector(".product-id");
        let id = parseInt(productId.textContent);

        plus.addEventListener("click", () => {
            shopCart.addProduct(id);
            updateShopCart();
        });

        minus.addEventListener("click", () => {
            shopCart.decreaseProduct(id);
            updateShopCart();
        });
    });
}
// ---------------- EVENTS BUTTONS --------------------------//
