const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  it('Se ao executar a função saveCartItems com o argumento "<ol><li>Item</li></ol>", o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  it('Se ao executar a função saveCartItems com o argumento "<ol><li>Item</li></ol>", o método localStorage.setItem é chamado com os parâmetros "cartItems" e o argumento da função', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems', '<ol><li>Item</li></ol>');
  });

  it('saveCartItems é uma função', () => {
    expect(typeof saveCartItems).toBe('function');
  });
});
