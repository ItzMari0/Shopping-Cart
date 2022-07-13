const saveCartItems = (cartItems, item) => localStorage.setItem(cartItems, item);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
