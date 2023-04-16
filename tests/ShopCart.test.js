import { ShopCart } from "../src/ShopCart";

test("Test", () => {
    const teste = new ShopCart();
    expect(teste.total).toBe(0.0);
});
