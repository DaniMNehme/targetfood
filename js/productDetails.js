const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

fetch(`https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/product_today/${productId}`)
  .then(response => response.json())
  .then(product => {
    // Update the product's name
    const productNameElem = document.querySelector('.title-single');
    productNameElem.textContent = product.name;

    const productCatElem = document.querySelector('#cat-o-product');
    productCatElem.textContent = product.category;


    // Update the product's description
    const productDescriptionElem = document.querySelector('.description.color-text-a');
    productDescriptionElem.textContent = product.description;

    // If you have a place for the product's image, you can update it as well
    // const productImageElem = document.querySelector('selector-for-product-image-element');
    // productImageElem.src = product.image;

    // If you have a place for the product's price, you can update it as well
    // const productPriceElem = document.querySelector('selector-for-product-price-element');
    // productPriceElem.textContent = product.price;
  })
  .catch(err => console.error('An error occurred:', err));
