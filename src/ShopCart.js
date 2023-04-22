import { Product } from "./Product";

export class ShopCart {
    constructor() {
        this.productsList = [];
        this.total = 0.0;
    }

    #updateTotal(value) {
        if (typeof value != "number")
            throw new TypeError("value must be a number");
        this.total += value;
    }

    static #getProduct(productOrId) {
        const product =
            productOrId instanceof Product
                ? productOrId
                : Product.searchId(productOrId);

        if (product == null) throw new Error("Id inexistent!");

        return product;
    }

    #findProduct(productId) {
        const product = this.constructor.#getProduct(productId);

        for (let index = 0; index < this.productsList.length; index++)
            if (this.productsList[index].product.id === product.id)
                return index;
        return null;
    }

    newProduct(productId) {
        const product = this.constructor.#getProduct(productId);

        this.#updateTotal(product.price);

        return this.productsList.push({
            product: product,
            count: 1,
        });
    }

    deleteProduct(productId) {
        const product = this.constructor.#getProduct(productId);

        const id = this.#findProduct(productId);

        if (id === null) return;

        const count = this.productsList[id].count;
        for (let i = 0; i < count; ++i) this.#updateTotal(-product.price);
        this.productsList.splice(id, 1);
    }

    addProduct(productId) {
        const product = this.constructor.#getProduct(productId);

        const id = this.#findProduct(productId);

        if (id === null) return this.newProduct(productId);

        this.#updateTotal(product.price);
        return this.productsList[id].count++;
    }

    decreaseProduct(productId) {
        const product = this.constructor.#getProduct(productId);
        const id = this.#findProduct(productId);
        if (id === null) return;

        this.#updateTotal(-product.price);

        this.productsList[id].count--;

        if (this.productsList[id].count === 0) this.deleteProduct(product);
    }
}
