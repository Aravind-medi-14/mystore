const products = [
  { id: 1, name: "Product 1", desc: "Description of the product 1 Description of the product 1", price: 25 },
  { id: 2, name: "Product 2", desc: "Description of the product 2 Description of the product 1", price: 45 },
  { id: 3, name: "Product 3", desc: "Description of the product 3 Description of the product 1", price: 30 },
];
const cart = {};

const addtoCart = (id) => {
  if (!cart[id]) cart[id] = 1;
  console.log(cart);
  showCart();
};

const dec = (id) => {
  // if (cart[id] > 1) {

  cart[id] -= 1;
  cart[id] < 1 && delete cart[id];
  showCart();
  //}
};

const inc = (id) => {
  cart[id] += 1;
  showCart();
};

const showTotal = () => {
  let total = products.reduce((sum, val) => {
    // if(cart[val.id]){
    // return sum + val.price * cart[val.id];
    // }
    // return sum;
    return sum + val.price * (cart[val.id] ? cart[val.id] : 0);
  }, 0);
  let len = Object.keys(cart).length;
  console.log(len);
  divtotal.innerHTML = `Number of Products:${len} Order Value: $${total}`;
};

const showCart = () => {
  let str = "";
  products.map((val) => {
    if (cart[val.id]) {
      str += `<div> <h3> ${val.name} </h3> - $${
        val.price
      } - <button onclick="dec(${val.id})">-</button> ${
        cart[val.id]
      } <button onclick="inc(${val.id})">+</button> - ${
        val.price * cart[val.id]
      } </div>`;
    }
  });

  mycart.innerHTML = str;
  let count = Object.keys(cart).length;
  items.innerHTML = count;
  showTotal();
};

const showProducts = () => {
  let str = "<div class='row'>";
  products.map((val) => {
    console.log(val.id, val.price, val.name);
    str += `
      <div class="box"> <h3>${val.name}</h3><p>${val.desc} </p> <h4>$${val.price} </h4> <button onclick=addtoCart(${val.id})>Add to cart</button> </div>`;
  });
  divprod.innerHTML = str + "</div>";
};

const displayCart = () => {
  //   divcartblock.style.display = "block";
  divcartblock.style.left = "60%";
};
const hidecart = () => {
  //   divcartblock.style.display = "none";
  divcartblock.style.left = "100%";
};
