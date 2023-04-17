import { Product } from "../src/Product";

describe("Product", () => {
    const name = "Teste product";
    const img = "https://example.com/image.jpg";
    const price = 9.99;
    const full_product = new Product(name, price, img);
    const img_missing = new Product(name, price);

    describe("#constructor", () => {
        test("Should set the correct values for id, name, img, and price", () => {
            expect(full_product.id).toEqual(0);
            expect(full_product.name).toEqual(name);
            expect(full_product.price).toEqual(price);
            expect(full_product.img).toEqual(img);
        });

        test("img has to be a default values", () => {
            expect(img_missing.img).toEqual("");
        });
    });

    describe("seachId()", () => {
        test("Should return the right products", () => {
            expect(Product.searchId(0)).toEqual(full_product);
            expect(Product.searchId(1)).toEqual(img_missing);
            expect(Product.searchId(1.23)).toEqual(img_missing);
        });

        test("Should return null for invalid ids", () => {
            expect(Product.searchId(-1)).toEqual(null);
            expect(Product.searchId(2)).toEqual(null);
        });

        test("Should throw an error", () => {
            expect(() => {
                Product.searchId("test");
            }).toThrow(TypeError);
        });
    });

    describe("getProductList()", () => {
        test("Should return the two Products created", () => {
            const productsList = Product.getProductList();

            expect(productsList.length).toEqual(2);
            expect(productsList[0]).toEqual(full_product);
            expect(productsList[1]).toEqual(img_missing);
        });
    });
});
