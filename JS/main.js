

window.addEventListener('scroll',()=>{
    let header = document.querySelector("header");
    if(window.scrollY >50){
        header.classList.add("scrolled");
    }
    else{
        header.classList.remove("scrolled");
    }
})



let searchIcon = document.querySelector(".search-icon");
let searchBox = document.querySelector(".search");

searchIcon.addEventListener("click",(e)=>{
    e.preventDefault();
    searchBox.classList.toggle('active');
})

let cartIcon = document.querySelector(".cart");
let cartBox = document.querySelector(".cart-box");
let arrowIcon = document.querySelector(".arrow-icon");

cartIcon.addEventListener("click",(e)=>{
    e.preventDefault();
    cartBox.classList.toggle('active');
})

arrowIcon.addEventListener("click",(e)=>{
    e.preventDefault();
    cartBox.classList.toggle('active');
})

let mainContainer = document.querySelector(".main-container");
let dots = document.querySelectorAll(".dot");
let images = [
    'Images/Main_Photo.png',
    'Images/Main_Photo_2.jpg',
    'Images/Main_Photo_3.jpg'
];

let imgeMobile = document.querySelector(".hero-image-mobile img");

let currentIndex = 0;
function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    mainContainer.style.backgroundImage = `
    linear-gradient(to right, var(--near-black) 0%, transparent 50%), 
    url(${images[currentIndex]})`;
    imgeMobile.setAttribute('src',images[currentIndex]);

    dots.forEach(d => d.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}
setInterval(changeImage, 3500);

function  updateCartCount(){
    let products = document.querySelectorAll(".cart-box .product");

    cartIcon.setAttribute("data-count",products.length);
}


let hamburger = document.querySelector(".hamburger");
let navList = document.querySelector(".nav-list");

hamburger.addEventListener('click',(e)=>{
    navList.classList.toggle('active');
})

document.addEventListener('click', (e) => {
    if (!searchBox.contains(e.target) && !searchIcon.contains(e.target)) {
        searchBox.classList.remove('active');
    }
    if (!navList.contains(e.target) && !hamburger.contains(e.target)) {
        navList.classList.remove('active');
    }
});

//add to cart
let plantcardImg = document.querySelectorAll(".plant-card img");
let contecntH3 = document.querySelectorAll(".plant-contecnt h3");
let contecntP = document.querySelectorAll(".plant-contecnt p");
let addBtn = document.querySelectorAll(".plant-contecnt a");

function createProduct(currentindex){
        let product = document.createElement("div");
        let image = document.createElement("img");
        let cartContent = document.createElement("div");
        let h2 = document.createElement("h2");
        let price = document.createElement("p");
        let btnBuy = document.createElement("a");
        let deleteBtn = document.createElement("a");

        product.classList.add("product");
        cartContent.classList.add("chart-content");
        price.classList.add("price");
        btnBuy.classList.add("btn-buy");
        deleteBtn.classList.add("delete");

        image.src = plantcardImg[currentindex].src;
        h2.textContent =contecntH3[currentindex].textContent;
        price.textContent = contecntP[currentindex].textContent;
        btnBuy.textContent = "Buy Now";
        deleteBtn.innerHTML = '<i data-lucide="x"></i>';


        deleteBtn.addEventListener('click', () => {
            product.remove();
            updateCartCount();
        });

        cartContent.appendChild(h2);
        cartContent.appendChild(price);

        product.appendChild(image);
        product.appendChild(cartContent);
        product.appendChild(btnBuy);
        product.appendChild(deleteBtn);

        cartBox.appendChild(product);
}

addBtn.forEach((btn,index)=>{
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        createProduct(index);
        updateCartCount();
        lucide.createIcons();
    })
})

let arrowLeft = document.querySelector(".review-arrow.left");
let arrowRight = document.querySelector(".review-arrow.right");

function renderReviews(reviews) {
    let track = document.querySelector(".reviews-track");
    
    reviews.forEach(review => {
        let card = document.createElement("div");
        card.classList.add("review-card");
        card.innerHTML = `
            <div class="stars">${"★".repeat(review.stars)}</div>
            <p>${review.text}</p>
            <div class="reviewer">
                <img src="${review.image}">
                <span>${review.name}</span>
            </div>
        `;
        track.appendChild(card);
    });
}

fetch("JSON/reviews.json").then(res=>{
    if(!res.ok) return;
    return res.json()
})
.then(data=>{
    renderReviews(data);

    let track = document.querySelector(".reviews-track");
    let reviewCard = document.querySelectorAll(".review-card");
    let currentReview = 0;
    let totalReviwes = reviewCard.length;
    
    arrowRight.addEventListener('click',(e)=>{
        e.preventDefault();
        currentReview = (currentReview + 1)% totalReviwes;
        track.style.transform = `translateX(-${currentReview * 18.333}%)`;
    });

    setInterval(e=>{
        currentReview = (currentReview + 1)% totalReviwes;
        track.style.transform = `translateX(-${currentReview * 18.333}%)`;
    },2500)
    
    arrowLeft.addEventListener('click',(e)=>{
        e.preventDefault();
        currentReview = (currentReview - 1 + totalReviwes)% totalReviwes;
        track.style.transform = `translateX(-${currentReview * 18.333}%)`;
    });

    //Phone Responsive
    let step = window.innerWidth <= 767 ? 15.9 : 18.333;

    function slide(dir) {
        currentReview = (currentReview + dir + totalReviwes) % totalReviwes;
        track.style.transform = `translateX(-${currentReview * step}%)`;
    }

    arrowRight.addEventListener('click', (e) => {
        e.preventDefault();
        slide(1);
    });

    arrowLeft.addEventListener('click', (e) => {
        e.preventDefault();
        slide(-1);
    });

    setInterval(() => slide(1), 2500);

    window.addEventListener('resize', () => {
        step = window.innerWidth <= 767 ? 15.9 : 18.333;
    });
});

function toggleWishlist(btn) {
        btn.classList.toggle('active');
        const svg = btn.querySelector('svg');
        if (btn.classList.contains('active')) {
            svg.setAttribute('stroke', '#FF6B6B');
            svg.setAttribute('fill', '#FF6B6B');
        } else {
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('fill', 'none');
        }
    }
    
let wishlist = document.querySelectorAll(".wishlist");

wishlist.forEach(btn=>{
    btn.addEventListener('click',(e)=>{
        e.preventDefault();
        toggleWishlist(btn);
    })
})


updateCartCount();
lucide.createIcons();