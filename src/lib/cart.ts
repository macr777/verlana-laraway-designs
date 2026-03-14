export interface CartItem {
  artworkId: number;
  artworkTitle: string;
  artworkSlug: string;
  isOriginal: boolean;
  printSize?: string;
  price: number;
  quantity: number;
}

const CART_KEY = "vldesigns-cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartItem[];
  } catch {
    return [];
  }
}

function saveCart(cart: CartItem[]): void {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

export function addToCart(item: CartItem): void {
  const cart = getCart();
  // Check for existing item with same artworkId + isOriginal + printSize
  const existingIndex = cart.findIndex(
    (c) =>
      c.artworkId === item.artworkId &&
      c.isOriginal === item.isOriginal &&
      c.printSize === item.printSize
  );
  if (existingIndex >= 0) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }
  saveCart(cart);
}

export function removeFromCart(index: number): void {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}

export function updateQuantity(index: number, qty: number): void {
  const cart = getCart();
  if (index < 0 || index >= cart.length) return;
  if (qty <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = qty;
  }
  saveCart(cart);
}

export function clearCart(): void {
  saveCart([]);
}

export function getCartTotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
