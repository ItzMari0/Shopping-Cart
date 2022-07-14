const cartItems = document.querySelector('.cart__items');

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

// const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const sumPrices = () => {
  const li = document.querySelectorAll('.cart__item');
  const split = [...li].map((item) => item.innerText).map((item) => {
    const array = item.split(' | ');
    const price = array[2].replace(/PRICE: \$(?=\d+)/g, '');
    return parseFloat(price);
  }); 
  const total = split.reduce((acc, cur) => acc + cur, 0);
  return Math.round(total * 100) / 100;
};

const totalPrice = () => {
  const total = document.querySelector('.total-price');
  total.innerText = `$${sumPrices()}`;
};

const cartItemClickListener = (event) => {
  event.target.remove('li');
  saveCartItems('cartItems', JSON.stringify(cartItems.innerHTML));
  totalPrice();
};

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
  const info = await fetchItem(item);
  const filter = createCartItemElement({ sku: info.id, 
    name: info.title,
    salePrice: info.price,
  });
  cartItems.appendChild(filter);
  saveCartItems('cartItems', JSON.stringify(cartItems.innerHTML));
  totalPrice();
};

const storeItem = () => {  
  const store = getSavedCartItems('cartItems');
  cartItems.innerHTML = JSON.parse(store);
};

const selectedItems = () => {
  const items = document.querySelectorAll('.cart__items');
  items.forEach((item) => item
    .addEventListener('click', cartItemClickListener));
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
  storeItem();
  selectedItems();
  totalPrice();
};
