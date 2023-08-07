document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    if (category) {
      fetch(`https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/api_today/products-of-category?category=${category}`)
        .then(response => response.json())
        .then(products => {
          const productContainer = document.querySelector('#property-grid-item');

          const titleElement = document.querySelector('.title-single');
          if (titleElement) {
            titleElement.textContent = category;
          }

          products.forEach(product => {
            const productElem = document.createElement('div');
            productElem.classList.add('carousel-item-b', 'col-md-4');
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
            productContainer.appendChild(productElem);
          });
        })
        .catch(err => console.error('An error occurred:', err));
    }
  });
  