// Продукты
const products = [
    {
        'quantity': '1',
        'price': '24.99',
        'firstStroke': '1 product for 24.99 usd',
        'secondStroke': ''
    },
    {
        'quantity': '2',
        'price': '44',
        'firstStroke': '2 products for 44 usd / 22$ for each',
        'secondStroke': 'You safe 12% on each patent check'
    },
    {
        'quantity': '3',
        'price': '60',
        'firstStroke': '3 products for 60 usd / 20$ for each',
        'secondStroke': 'You safe 20% on each patent check'
    },
    {
        'quantity': '4',
        'price': '72',
        'firstStroke': '4 products for 72 usd / 18$ for each',
        'secondStroke': 'You safe 28% on each patent check'
    },
    
    {
        'quantity': '5',
        'price': '80',
        'firstStroke': '5 products for 80 usd / 16$ for each',
        'secondStroke': 'You safe 36% on each patent check'
    },
]

// Блоки в которых изменяется содержимое
let contentElem = document.querySelector('.content');
let areaButtonElem = document.querySelector('.area-button');

// Создает первоначальный блок с выбранными продуктами, ссылкой для изменений, и кнопкой для оплаты
function addSelectedProducts(quantity = 1) {
    contentElem.innerHTML = `
        <div class="products animation" style='opacity: 0'>
            <div class="product-elem">
                <div class="product-head">
                    <span class="head">Info</span>
                </div>
                <div class="product-item">
                    <p>Enter your email address</p>
                    <input type="text" placeholder="team@checkforpatent.com">
                </div>
                <div class="product-head">
                    <span class="head">Product 1</span>
                </div>
                <div class="product-item">
                    <p>Enter main keyword for the product</p>
                    <input type="text" placeholder="for example, sylicon wine cup">
                </div>
                <div class="product-item">
                    <p>Enter link to the similar product as a reference</p>
                    <input type="text" placeholder="https://...">
                </div>
            </div>
            
            ${createSelectedProduct(quantity)}

            
            ${createLinkMoreProducts()}
        </div>
    `;
    // Вызов функции для создания кнопки оплаты с передачей цены
    createPayButton(products[quantity - 1]['price'])
    
    // При клике на "Добавить больше продуктов" генерируется страница с выбором продуктов
    let addingMoreProductsButton = document.querySelector('.add-product .head')
    addingMoreProductsButton.addEventListener('click', () => {
        addMoreProducts(quantity);
        // запуск анимации появления
        startAnimation();
    
        let continueButton = document.querySelector('.continue-button');
        let selectProduct = document.querySelector('.select-product');
        
        // При выборе продукта запоминаю количество
        let numInputChecked = document.querySelector('input[checked]').dataset.quantity;
        selectProduct.addEventListener('click', function (e) {
            if(e.target.nodeName == 'INPUT') {
                numInputChecked = e.target.dataset.quantity;
            }
        })
        // При нажатии на кнопку "Продолжить" вызывается функция для добавления выбранных продуктов с количеством выбранных элементов 
        continueButton.addEventListener('click', () => {
            addSelectedProducts(numInputChecked);
            // запуск анимации появления
            startAnimation();
        })
    })

    // При клике на крестик у продукта, удаляется этот блок и остальные блоки пересоздаются с меньшим значением
    let productsElem = document.querySelector('.products');
    productsElem.addEventListener('click', function (e) {
        if(e.target.closest('.remove')) {
            e.target.closest('.added-product-elem').remove();

            let addedProducts = document.querySelectorAll('.added-product-elem');
            let addedProductsLength = addedProducts.length;
            
            for(let i = 0; i < addedProductsLength; i++) {
                addedProducts[i].remove();
            }
            this.children[0].insertAdjacentHTML('afterend', createSelectedProduct(addedProductsLength + 1));
            
            startAnimation();
        }
    })
    // Добавление события на кнопку оплаты
    addEventToPayButton()
    // запуск анимации появления
    startAnimation();
   
}
// Генерация выбранных продуктов
function createSelectedProduct(num) {
    let reuslt = '';
    for(let i = 2; i <= num; i++) {
        reuslt += `<div class="product-elem added-product-elem">
                        <div class="product-head">
                            <span class="head">Product ${i}</span>
                            <div class="remove">
                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.5 13.9156C2.91586 13.9156 0 10.9888 0 7.39121C0 3.79362 2.91586 0.866821 6.5 0.866821C10.0841 0.866821 13 3.79362 13 7.39121C13 10.9888 10.0841 13.9156 6.5 13.9156ZM6.5 1.79885C3.42793 1.79885 0.928543 4.30762 0.928543 7.39121C0.928543 10.4748 3.42793 12.9836 6.5 12.9836C9.57207 12.9836 12.0715 10.4748 12.0715 7.39121C12.0715 4.30762 9.57207 1.79885 6.5 1.79885Z" fill="#23C967"/>
                                    <path d="M8.82153 10.1874C8.70271 10.1874 8.58389 10.1419 8.49324 10.0508L3.85042 5.39057C3.66902 5.20848 3.66902 4.9136 3.85042 4.73162C4.03173 4.54963 4.32561 4.54953 4.50691 4.73162L9.14973 9.39186C9.33113 9.57394 9.33113 9.86882 9.14973 10.0508C9.05907 10.1419 8.94035 10.1874 8.82153 10.1874Z" fill="#23C967"/>
                                    <path d="M4.17862 10.1874C4.0598 10.1874 3.94108 10.1419 3.85042 10.0508C3.66902 9.86886 3.66902 9.57388 3.85042 9.39189L8.49324 4.73166C8.67464 4.54957 8.96842 4.54957 9.14973 4.73166C9.33103 4.91364 9.33113 5.20862 9.14973 5.39061L4.50691 10.0508C4.41626 10.1419 4.29744 10.1874 4.17862 10.1874Z" fill="#23C967"/>
                                </svg>
                            </div>
                        </div>
                        <div class="product-item">
                            <p>Enter main keyword for the product</p>
                            <input type="text" placeholder="for example, sylicon wine cup">
                        </div>
                    </div>`;
    }
    // Создание кнопки оплаты с новой ценой
    createPayButton(products[num - 1]['price'])
    // Добавление события на кнопку оплаты
    addEventToPayButton()
    return reuslt;
}
// Создание кнопки оплаты
function createPayButton(price) {
    areaButtonElem.innerHTML = `
        <div class="animation" style='opacity: 0'>
            <button id="pay">Submit and Pay ${price} USD</button>
            <div class="safe">
                <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.78094 6.26251C8.63507 6.0875 8.45806 6.00005 8.24963 6.00005H7.99978V4.19995C7.99978 3.04997 7.65612 2.06256 6.96859 1.23756C6.28111 0.412518 5.45835 0 4.4999 0C3.54147 0 2.71855 0.412518 2.03112 1.23752C1.34359 2.06256 0.999938 3.04994 0.999938 4.19995V6.00005H0.749974C0.541712 6.00005 0.364589 6.0875 0.218742 6.26251C0.0728959 6.4374 0 6.64994 0 6.90009V12.3C0 12.5499 0.0729232 12.7626 0.218742 12.9376C0.364589 13.1125 0.541712 13.2 0.749974 13.2H8.24982C8.45825 13.2 8.63523 13.1126 8.78114 12.9376C8.92685 12.7626 8.99988 12.5499 8.99988 12.3V6.89999C8.99999 6.65004 8.92685 6.43753 8.78094 6.26251ZM6.49986 6.00005H2.49994V4.19995C2.49994 3.53749 2.69529 2.97182 3.0859 2.50315C3.47656 2.03442 3.94787 1.8001 4.49998 1.8001C5.05214 1.8001 5.52334 2.03439 5.91403 2.50315C6.30454 2.97179 6.49986 3.53749 6.49986 4.19995V6.00005Z" fill="#AFB4CC"/>
                </svg>
                <p>Secure payment with Stripe</p>
            </div>
        </div>
    `;
}
// Создание кнопки для выбора продуктов
function createLinkMoreProducts () {
    return `
        <div class="add-product">
            <div class="head">
                <span>Adding more products</span>
                <div class="add">
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.49994 3.40454C6.24349 3.40454 6.03564 3.61239 6.03564 3.86883V9.13074C6.03564 9.38718 6.24349 9.59503 6.49994 9.59503C6.75638 9.59503 6.96423 9.38718 6.96423 9.13074V3.86883C6.96423 3.61239 6.75638 3.40454 6.49994 3.40454Z" fill="#23C967"/>
                        <path d="M9.13147 6.03564H3.86957C3.61312 6.03564 3.40527 6.24349 3.40527 6.49994C3.40527 6.75638 3.61312 6.96423 3.86957 6.96423H9.13147C9.38791 6.96423 9.59576 6.75638 9.59576 6.49994C9.59576 6.24349 9.38791 6.03564 9.13147 6.03564Z" fill="#23C967"/>
                        <path d="M6.5 0C2.91586 0 0 2.91586 0 6.5C0 10.0841 2.91586 13 6.5 13C10.0841 13 13 10.0841 13 6.5C13 2.91586 10.0841 0 6.5 0ZM6.5 12.0714C3.42781 12.0714 0.92856 9.57219 0.92856 6.5C0.92856 3.42781 3.42781 0.92856 6.5 0.92856C9.57219 0.92856 12.0714 3.42781 12.0714 6.5C12.0714 9.57219 9.57219 12.0714 6.5 12.0714Z" fill="#23C967"/>
                    </svg>    
                </div>
            </div>
            <div class="add-info">
                <p>We offer discount up to 36% for multiple checks</p>
            </div>
        </div>
    `;
}

// Создание страницы успешной оплате
function createSuccessPage () {
    contentElem.innerHTML = `
        <div class="payment animation" style="opacity: 0">
            <div class="payment-head">
                <span class="head">Successfull payment</span>
                <p>Your request has been accepted and will be processed within 24 working hours. We will send you a payment details and all information to your email.</p>
            </div>
            <div class="payment-img">
                <img src="img/payment/success.png" alt="">
            </div>
        </div>
    `;
    areaButtonElem.innerHTML = `
        <button class="success-button return-start animation" style="opacity: 0">Back</button>
    `;
}
// Создание страницы неуспешной оплате
function createErrorPage () {
    contentElem.innerHTML = `
        <div class="payment animation" style="opacity: 0">
            <div class="payment-head">
                <span class="head">Your payment failed</span>
                <p>Sorry, but we’ve having trouble processing your payment. You have been not charged for this transaction.</p>
            </div>
            <div class="payment-img">
                <img src="img/payment/error.jpg" alt="">
            </div>
        </div>
    `;
    areaButtonElem.innerHTML = `
        <button class="error-button return-start animation" style="opacity: 0">Try to pay again</button>
    `;
}

// Добавить больше продуктов
// Добавляет шапку и сгенерированные продукты
function addMoreProducts(quantity) {
    contentElem.innerHTML = `
        <div class="animation" style='opacity: 0'>
            <div class="adding-elem">
                <span class="adding-head">Adding more products</span>
                <p>The more items you check, the better the price.</p>
            </div>
            <div class="select-product">${createMoreProducts(products.slice().reverse(), quantity)}</div>
        </div>
    `;
}
// Генерирует продукты из массива и вызывает добавление кнопки
function createMoreProducts(products, quantity) {
    let result = '';
    for(let i = 0; i < products.length; i++) {
        let product = products[i];
        let checked = i == products.length - quantity ? 'checked' : '';
        let secondText = product['secondStroke'] != '' ? `<p class="select-info">${product['secondStroke']}</p>` : '';
        
        result += `
        <label class="select-elem">
            <div class="select-item">
                <input type="radio" name="select-item" ${checked} data-price="${product['price']}" data-quantity="${product['quantity']}">
                <div class="select-description">
                    <p class="select-head">${product['firstStroke']}</p>
                    ${secondText}
                </div>
            </div>
        </label>
        `;
    }
    // Вызов создания кнопки
    addMoreButton();
    return result;
}
// Создание кнопки "Продолжить"
function addMoreButton () {
    areaButtonElem.innerHTML = `
        <button class="continue-button animation" style='opacity: 0'>Continue</button>
    `;
}
// Анимация появления контента
function startAnimation() {

    let animationElems = document.querySelectorAll('.animation');

    for(let i = 0; i < animationElems.length; i++) {
        setTimeout(() => {
            animationElems[i].style = 'opacity: 1'
        }, 0)
    }
}

// Отрисовка успешной страницы и страницы ошибки при клике на кнопку оплаты
function addEventToPayButton () {
    let payButton = document.querySelector('#pay');
    
    payButton.addEventListener('click', (e) => {
        e.preventDefault()
        payButton.innerHTML = ''
        payButton.classList.add('loading')

            setTimeout(() => {
                // Случайное определение успешной или неуспешной оплаты
                let rand = Math.round(Math.random());

                if(rand) {
                    history.pushState(null, null, '/paymentsuccess');
                    createSuccessPage()
                } else {
                    history.pushState(null, null, '/paymenterror');
                    createErrorPage()
                }
                
                let returnStartButton = document.querySelector('.return-start');
                returnStartButton.addEventListener('click', (e) => {
                    history.pushState(null, null, '/index.html');
                })
                // запуск анимации появления
                startAnimation()
            }, 1620)
    })
}

addSelectedProducts(1);