require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Deve ser uma função', () => {
    expect(typeof(fetchProducts)).toEqual('function');
  });

  it('chama a fetch quando a função "fetchProducts" é chamada com o argumento "computador"', () => {
    fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
