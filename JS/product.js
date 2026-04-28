
let filtered = [];
let products = [];
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

function createProduct(p){
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

        image.src = p.img;
        h2.textContent =p.name;
        price.textContent = `$${p.price.toFixed(2)}`;
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

function  updateCartCount(){
        let products = document.querySelectorAll(".cart-box .product");
        cartIcon.setAttribute("data-count",products.length);
    }

function renderProducts(List){
    const grid = document.getElementById('plantsGrid');
    const noResults = document.getElementById('noResults');
    const count = document.getElementById('productCount');

    grid.innerHTML = '';
    count.textContent = List.length;

    if(List.length == 0)
    {
         grid.innerHTML = `<div class="no-results" id="noResults">
                            <i class="fas fa-seedling"></i>
                            <p>No plants found. Try different filters.</p>
                        </div>`;
        return;
    }

     List.forEach(p => {
            const card = document.createElement('div');
            card.classList.add('plant-card');
            card.dataset.category = p.category;
            card.dataset.price = p.price;
            card.dataset.care = p.care;
            card.dataset.light = p.light;
            card.innerHTML = `
                ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
                <button class="wishlist" onclick="toggleWishlist(this)">
                    <i data-lucide="heart"></i>
                </button>
                <img src="${p.img}" alt="${p.name}">
                <div class="plant-content">
                    <p class="category">${p.category}</p>
                    <h3>${p.name}</h3>
                    <p class="price">$${p.price.toFixed(2)}</p>
                    <button class="btn-add">
                        <i data-lucide="shopping-bag"></i> Add to Cart
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });

    let btnAdd = document.querySelectorAll(".btn-add");
    btnAdd.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            createProduct(List[index]);
            updateCartCount();
            lucide.createIcons();
        });
    });
        
        lucide.createIcons();   
    }

    function searchPlants() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        filtered = products.filter(p => p.name.toLowerCase().includes(query));
        renderProducts(filtered);
    }
 
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') searchPlants();
    });
 
    function updatePrice(val) {
        document.getElementById('priceValue').textContent = `$${val}`;
    }
 
    function applyFilters() {
        const cats = [...document.querySelectorAll('.filter-cat:checked')].map(e => e.value);
        const cares = [...document.querySelectorAll('.filter-care:checked')].map(e => e.value);
        const lights = [...document.querySelectorAll('.filter-light:checked')].map(e => e.value);
        const maxPrice = parseFloat(document.getElementById('priceRange').value);
        const query = document.getElementById('searchInput').value.toLowerCase();
 
        filtered = products.filter(p => {
            if (cats.length && !cats.includes(p.category)) return false;
            if (cares.length && !cares.includes(p.care)) return false;
            if (lights.length && !lights.includes(p.light)) return false;
            if (p.price > maxPrice) return false;
            if (query && !p.name.toLowerCase().includes(query)) return false;
            return true;
        });
 
        renderProducts(filtered);
    }
 
    function clearFilters() {
        document.querySelectorAll('input[type="checkbox"]').forEach(c => c.checked = false);
        document.getElementById('priceRange').value = 100;
        document.getElementById('priceValue').textContent = '$100';
        document.getElementById('searchInput').value = '';
        filtered = [...products];
        renderProducts(filtered);
    }
 
    function sortProducts(val) {
        let sorted = [...filtered];
        if (val === 'price-asc') sorted.sort((a, b) => a.price - b.price);
        else if (val === 'price-desc') sorted.sort((a, b) => b.price - a.price);
        else if (val === 'name-asc') sorted.sort((a, b) => a.name.localeCompare(b.name));
        else if (val === 'name-desc') sorted.sort((a, b) => b.name.localeCompare(a.name));
        renderProducts(sorted);
}
fetch("JSON/products.json").then(res=>{
    if(!res.ok)return;
    return res.json();
})
.then(data=>{
    products = data;
    filtered = [...data];
    renderProducts(filtered);
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


sortProducts();
updateCartCount();
lucide.createIcons();