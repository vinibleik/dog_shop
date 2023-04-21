import { Product, getNewProduct } from "./Product";
import { ShopCart } from "./ShopCart";

const content = document.querySelector(".content");

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
    return img;
}
// --------------------- PRODUCT'S IMG --------------------------//

// ---------------- PRODUCTS NAME ----------------------------//
/**
 * Constructs a new span element that hold the product's name
 * @param {string} productName
 * @returns {HTMLSpanElement}
 */
function newSpanName(productName) {
    const spanName = document.createElement("span");
    spanName.textContent = productName;
    spanName.classList.add("m-0", "p-1");
    return spanName;
}

const COL_PRODUCT_NAME_CLASSES = ["col", "p-0", "m-0", "text-center"];

/**
 * Constructs a new div element that holds the product's name
 * @param {string} productName
 * @returns {HTMLDivElement}
 */
function newProductName(productName) {
    const spanName = newSpanName(productName);
    const colName = document.createElement("div");
    colName.classList.add(...COL_PRODUCT_NAME_CLASSES);
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
    spanPrice.classList.add("price");
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

const COL_PRODUCT_PRICE_CLASSES = ["col", "p-0", "m-0"];

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

const ROW_INFO_CLASSES = ["row", "m-0", "p-0"];

/**
 * Construct the container that holds the product's info
 * @param {string} productName
 * @param {string} productPrice
 * @returns {HTMLDivElement}
 */
function newProductInfo(productName, productPrice) {
    const nameContainer = newProductName(productName);
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

const PRODUCT_CONTAINER_CLASSES = ["col-4", "p-0"];

/**
 * Returns a new products container with all its information
 * @param {string} src Product's img source
 * @param {string} productName
 * @param {string} productPrice
 * @returns {HTMLDivElement}
 */
function newProductContainer(src, productName, productPrice) {
    const img = newImgElement(src);
    const info = newProductInfo(productName, productPrice);
    const container = document.createElement("div");
    container.classList.add(...PRODUCT_CONTAINER_CLASSES);
    container.appendChild(img);
    container.appendChild(info);
    return container;
}
// --------------- PRODUCTS CONTAINER ------------------------//

// ---------------- PRODUCTS ROW ----------------------------//

const ROW_PRODUCT_CLASSES = ["row", "g-2", "my-2"];

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

async function teste(nRows) {
    for (let i = 0; i < nRows; i++) {
        let row = newProductRow();
        for (let j = 0; j < 3; j++) {
            let product = await getNewProduct();
            if (product === null) return;
            let productContainer = newProductContainer(
                product.img,
                product.name,
                product.price.toString()
            );
            row.appendChild(productContainer);
        }
        content.appendChild(row);
    }
}

teste(3).catch((error) => console.error(error));
