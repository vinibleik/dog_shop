import { Product } from "../src/Product";
import { ShopCart } from "../src/ShopCart";

describe("ShopCart", () => {
    const name = "Teste product";
    const img = "https://example.com/image.jpg";
    const price = 5;
    const full_product = new Product(name, price, img);
    const img_missing = new Product(name, 10);
    const shopCart = new ShopCart();

    describe("#constructor", () => {
        test("Should initializate the right values", () => {
            expect(shopCart.productsList.length).toEqual(0);
            expect(shopCart.total).toEqual(0.0);
        });
    });

    describe("newProduct()", () => {
        test("Should add passing an Product instance", () => {
            expect(shopCart.newProduct(full_product)).toEqual(1);
            expect(shopCart.total).toEqual(5);
        });
        test("Should add passing an Product id", () => {
            expect(shopCart.newProduct(img_missing.id)).toEqual(2);
            expect(shopCart.total).toEqual(15);
        });
        test("Should throw TypeError", () => {
            expect(() => {
                shopCart.newProduct("TypeError");
            }).toThrow(TypeError);
        });
        test("Should throw Error", () => {
            expect(() => {
                shopCart.newProduct(99999);
            }).toThrow(Error);
        });
    });

    describe("addProduct()", () => {
        test("Should add passing an Product instance", () => {
            shopCart.addProduct(full_product);
            expect(shopCart.total).toEqual(20);
        });

        test("Should add passing an Product instance", () => {
            shopCart.addProduct(img_missing.id);
            expect(shopCart.total).toEqual(30);
        });

        test("Should add a new product", () => {
            const shop = new ShopCart();
            expect(shop.addProduct(new Product("teste", 100))).toEqual(1);
            expect(shop.total).toEqual(100);
        });

        test("Should throw TypeError", () => {
            expect(() => {
                shopCart.addProduct("TypeError");
            }).toThrow(TypeError);
        });
        test("Should throw Error", () => {
            expect(() => {
                shopCart.addProduct(99999);
            }).toThrow(Error);
        });
    });

    describe("decreaseProduct()", () => {
        afterAll(() => {
            shopCart.addProduct(full_product);
            shopCart.newProduct(img_missing.id);
            shopCart.addProduct(img_missing);
        });

        test("Should decrease passing an Product instance", () => {
            shopCart.decreaseProduct(full_product);
            expect(shopCart.productsList.length).toEqual(2);
            expect(shopCart.total).toEqual(25);
        });

        test("Should add passing an Product instance", () => {
            shopCart.decreaseProduct(img_missing.id);
            expect(shopCart.productsList.length).toEqual(2);
            expect(shopCart.total).toEqual(15);
        });

        test("Should delete an product if this count reaches 0", () => {
            shopCart.decreaseProduct(img_missing.id);
            expect(shopCart.productsList.length).toEqual(1);
            expect(shopCart.total).toEqual(5);
        });

        test("Should throw TypeError", () => {
            expect(() => {
                shopCart.decreaseProduct("TypeError");
            }).toThrow(TypeError);
        });
    });

    describe("deleteProduct()", () => {
        test("Should delete passing an Product instance", () => {
            shopCart.deleteProduct(full_product);
            expect(shopCart.productsList.length).toEqual(1);
            expect(shopCart.total).toEqual(20);
        });
        test("Should delete passing an Product id", () => {
            shopCart.deleteProduct(img_missing.id);
            expect(shopCart.productsList.length).toEqual(0);
            expect(shopCart.total).toEqual(0);
        });
        test("Should throw TypeError", () => {
            expect(() => {
                shopCart.deleteProduct("TypeError");
            }).toThrow(TypeError);
        });
    });
});
