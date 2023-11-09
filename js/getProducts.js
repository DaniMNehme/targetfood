
fetch("https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/products-by-category_today")
.then(response => response.json())
.then(categories => {
  const mainContainer = document.querySelector('#property-grid-item');

  // Loop through each category
  categories.forEach(category => {
    // Create a new row for the category
    const categoryRow = document.createElement('div');
    categoryRow.classList.add('row');
    categoryRow.innerHTML = `
    <div class="col-md-8 col-6"><h2>${category._id}</h2></div>
    <div class="col-md-4 col-6 text-right">
    <a href="products-category.html?category=${category._id}" class="btn btn-color-b">Show all</a>
    </div>
    `;
    
    // Loop through the first three products of each category
    category.products.slice(0, 3).forEach(product => {
        // Create the product elements
        const productElem = document.createElement('div');
        productElem.classList.add('carousel-item-b', 'col-md-4');

        // Add product HTML here
        productElem.innerHTML = `
        <div class="card-box-a card-shadow">
          <div class="img-box-a">
            <img src="${product.image}" alt="" class="img-a img-fluid" id="product-outside">
          </div>
          <div class="card-overlay">
            <div class="card-overlay-a-content">
              <div class="card-header-a">
                <h2 class="card-title-a">
                  <a href="#">${product.name}
                    </a>
                </h2>
              </div>
              <div class="card-body-a">
                <div class="price-box d-flex">
                  <span class="price-a">price ${product.price} $</span>
                </div>
                <a href="product-details.html?id=${product._id}" class="link-a">Click here to view
                  <span class="ion-ios-arrow-forward"></span>
                </a>
              </div>
              <div class="card-footer-a">
                
              </div>
            </div>
          </div>
        </div>`;

        // Add the product element to the category row
        categoryRow.appendChild(productElem);
      });

    // Add the category row to the main container
    mainContainer.appendChild(categoryRow);
  });
  
  document.getElementById('preloader').style.display = 'none';
})
.catch(err => console.error('An error occurred:', err));

document.addEventListener('DOMContentLoaded', function() {
  // Function to populate the categories navbar
  function populateCategoriesNavbar() {
      fetch("https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/products-by-category_today")
          .then(response => response.json())
          .then(categories => {
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

  // Execute the function to populate categories
  populateCategoriesNavbar();
});
