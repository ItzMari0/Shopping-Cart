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

  it('se ao chamar a função "fetchProducts" com o argumento computador, a função fetch utiliza o endpoint "https://api.mercadolibre.com/sites/MLB/search?q=computador"', () => {
    fetchProducts('computador');
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('se o retorno da função "fetchProducts" com o argumento "computador", é uma estrutura de dados igual ao objeto "computadorSearch"', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });

  it('ao chamar a função "fetchProducts" sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const failRequest = await fetchProducts();
    expect(failRequest).toEqual(new Error('You must provide an url'));
  });
});
