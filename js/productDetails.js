const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


const url = `https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/product_today/${productId}`; // Replace with the correct URL to fetch a single product
fetch(`https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/product_today/${productId}`)
.then(response => response.json())

  .then(product => {

    
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
  <section >
   <div style="left: 50px;">
      <div class="row">
        <div class="col-md-12 col-lg-8">
          <div class="title-single-box">
            <h1 class="title-single">${product.name}</h1>
            <span id="cat-o-product" class="color-text-a">${product.category}</span>
            <br>
            <span id="cat-o-product" class="color-text-a">${ 'id = ' + product._id}</span>
            </div>
        </div>
        <div class="col-md-12 col-lg-3">
           
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
      <img src="${product.image}" alt="" id="image-details">
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
