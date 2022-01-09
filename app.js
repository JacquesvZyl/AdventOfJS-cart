const cart = document.querySelector('.cart-summary');
const addBtn = document.querySelectorAll('.add');
const increaseBtn = document.querySelectorAll('.increase')
const decreaseBtn = document.querySelectorAll('.decrease')
const subtotalElement =  document.querySelector('.subtotal')
const taxElement = document.querySelector('.tax')
const totalElement = document.querySelector('.total').querySelector('.total')

const menuItems = [
    {
        name: 'French Fries with Ketchup',
        price: 2.23,
        image: '/images/plate__french-fries.png',
        alt: 'French Fries',
        count: 0,
    },
    {
        name: 'Salmon and Vegetables',
        price: 5.12,
        image: '/images/plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
        count: 0,
    },
    {
        name: 'Spaghetti with Meat Sauce',
        price: 7.82,
        image: '/images/plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
        count: 0,
    },
    {
        name: 'Bacon, Eggs, and Toast',
        price: 5.99,
        image: '/images/plate__bacon-eggs.png',
        alt: 'Bacon, Eggs, and Toast',
        count: 0,
    },
    {
        name: 'Chicken Salad with Parmesan',
        price: 6.98,
        image: '/images/plate__chicken-salad.png',
        alt: 'Chicken Salad with Parmesan',
        count: 0,
    },
    {
        name: 'Fish Sticks and Fries',
        price: 6.34,
        image: '/images/plate__fish-sticks-fries.png',
        alt: 'Fish Sticks and Fries',
        count: 0,
    }
]

function returnBasketItem(element) {
    return `<li>
    <div class="plate">
      <img src=${element.image} alt=${element.alt} class="plate" />
      <div class="quantity">1</div>
    </div>
    <div class="content">
      <p class="menu-item">${element.name}</p>
      <p class="price">$${element.price}</p>
    </div>
    <div class="quantity__wrapper">
      <button class="decrease">
        <img src="images/chevron.svg" />
      </button>
      <div class="quantity">1</div>
      <button class="increase">
        <img src="images/chevron.svg" />
      </button>
    </div>
    <div class="subtotal">
      $${element.price}
    </div>
  </li>`
}

function setInCartBtn(btn) {
    btn.classList.remove('add')
    btn.classList.add('in-cart')
    btn.innerHTML = `
    <img src="images/check.svg" alt="Check" />
    In Cart`
    btn.disabled = true;
}
function setAddToCartBtn(btn) {
    btn.classList.add('add')
    btn.classList.remove('in-cart')
    btn.innerHTML = 'Add to Cart'
    btn.disabled = false;
}



function increaseCartItem(item,qty,parent) {
    menuItems.forEach( menuItem => {
        if (item === menuItem.name) {;
            menuItem.count++;
            qty.forEach(element => element.innerText = menuItem.count);
            parent.querySelector('.subtotal').innerText = `$${(menuItem.count * menuItem.price).toFixed(2)}`
            
        }
    })
}
function decreaseCartItem(item,qty, parent) {
    menuItems.forEach( menuItem => {
        if (item === menuItem.name) {
            menuItem.count--;
            parent.querySelector('.subtotal').innerText = `$${(menuItem.count * menuItem.price).toFixed(2)}`
            if(menuItem.count <= 0) {
                menuItem.count = 0;
                parent.remove()
                addBtn.forEach(btn => {
                    const mealName = btn.parentElement.querySelector('.menu-item');
                    if(mealName.innerText === menuItem.name) {
                        setAddToCartBtn(btn);

                    }
                })
            
            }
            else {
                
                qty.forEach(element => element.innerText = menuItem.count);
            }
            
            
        }
    })
}

function calculateAmount() {
    let subTotal = 0;
    let tax = 0;
    let total = 0;
    menuItems.forEach(item => {
        subTotal += (item.count * item.price)

    })
    tax = (subTotal / 100) * 15;
    total = subTotal + tax;
    subtotalElement.innerText = `$${subTotal.toFixed(2)}`;
    taxElement.innerText = `$${tax.toFixed(2)}`;
    totalElement.innerText = `$${total.toFixed(2)}` 


}




addBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        const mealName = btn.parentElement.querySelector('.menu-item');
        menuItems.forEach(item => {
            if (mealName.innerText === item.name) {
                item.count++;
                cart.insertAdjacentHTML('beforeend', returnBasketItem(item))
                setInCartBtn(btn);
                calculateAmount();
            }
        })
    })
})

document.addEventListener('click',(e) => {
    if(e.target && (e.target.classList.contains('increase') || e.target.parentElement.classList.contains('increase'))){
        console.log(e.target.nodeName)
        const parent = (e.target.nodeName === 'IMG') ? e.target.parentElement.parentElement.parentElement  : e.target.parentElement.parentElement;
        console.dir(parent);
        //const parent = e.target.parentElement.parentElement;
        const item = parent.querySelector('.menu-item').innerText;
        let qty = parent.querySelectorAll('.quantity');
         increaseCartItem(item,qty,parent);
         calculateAmount();
         
         
     }
     if(e.target && (e.target.classList.contains('decrease') || e.target.parentElement.classList.contains('decrease'))){
        const parent = (e.target.nodeName === 'IMG') ? e.target.parentElement.parentElement.parentElement  : e.target.parentElement.parentElement;
         const item = parent.querySelector('.menu-item').innerText;
         let qty = parent.querySelectorAll('.quantity');;
         decreaseCartItem(item,qty,parent);
         calculateAmount();
         
         
     }
 });




