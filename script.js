const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';
  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => event.target.remove('li');

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const filterProducts = async () => {
  const { results } = await fetchProducts('computador');
  const items = document.querySelector('.items');
  results.forEach(({ id: sku, title: name, thumbnail: image }) => {
    const product = createProductItemElement({ sku, name, image });
    items.appendChild(product);
  });
};

const addCartItem = async (item) => {
  const itemInfo = await fetchItem(item);
  const filter = createCartItemElement({ sku: itemInfo.id, 
    name: itemInfo.title,
    salePrice: itemInfo.price,
  });
  const cartItems = document.querySelector('.cart__items');
  cartItems.appendChild(filter);
};

const addCartItemEvent = (event) => {
  const items = event.target.parentNode;
  const id = items.firstChild.innerText;
  addCartItem(id);
};

window.onload = async () => { 
  await filterProducts(); 
  document.querySelectorAll('.item__add')
    .forEach((item) => item.addEventListener('click', addCartItemEvent));
};
