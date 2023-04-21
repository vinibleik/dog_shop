export class Product {
    /**
     * @type {Array<Product>}
     */
    static #products = [];

    /**
     *
     * @param {string} name - The name of the Product
     * @param {number} price - The price of the Product
     * @param {string} [img] - Some image for the product. Default to "".
     */
    constructor(name, price, img = "") {
        this.id = this.constructor.#products.length;
        this.name = name;
        this.price = price;
        this.img = img;

        this.constructor.#products.push(this);
    }

    /**
     *
     * @param {number} id ID for search
     * @returns {Product | null} Product object correponding by id or null if doesn't match
     * @throws {TypeError} Will trow an erros if the id is not a number
     */
    static searchId(id) {
        if (typeof id !== "number") throw new TypeError("id must be a number");
        id = parseInt(id);
        if (id < 0 || id >= this.#products.length) return null;
        return this.#products[id];
    }

    /**
     *
     * @returns {Array<Product>}
     */
    static getProductList() {
        return this.#products;
    }
}

const URL = "https://dog.ceo/api/breeds/image/random";

/**
 *
 * @returns {string}
 */
async function getApiProduct() {
    try {
        const response = await fetch(URL);
        if (response.ok) {
            const data = await response.json();
            return data.message;
        } else {
            console.error(`Error: ${response.status}`);
        }
    } catch (error) {
        console.error(error);
    }
    return "";
}

/**
 *  Returns a new Product that fetch data by API. Returns null if any errors occurs
 * @returns {Product | null}
 */
export async function getNewProduct() {
    const img = await getApiProduct();

    if (img === "") return null;

    const name = img.split("/")[4];
    return new Product(name, Math.floor(Math.random() * 10_000) + 1, img);
}
