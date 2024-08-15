const preferredOrder = ["Snacks", "Beverage", "Pantry", "Household"];

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

    mainContainer.innerHTML = ''; // Clear existing content

    products.forEach(product => {
        const productElem = document.createElement('div');
        productElem.classList.add('col-md-4');
        productElem.innerHTML = `
            <div class="card-box-a card-shadow">
                <div class="img-box-a">
                    <img src="${product.image}" alt="${product.name}" class="img-a img-fluid">
                </div>
                <div class="card-overlay">
                    <div class="card-overlay-a-content">
                        <div class="card-header-a">
                            <h2 class="card-title-a">
                                <a href="product-details.html?id=${product._id}">${product.name}</a>
                            </h2>
                        </div>
                        <div class="card-body-a">
                            <a href="product-details.html?id=${product._id}" class="link-a">Click here to view
                                <span class="ion-ios-arrow-forward"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>`;
        mainContainer.appendChild(productElem);
    });
}

document.addEventListener('DOMContentLoaded', function() {
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