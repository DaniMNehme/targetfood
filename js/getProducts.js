const preferredOrder = ["Snacks", "Beverage", "Pantry", "Household"];

function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.remove('loader-hidden');
    }
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.classList.add('loader-hidden');
    }
}

function consolidateCategories(categories) {
    return categories.reduce((acc, category) => {
        if (category._id.startsWith("Snacks")) {
            let snacksCategory = acc.find(c => c._id === "Snacks");
            if (snacksCategory) {
                snacksCategory.subcategories = snacksCategory.subcategories.concat(category.subcategories);
            } else {
                acc.push({ _id: "Snacks", subcategories: category.subcategories });
            }
        } else if (category._id !== "") {
            acc.push(category);
        }
        return acc;
    }, []);
}

function createCategoryNavbar(categories) {
    const categoriesList = document.getElementById('categories-list');
    categoriesList.innerHTML = ''; // Clear existing content
    
    // Add "All Products" option
    const allProductsLi = document.createElement('li');
    allProductsLi.className = 'category-dropdown';
    const allProductsA = document.createElement('a');
    allProductsA.href = '#';
    allProductsA.textContent = 'All Products';
    allProductsA.onclick = (e) => {
        e.preventDefault();
        displayAllProducts(categories);
        updateCategoryTitle('All Products');
    };
    allProductsLi.appendChild(allProductsA);
    categoriesList.appendChild(allProductsLi);

    categories.forEach(category => {
        const li = document.createElement('li');
        li.className = 'category-dropdown';
        
        const a = document.createElement('a');
        a.href = '#';
        a.textContent = category._id;
        a.onclick = (e) => {
            e.preventDefault();
            displayAllProductsInCategory(category);
            updateCategoryTitle(category._id);
        };
        
        const dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown-content';
        
        category.subcategories.forEach(subcategory => {
            const subA = document.createElement('a');
            subA.href = '#';
            subA.textContent = subcategory.subcategory;
            subA.onclick = (e) => {
                e.preventDefault();
                displayProducts(subcategory.products);
                updateCategoryTitle(`${category._id} - ${subcategory.subcategory}`);
            };
            dropdownContent.appendChild(subA);
        });
        
        li.appendChild(a);
        li.appendChild(dropdownContent);
        categoriesList.appendChild(li);
    });
}

function updateCategoryTitle(title) {
    const categoryTitle = document.getElementById('category-title');
    if (categoryTitle) {
        categoryTitle.textContent = title;
    }
}

function displayAllProductsInCategory(category) {
    const allProducts = category.subcategories.flatMap(subcategory => subcategory.products);
    displayProducts(allProducts);
}

function displayAllProducts(categories) {
    const allProducts = categories.flatMap(category => 
        category.subcategories.flatMap(subcategory => subcategory.products)
    );
    displayProducts(allProducts);
}

function displayProducts(products) {
    const mainContainer = document.querySelector('#property-grid-item');
    if (!mainContainer) return;

    showLoader(); // Show loader before starting
    mainContainer.innerHTML = ''; // Clear existing content

    // Wrap the product rendering in a setTimeout to ensure the loader is visible
    setTimeout(() => {
        products.forEach(product => {
            const card = document.createElement('article');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-card__body">
                    <div class="product-card__title">${product.name}</div>
                    <a class="product-card__link" href="product-details.html?id=${product._id}">View details →</a>
                </div>
            `;
            mainContainer.appendChild(card);
        });
        hideLoader(); // Hide loader after products are displayed
    }, 10);
}

document.addEventListener('DOMContentLoaded', function() {
    showLoader(); // Show loader before fetching
    fetch("https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/products-by-category_today")
        .then(response => response.json())
        .then(categories => {
            console.log('Original Categories:', categories);

            // Consolidate categories
            let consolidatedCategories = consolidateCategories(categories);
            console.log('Consolidated Categories:', consolidatedCategories);

            // Sort categories based on the preferred order
            consolidatedCategories.sort((a, b) => {
                let indexA = preferredOrder.indexOf(a._id.split(' / ')[0]);
                let indexB = preferredOrder.indexOf(b._id.split(' / ')[0]);
                return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
            });

            createCategoryNavbar(consolidatedCategories);

            // Display all products initially
            displayAllProducts(consolidatedCategories);
            updateCategoryTitle('All Products');
        })
        .catch(err => console.error('An error occurred:', err));
});
