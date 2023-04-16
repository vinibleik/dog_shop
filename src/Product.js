export class Product {
    static #products = [];

    constructor(name, price, img = "") {
        this.id = this.constructor.#products.length;
        this.name = name;
        this.price = price;
        this.img = img;

        this.constructor.#products.push(this);
    }

    static searchId(id) {
        if (typeof id !== "number") throw new TypeError("id must be a number");
        id = parseInt(id);
        if (id < 0 || id >= this.#products.length) return null;
        return this.#products[id];
    }
}
