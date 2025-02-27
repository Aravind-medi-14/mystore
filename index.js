let products = [];
let orders = [];
let cart = {};
let users = [];
let user = {};
let total = 0;

const addtoCart = (id) => {
  if (!cart[id]) cart[id] = 1;
  console.log(cart);
  showCart();
};

const dec = (id) => {
  cart[id] -= 1;
  cart[id] < 1 && delete cart[id];
  showCart();
};

const inc = (id) => {
  cart[id] += 1;
  showCart();
};

const showTotal = () => {
  total = products.reduce((sum, val) => {
    return sum + val.price * (cart[val.id] ? cart[val.id] : 0);
  }, 0);
  let len = Object.keys(cart).length;
  console.log(len);
  divtotal.innerHTML = `<p>Number of Products:${len}</p> <p> Order Value: $${total}</p>`;
};

const showOrders = () => {
  let str = "<div style='padding:30px'><h3>My Orders</h1> <hr>";
  orders.map((val) => {
    if (val.customer == user.email) {
      str += `
            <div><p>Customer Email:${val.customer}</p> <p>Total Amount:$${val.orderValue}</p> <p>Total items:${
        Object.keys(val.items).length
      }</p> <p>Order status:${val.status}</p> <hr></div>`;
    }
  });
  divproducts.innerHTML = str + "</div>";
};

const showMain = () => {
  let str = `
     <div class="container">
      <div class="header">
        <h1>My Store</h1>
         <div class='menu'>
        <li onclick='showProducts()' class="btn btn-primary text-dark">Home</li>
        <li onclick='showOrders()' class="btn btn-primary text-dark">Orders</li>
        <li onclick="displayCart()"class="btn btn-primary text-dark">Cart :<span id="items"></span></li>
        <li onclick='showLogin()'class="btn btn-primary text-dark">Logout</li>
        </div>
      </div>

      <div class="productBlock">
        <div id="divproducts"></div>
      </div>

      <div id="divcartblock" class="cartBlock">
        <h3>My Cart</h3>
        <hr />
        <div id="mycart"></div>
        <div id="divtotal"></div>
        <button onclick="hidecart()" class="btn btn-danger">close</button>
      </div>
    
    
    <div class="footer"><h4>@Copyrights 2025. All rights reserved.</h4> </div></div>
  `;
  root.innerHTML = str;
  showProducts();
};

const placeOrder = () => {
  //create an object and push into orders array
  const obj = {
    customer: user.email,
    items: cart,
    orderValue: total,
    status: "pending",
  };
  orders.push(obj);
  cart = {};
  showCart();
  hidecart();
  showOrders();
  console.log(orders);
};

const showCart = () => {
  let str = "";
  products.map((val) => {
    if (cart[val.id]) {
      str += ` <p> ${val.name}  - $${val.price} - <button class="btn btn-success" onclick="dec(${
        val.id
      })">-</button> ${cart[val.id]} <button class="btn btn-success" onclick="inc(${
        val.id
      })">+</button> - $${val.price * cart[val.id]}</p>`;
    }
  });
  str += `<button onclick='placeOrder()' class="btn btn-warning" >Place Order</button> `;
  mycart.innerHTML = str;
  let count = Object.keys(cart).length;
  items.innerHTML = count;
  showTotal();
};

function showLogin() {
  let str = `
  <div class='container-fluid bg-secondary text-center w-50'>
  <div class="row text-center w-80 m-5 p-5">
      <h2>Login Form</h2>
      <div id='msg' class="text-center"></div>
      <p><input id="email" type="text" class="form-control mt-4" placeholder="Enter Email"></p>
      <p><input id="password" type="password" class="form-control mt-4"placeholder="Enter Password" ></p>
      <button onclick='chkUser()' class="btn btn-primary m-4 w-50" >Log In</button>
      <button onclick='showForm()' class="btn btn-success mt-2 w-50">Create Account</button>
      </div>
  </div>
  `;
  root.innerHTML = str;
}

function showForm() {
  let str = `
  <div class='container-fluid w-50 bg-secondary'>
  <div class="row text-center m-4 p-3">
  <h2>Registration Form</h2>
  <p><input type="text" id="name" placeholder="Name" class="form-control" ></p>
  <p><input type="text" id="email" placeholder="Email"class="form-control"></p>
  <p><input type="password" id="password" placeholder="Password"class="form-control"></p>
  <p><input type="date" id="dob"class="form-control"></p>
  <p><button onclick='addUser()'class="btn btn-primary w-50">Submit</button></p>
  <p>Already a member?<button onclick='showLogin()' class="btn btn-success w-50 m-3">Login Here</button></p>
  </div>
  `;
  root.innerHTML = str + "</div>";
}

function chkUser() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email && users[i].password == password) {
      // useremail = email;
      // username = users[i].name;
      // currBalance = users[i].balance;
      user = users[i];
      showMain();
      break;
    } else {
      msg.innerHTML = "Access Denied";
    }
  }
}

function addUser() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let dob = document.getElementById("dob").value;
  let user = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    balance: 0,
  };
  users.push(user);
  showLogin();
}

const showProducts = () => {
  fetch("products.json")
    .then((res) => res.json())
    .then((data) => (products = data))
    .then(() => {
      let str = "<div class='row'>";
      products.map((val) => {
        str += `
        <div class="boxscale container-fluid d-flex text-center justify-content-center col-lg-3 m-4">
        <div class='box w-30 m-4 p-2'>
        <img src="${val.img}" alt="image" width="300px" height="300px">
        <h3>${val.name}</h3>
        <p>${val.desc}</p>
        <h4>$${val.price}</h4>
        <button onclick=addtoCart(${val.id}) class="btn btn-success">Add to Cart</button>
        </div>
        </div>
        `;
      });
      divproducts.innerHTML = str + "</div>";
    });
};

const displayCart = () => {
  //   divcartblock.style.display = "block";
  divcartblock.style.left = "80%";
};
const hidecart = () => {
  //   divcartblock.style.display = "none";
  divcartblock.style.left = "100%";
};
