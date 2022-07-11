const fetchProducts = async (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  if (url.endsWith('undefined')) {
    return new Error('You must provide an url');
  }
  const list = await fetch(url)
    .then((response) => response.json())
    .then((data) => data);

  return list;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
