export class Product {
    static #products = [];

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
     * @throws {TypeError}
     */
    static searchId(id) {
        if (typeof id !== "number") throw new TypeError("id must be a number");
        id = parseInt(id);
        if (id < 0 || id >= this.#products.length) return null;
        return this.#products[id];
    }

    static getProductList() {
        return this.#products;
    }
}
