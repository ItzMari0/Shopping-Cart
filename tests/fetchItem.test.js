require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Deve ser uma função', () => {
    expect(typeof(fetchItem)).toEqual('function');
  });

  it('se ao executar a função "fetchItem" com o argumento "MLB1615760527", a função fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('se ao chamar a função "fetchTem" com o argumento "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('se o retorno da função "fetchItem" com o argumento "MLB1615760527", é uma estrutura de dados igual ao objeto "item"', async () => {
    expect(await fetchItem('MLB1615760527')).toEqual(item);
  });

  it('ao chamar a função "fetchItem" sem argumento, retorna um erro com a mensagem: "You must provide an url"', async () => {
    const failRequest = await fetchItem();
    expect(failRequest).toEqual(new Error('You must provide an url'));
  });

});
