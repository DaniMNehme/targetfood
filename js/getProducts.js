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


  if (window.innerWidth < 768) {
    const mainContainer = document.querySelector('#property-grid-item');

    categories.forEach((category, catIndex) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('category');

        const title = document.createElement('h2');
        title.textContent = category._id;
        categoryDiv.appendChild(title);

        let currentSlide = 0;

        const renderSlide = () => {
            if (category.products.length === 0) return;
            categoryDiv.querySelectorAll('.carousel-item').forEach(item => item.classList.remove('active'));
            categoryDiv.querySelectorAll('.carousel-item')[currentSlide].classList.add('active');
        };

        category.products.forEach((product, index) => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('carousel-item');
            if (index === 0) productDiv.classList.add('active'); // First product is active by default

            productDiv.innerHTML = `
            <div style="background-color: white;">
            <a href="product-details.html?id=${product._id}" class="card-box-d card-shadow" style="background-color: white;">
                <div>
                    <img src="${product.image}" alt="${product.name}" style="width: 100%;">
                    <h3>${product.name}</h3>
                </div>
            </a>
            </div>
        `;
        
            categoryDiv.appendChild(productDiv);
        });

        const prevButton = document.createElement('button');
        prevButton.className = 'prev';
        // prevButton.textContent = 'Prev';
        prevButton.textContent = '<'
        prevButton.onclick = () => {
            currentSlide = (currentSlide - 1 + category.products.length) % category.products.length;
            renderSlide();
        };

        const nextButton = document.createElement('button');
        nextButton.className = 'next'
        nextButton.textContent = '>'

        // nextButton.textContent = 'Next';
        nextButton.onclick = () => {
            currentSlide = (currentSlide + 1) % category.products.length;
            renderSlide();
        };

        categoryDiv.appendChild(prevButton);
        categoryDiv.appendChild(nextButton);

        mainContainer.appendChild(categoryDiv);
    });

}
else{

  const mainContainer = document.querySelector('#property-grid-item');

  categories.forEach(category => {
    console.log(category._id)
    const categoryRow = document.createElement('div');
    categoryRow.classList.add('row');
    categoryRow.innerHTML = `
      <div class="col-md-8 col-6"><h2>${category._id}</h2></div>
      <div class="col-md-4 col-6 text-right">
        <a href="products-category.html?category=${encodeURIComponent(category._id)}" class="btn btn-color-b">Show all</a>
      </div>
    `;

    category.products.slice(0, 3).forEach(product => {
      const productElem = document.createElement('div');
      productElem.classList.add('carousel-item-b', 'col-md-4');
      productElem.innerHTML = `
      <div  class="card-box-d">
        <a  href="product-details.html?id=${product._id}" class="card-box-d card-shadow">
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
        </a>
        </div>`;
      categoryRow.appendChild(productElem);
    });

    mainContainer.appendChild(categoryRow);
  });

  document.getElementById('preloader').style.display = 'none';
}})
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
