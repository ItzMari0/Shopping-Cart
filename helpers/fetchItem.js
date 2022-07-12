const fetchItem = async (item) => {
  const url = `https://api.mercadolibre.com/items/${item}`;
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
    fetchItem,
  };
}
