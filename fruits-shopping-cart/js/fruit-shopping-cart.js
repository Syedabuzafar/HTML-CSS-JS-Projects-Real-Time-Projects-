

let fruitsList = [
    {
        "pId": "101",
        "pName": "Apple",
        "pPrice": 20,
        "pImageUrl": "img/apple.png"
    },
    {
        "pId": "102",
        "pName": "Banana",
        "pPrice": 10,
        "pImageUrl": "img/banana.png"
    },
    {
        "pId": "103",
        "pName": "Black Grapes",
        "pPrice": 60,
        "pImageUrl": "img/black-grapes.png"
    },
    {
        "pId": "104",
        "pName": "Green Grapes",
        "pPrice": 20,
        "pImageUrl": "img/green-grapes.png"
    },
    {
        "pId": "105",
        "pName": "Guava",
        "pPrice": 5,
        "pImageUrl": "img/guava.png"
    },
    {
        "pId": "106",
        "pName": "Kiwi",
        "pPrice": 70,
        "pImageUrl": "img/kiwi.png"
    }
    , {
        "pId": "107",
        "pName": "Mango",
        "pPrice": 35,
        "pImageUrl": "img/mango.png"
    }
    , {
        "pId": "108",
        "pName": "Pinepple",
        "pPrice": 25,
        "pImageUrl": "img/pineapple.png"
    },
    {
        "pId": "109",
        "pName": "Orange",
        "pPrice": 15,
        "pImageUrl": "img/orange.png"
    },
    {
        "pId": "110",
        "pName": "Straw Berry",
        "pPrice": 65,
        "pImageUrl": "img/strawberry.png"
    },
    {
        "pId": "111",
        "pName": "Watermelon",
        "pPrice": 80,
        "pImageUrl": "img/watermelon.png"
    },
    {
        "pId": "112",
        "pName": "Pomegranate",
        "pPrice": 70,
        "pImageUrl": "img/pomegranate.png"
    }
];

var cartRowId = "";
var cartItemsIds = [];
var cartTotal = [];
/*Loading all the Items on the page */

var productContainer = document.getElementsByClassName('product-container')[0];
for (let prod of fruitsList) {
    /*creating product image */
    var prodImage = document.createElement('img');
    prodImage.setAttribute("src", prod.pImageUrl);
    prodImage.setAttribute("height", 110);

    /*creating product title */
    var prodTitleAndprice = document.createElement('p');
    prodTitleAndprice.innerHTML = "<span class='product-name'>" + prod.pName + "</span>" + "  |  " + "<span class='product-price'>" + "$" + prod.pPrice + "</span>";


    /* creating add-to-cart button*/
    var addToCartBtn = document.createElement('button');
    var btnText = document.createTextNode("Add To Cart");
    addToCartBtn.appendChild(btnText);
    addToCartBtn.setAttribute("class", "btn btn-primary");
    addToCartBtn.setAttribute("id", prod.pId);

    /*creating prod-Box for putting the above elements */
    var productBox = document.createElement("div");
    productBox.setAttribute("class", "prod-Box");

    productBox.appendChild(prodImage);
    productBox.appendChild(prodTitleAndprice);
    productBox.appendChild(addToCartBtn);

    productContainer.appendChild(productBox);


    /* Add to Cart Functionality */

    //accessing add-to-cart btn object for attaching 'click' event
    var addToCartBtnObj = document.getElementById(prod.pId);
    addToCartBtnObj.addEventListener('click', function () {
        addingIntoCart(prod);
    });
}

/* Adding function for adding items to the cart*/

function addingIntoCart(prod) {
    cartRowId = prod.pId + "CRT";
    if (cartItemsIds.includes(cartRowId)) {
        var avlblCartRow = document.getElementById(cartRowId).lastChild;
        var qtyElement = avlblCartRow.childNodes[2].childNodes[1];
        var qtyElementCurrVal = qtyElement.value;

        qtyElement.setAttribute('value', ++qtyElementCurrVal);

        //checking product exist or not 
        if (isProductExist(prod.pId)) {
            upd_obj = cartTotal.findIndex((obj => obj.pId == prod.pId));
            cartTotal[upd_obj].pQnty = qtyElementCurrVal;
        }
        getCartTotalPrice();
        return null;
    } else {
        cartItemsIds.push(cartRowId);
        var cartItemImage = document.createElement('img');
        cartItemImage.setAttribute('src', prod.pImageUrl);
        cartItemImage.setAttribute('class', 'cart-item-img');

        /*creating cart item name*/
        var cartItemName = document.createElement('span');
        cartItemName.innerHTML = "<span>" + prod.pName + "</span> |  " + prod.pPrice;

        /*creating cart item remove button */
        var cartItemRemoveBtn = document.createElement('button');
        cartItemRemoveBtn.appendChild(document.createTextNode('X'));
        cartItemRemoveBtn.setAttribute('class', 'remove-btn btn');
        cartItemRemoveBtn.setAttribute("id", prod.pId + "R");
        cartItemRemoveBtn.innerHTML = "<i class='bi bi-trash remove-icon'></i>";

        /* creating cart quantity field */
        var cartQuantity = document.createElement('input');
        cartQuantity.setAttribute('type', 'text');
        cartQuantity.setAttribute('class', 'cart-item-quantity');
        cartQuantity.setAttribute('value', 1);

        /* creating cart quantity ADD btn */
        var cartQuantityAddBtn = document.createElement('button');
        cartQuantityAddBtn.appendChild(document.createTextNode('+'));
        cartQuantityAddBtn.setAttribute('class', 'btn');
        cartQuantityAddBtn.innerHTML = "<i class='bi bi-cart-plus-fill icon-plus' value='+'></i>";
        cartQuantityAddBtn.addEventListener('click', function () {
            var cartId = cartQuantityAddBtn.parentNode.parentNode.parentNode.getAttribute('id');
            increaseOrReduceQnty(this, cartId, prod.pId);
        });

        /* creating cart quantity SUB btn */
        var cartQuantitySubBtn = document.createElement('button');
        cartQuantitySubBtn.appendChild(document.createTextNode('-'));
        cartQuantitySubBtn.setAttribute('class', 'btn');
        cartQuantitySubBtn.innerHTML = "<i class='bi bi-cart-dash-fill icon-minus' value='-'></i>";
        cartQuantitySubBtn.addEventListener('click', function () {
            var cartId = cartQuantityAddBtn.parentNode.parentNode.parentNode.getAttribute('id');
            increaseOrReduceQnty(this, cartId, prod.pId);
        });

        cartCol1 = document.createElement('div');
        cartCol1.setAttribute('class', 'col-sm-2');
        cartCol1.appendChild(cartItemImage);


        cartCol2 = document.createElement('div');
        cartCol2.setAttribute('class', 'col-sm-5');
        cartCol2.appendChild(cartItemName);

        cartCol3 = document.createElement('div');
        cartCol3.setAttribute('class', 'col-sm-4');

        cartCol3.appendChild(cartQuantitySubBtn);
        cartCol3.appendChild(cartQuantity);
        cartCol3.appendChild(cartQuantityAddBtn);


        cartCol4 = document.createElement('div');
        cartCol4.setAttribute('class', 'col-sm-1');
        cartCol4.appendChild(cartItemRemoveBtn);

        /* Creating cart row to add all elements */
        var cartRow = document.createElement('div');
        cartRow.setAttribute('class', 'row');

        /* Adding all columns in the above row */
        cartRow.appendChild(cartCol1);
        cartRow.appendChild(cartCol2);
        cartRow.appendChild(cartCol3);
        cartRow.appendChild(cartCol4);


        /* Adding item price and quantity to the array */

        productDetails = { "pId": prod.pId, "pQnty": 1, "pPrice": prod.pPrice };
        cartTotal.push(productDetails);
        /*Adding above items in cartItemContainer */
        var cartItemContainer = document.createElement('div');
        cartItemContainer.setAttribute('class', 'cart-item-row');
        cartItemContainer.setAttribute('id', cartRowId);
        cartItemContainer.appendChild(cartRow);


        /* Adding this cart-row in the main cart-item-container */
        var mainCartItemContainer = document.getElementsByClassName('cart-item-container')[0];
        mainCartItemContainer.appendChild(cartItemContainer);

        var removeBtn = document.getElementById(prod.pId + "R");
        removeBtn.addEventListener('click', function () {
            var cartRowId = removeBtn.parentNode.parentNode.parentNode.getAttribute('id');
            removeItemFromCart(cartRowId, prod.pId);
        });
        getCartTotalPrice();
        return null;
    }
}
/* calling remove */
function removeItemFromCart(cartId, pId) {
    if (cartItemsIds.includes(cartId)) {
        for (var i = 0; i < cartItemsIds.length; i++) {
            if (cartItemsIds[i] === cartId) {
                document.getElementById(cartId).remove();
                cartItemsIds.splice(i, i+1);
                deleteItemFromCart(pId);
                getCartTotalPrice();
            }
        }
        console.log("cart id = " + cartId);
        console.log("prod id =" + pId);
        console.log(cartItemsIds);
        console.log(cartTotal);

        getCartTotalPrice();
    }
}

function getCartTotalPrice() {
    var cartTotalAmount = 0;
    for (let ele of cartTotal) {
        var prodTotalPrice = ele.pQnty * ele.pPrice;
        cartTotalAmount = cartTotalAmount + prodTotalPrice;
    }
    document.getElementById('total-amount').innerText = "$" + cartTotalAmount;
    document.getElementById('currency').innerText = ".USD";
    return cartTotalAmount;
}

function isProductExist(pId) {
    for (let ele of cartTotal) {
        if (ele.pId == pId) {
            return true;
        }
    }
    return false;
}

function deleteItemFromCart(pId) {
    console.log("PID =" + pId);
    for (var i = 0; i < cartTotal.length; i++) {
        if (cartTotal[i].pId === pId) {
            cartTotal.splice(i, i + 1);
        }
    }
}
function increaseOrReduceQnty(qntyBtn, cartId, pId) {
    var btnText = qntyBtn.childNodes[0].getAttribute('value');
    if (btnText == "-") {

        var avlblCartRow = document.getElementById(cartId).lastChild;
        var qtyElement = avlblCartRow.childNodes[2].childNodes[1];
        var qtyElementCurrVal = qtyElement.value;


        if (qtyElementCurrVal > 1) {
            qtyElementCurrVal--;
            qtyElement.setAttribute('value', qtyElementCurrVal);
            updateCartQnty(pId, qtyElementCurrVal);
            getCartTotalPrice();
            return null;
        } else {
            qtyElement.setAttribute('value', 1);
            updateCartQnty(pId, qtyElementCurrVal);
            getCartTotalPrice();
        }
        return null;
    }
    if (btnText == "+") {
        var avlblCartRow = document.getElementById(cartId).lastChild;
        var qtyElement = avlblCartRow.childNodes[2].childNodes[1];
        var qtyElementCurrVal = qtyElement.value;

        qtyElement.setAttribute('value', ++qtyElementCurrVal);
        updateCartQnty(pId, qtyElementCurrVal);
        getCartTotalPrice();
        return null;
    }
}

function updateCartQnty(pId, qtyElementCurrVal) {
    if (isProductExist(pId)) {
        upd_obj = cartTotal.findIndex((obj => obj.pId == pId));
        cartTotal[upd_obj].pQnty = qtyElementCurrVal;
    }
}
