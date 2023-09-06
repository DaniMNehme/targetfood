
fetch("https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/products-by-category_today")
.then(response => response.json())
.then(categories => {
  const mainContainer = document.querySelector('#property-grid-item');

  // Loop through each category
  categories.forEach(category => {
    // Create a new row for the category
    const categoryRow = document.createElement('div');
    categoryRow.classList.add('row');
    categoryRow.style.display = 'flex';
    categoryRow.style.justifyContent = 'center';
    categoryRow.style.alignItems = 'center';
    categoryRow.style.margin = '0'; // Reset margin
    categoryRow.style.padding = '0'; // Reset padding

    categoryRow.innerHTML = `
    <div class="col-md-8 col-6"><h2 class="category-title">${category._id}</h2></div>
    <div class="col-md-4 col-6 text-right">
    <a href="products-category.html?category=${category._id}" class="btn btn-color-b">Show all</a>
    </div>
    `;

    // Loop through the first three products of each category
    category.products.slice(0, 3).forEach(product => {
        // Create the product elements
        const productElem = document.createElement('div');
        productElem.classList.add('col-md-4'); // Remove carousel-item-b

          productElem.innerHTML = `
          <div class="property-box">
                      <div class="property-thumbnail">
                        <a href="product-details.html?id=${product._id}" class="property-img">
                          <div class="offer-type-wrap">
                            <span class="offer-type bg-success">${product.category}</span>
                          </div>
                          <img class="property-img" src="${product.image}" alt="${product.name}">
                        </a>
                      </div>
                      <div class="detail">
                        <h1 class="title">
                          <a href="product-details.html?id=${product._id}">${product.name}</a>
                        </h1>
                        <div class="location">
                          <a href="product-details.html?id=${product._id}">${product.description}</a>
                        </div>
                        <ul class="facilities-list clearfix">
                          <li>
                            <i class="fa fa-dollar"></i> ${product.price} 
                          </li>
                        </ul>
                      </div>
                      <div >
                        <a href="product-details.html?id=${product._id}" class="btn btn-link btn-see-more">See More</a>
                      </div>
                    </div>
          `;

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
