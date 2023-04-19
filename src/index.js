import { Product, getNewProduct } from "./Product";
import { ShopCart } from "./ShopCart";

const img = document.getElementById("img");
const name = document.getElementById("name");
const price = document.getElementById("price");

async function newProduct() {
    const product = await getNewProduct();
    img.src = product.img;
    name.textContent = "Name: " + product.name;
    price.textContent = "Price: " + product.price;
}

newProduct().catch((error) => {
    console.log(error);
});
