const preferredOrder = ["Snacks / Chips","Snacks / Chocolate","Snacks / Biscuits","Snacks / Salted Biscuits","Snacks / Wafer","Snacks / Cake","Snacks / Rice Cake","Snacks / Date","Snacks / Musk","Beverage / Cocoa","Beverage / Coffee","Beverage / Tea","Beverage / Syrups","Pantry / Condiments & Dressings","Pantry / Cans","Pantry / Pasta & Grains","Pantry / Oils & Vinegars","Pantry / Processed Cheese","Pantry / Toasts", /* Add other categories here */];

fetch("https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/products-by-category_today")
.then(response => response.json())
.then(categories => {
  // Sort categories based on the preferred order
  categories.sort((a, b) => {
    let indexA = preferredOrder.indexOf(a._id);
    let indexB = preferredOrder.indexOf(b._id);
    return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
  });

  const mainContainer = document.querySelector('#property-grid-item');

  categories.forEach(category => {
    const categoryRow = document.createElement('div');
    categoryRow.classList.add('row');
    categoryRow.innerHTML = `
      <div class="col-md-8 col-6"><h2>${category._id}</h2></div>
      <div class="col-md-4 col-6 text-right">
        <a href="products-category.html?category=${category._id}" class="btn btn-color-b">Show all</a>
      </div>
    `;

    category.products.slice(0, 3).forEach(product => {
      const productElem = document.createElement('div');
      productElem.classList.add('carousel-item-b', 'col-md-4');
      productElem.innerHTML = `
        <div class="card-box-d card-shadow">
          <div class="img-box-a">
            <img src="${product.image}" alt="" class="img-a img-fluid" id="product-outside">
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
              <div class="card-footer-a">
                <!-- Footer content -->
              </div>
            </div>
          </div>
        </div>`;
      categoryRow.appendChild(productElem);
    });

    mainContainer.appendChild(categoryRow);
  });

  document.getElementById('preloader').style.display = 'none';
})
.catch(err => console.error('An error occurred:', err));

document.addEventListener('DOMContentLoaded', function() {
  function populateCategoriesNavbar() {
    fetch("https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/products-by-category_today")
      .then(response => response.json())
      .then(categories => {
        // Sort categories based on the preferred order
        categories.sort((a, b) => {
          let indexA = preferredOrder.indexOf(a._id);
          let indexB = preferredOrder.indexOf(b._id);
          return (indexA === -1 ? Infinity : indexA) - (indexB === -1 ? Infinity : indexB);
        });

        const categoriesNavbar = document.getElementById('categories-navbar');
        categories.forEach(category => {
          const categoryListItem = document.createElement('li');
          const categoryLink = document.createElement('a');
          categoryLink.href = `products-category.html?category=${category._id}`;
          categoryLink.innerText = category._id;
          categoryListItem.appendChild(categoryLink);
          categoriesNavbar.appendChild(categoryListItem);
        });
      })
      .catch(err => console.error('An error occurred:', err));
  }

  populateCategoriesNavbar();
});
