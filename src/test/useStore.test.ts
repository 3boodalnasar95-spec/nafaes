import { describe, it, expect, beforeEach } from "vitest";
import { useStore } from "@/store/useStore";

const sampleProduct = {
  id: "test-product",
  name_ar: "منتج تجريبي",
  name_en: "Test Product",
  type: "test",
  price: 10,
};

const expensiveProduct = {
  id: "expensive-product",
  name_ar: "منتج غالي",
  name_en: "Expensive Product",
  type: "test",
  price: 25,
};

describe("useStore cart", () => {
  beforeEach(() => {
    sessionStorage.clear();
    useStore.setState({ cartItems: [] });
  });

  it("starts with an empty cart", () => {
    expect(useStore.getState().cartItems).toEqual([]);
    expect(useStore.getState().cartTotal()).toBe(0);
  });

  it("addToCart adds a new item with quantity 1", () => {
    useStore.getState().addToCart(sampleProduct);
    const { cartItems } = useStore.getState();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].product.id).toBe("test-product");
    expect(cartItems[0].quantity).toBe(1);
  });

  it("addToCart called twice with same product increments quantity to 2", () => {
    useStore.getState().addToCart(sampleProduct);
    useStore.getState().addToCart(sampleProduct);
    const { cartItems } = useStore.getState();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].quantity).toBe(2);
  });

  it("addToCart with different products adds both", () => {
    useStore.getState().addToCart(sampleProduct);
    useStore.getState().addToCart(expensiveProduct);
    const { cartItems } = useStore.getState();
    expect(cartItems.length).toBe(2);
  });

  it("removeFromCart removes the item", () => {
    useStore.getState().addToCart(sampleProduct);
    useStore.getState().removeFromCart("test-product");
    expect(useStore.getState().cartItems).toEqual([]);
  });

  it("removeFromCart is a no-op for unknown id", () => {
    useStore.getState().addToCart(sampleProduct);
    useStore.getState().removeFromCart("does-not-exist");
    expect(useStore.getState().cartItems.length).toBe(1);
  });

  it("updateQuantity(id, 0) removes the item", () => {
    useStore.getState().addToCart(sampleProduct);
    useStore.getState().updateQuantity("test-product", 0);
    expect(useStore.getState().cartItems).toEqual([]);
  });

  it("updateQuantity(id, 3) sets quantity to 3", () => {
    useStore.getState().addToCart(sampleProduct);
    useStore.getState().updateQuantity("test-product", 3);
    const { cartItems } = useStore.getState();
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].quantity).toBe(3);
  });

  it("cartTotal sums price * quantity across items", () => {
    useStore.getState().addToCart(sampleProduct);
    useStore.getState().addToCart(expensiveProduct);
    useStore.getState().updateQuantity("expensive-product", 2);
    expect(useStore.getState().cartTotal()).toBe(10 * 1 + 25 * 2);
  });

  it("clearCart empties the cart", () => {
    useStore.getState().addToCart(sampleProduct);
    useStore.getState().addToCart(expensiveProduct);
    useStore.getState().clearCart();
    expect(useStore.getState().cartItems).toEqual([]);
    expect(useStore.getState().cartTotal()).toBe(0);
  });
});
