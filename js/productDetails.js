const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// fetch(`https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/product_today/${productId}`)
//   .then(response => response.json())
//   .then(product => {
//     // Update the product's name
//     const productNameElem = document.querySelector('.title-single');
//     productNameElem.textContent = product.name;

//     const productCatElem = document.querySelector('#cat-o-product');
//     productCatElem.textContent = product.category;

//     const productImageElem = document.querySelector('#image-details');
//     productImageElem.src = ''; 
//     productImageElem.src = product.image  + '?v=' + new Date().getTime();
//     console.log(product.image);
//     console.log(productImageElem);

//     // Update the product's description
//     const productDescriptionElem = document.querySelector('.description.color-text-a');
//     productDescriptionElem.textContent = product.description;

  
//     // const productImageElem = document.querySelector('image-details');
//     // productImageElem.src = product.image;

//     // If you have a place for the product's price, you can update it as well
//     // const productPriceElem = document.querySelector('selector-for-product-price-element');
//     // productPriceElem.textContent = product.price;
//   })
//   .catch(err => console.error('An error occurred:', err));



const url = `https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/product_today/${productId}`; // Replace with the correct URL to fetch a single product
fetch(`https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/product_today/${productId}`)
.then(response => response.json())

  .then(product => {

      console.log("here i am neheheheheheh")
      displayProductDetails(product);
    })
    .catch(err => console.error('An error occurred:', err));

// This function will dynamically create the HTML for the product details
function displayProductDetails(product) {
  const mainContainer = document.getElementById('product-details-inner');

  // Clear previous content
  mainContainer.innerHTML = '';

  // Create the HTML elements for the product details
  const htmlContent = `
  <section class="intro-single">
   <div style="left: 50px;">
      <div class="row">
        <div class="col-md-12 col-lg-8">
          <div class="title-single-box">
            <h1 class="title-single">${product.name}</h1>
            <span id="cat-o-product" class="color-text-a">${product.category}</span>
          </div>
        </div>
        <div class="col-md-12 col-lg-3">
            <nav aria-label="breadcrumb" class="breadcrumb-box d-flex justify-content-lg-end">
              <ol class="breadcrumb">
                <li class="breadcrumb-item">
                  <a href="products.html">Home</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                  Product Details
                </li>
              </ol>
            </nav>
          </div>
      </div>
    </div>
  </section>
  <!--/ Intro Single End /-->

  <!--/ Property Single Star /-->
  <section class="property-single nav-arrow-b">
    <div class="container">
      <div class="row">
      <!-- Image Column -->
      <div class="col-sm-12 col-md-6">
      <img src="${product.image}" alt="" id="image-details" >
          <div id="property-single-carousel" class="owl-carousel owl-arrow gallery-property">
            <div class="carousel-item-b">
              <img src="images/1.png" alt="" id="image-details" >
            </div>
            
          </div>
        </div>
        <!-- Description Column -->
        <div class="col-sm-12 col-md-6">
          <div class="justify-content-between">
            <div class="row">
              <div class="col-md-12">
                <div class="property-price d-flex justify-content-center foo">
                  <div class="card-header-c d-flex">
                    <div class="card-title-c align-self-center">
                    </div>
                  </div>
                </div>
                <div class="section-md-t3">
                  <div class="title-box-d">
                    <h3 class="title-d">Description</h3>
                  </div>
                  <div class="property-description">
                    <p class="description color-text-a">
                    ${product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  // Insert the HTML into the main container
  mainContainer.innerHTML = htmlContent;
}

// Call the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', fetchProductDetails);
