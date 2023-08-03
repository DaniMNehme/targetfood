// // Fetch the products from the server
// fetch('https://648b1ff3cee5150c9aed2208--aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/products-by-category')
//     .then(response => response.json())
//     .then(categories => {
//       const productContainer = document.querySelector('#property-grid-item');

//       // Loop through each category
//       categories.forEach(category => {
//         // Create a new container for the category
//         const categoryElem = document.createElement('div');
//         categoryElem.innerHTML = `<h2>${category._id}</h2>`;
//         categoryElem.classList.add('carousel-item-b', 'col-md-4');

//         // Loop through the first three products of each category
//         category.products.slice(0, 3).forEach(product => {
//             // Create the product elements
//             const productElem = document.createElement('div');
//             productElem.classList.add('carousel-item-b', 'col-md-4');

//             // Add product HTML here
//             productElem.innerHTML = `
//             <div class="card-box-a card-shadow">
//               <div class="img-box-a">
//                 <img src="img/pegatec.png" alt="" class="img-a img-fluid">
//               </div>
//               <div class="card-overlay">
//                 <div class="card-overlay-a-content">
//                   <div class="card-header-a">
//                     <h2 class="card-title-a">
//                       <a href="#">${product.name}
//                         <br /> ${product.name}</a>
//                     </h2>
//                   </div>
//                   <div class="card-body-a">
//                     <div class="price-box d-flex">
//                       <span class="price-a">rent | ${product.price}</span>
//                     </div>
//                     <a href="property-single.html" class="link-a">Click here to view
//                       <span class="ion-ios-arrow-forward"></span>
//                     </a>
//                   </div>
//                   <div class="card-footer-a">
//                     <ul class="card-info d-flex justify-content-around">
//                       <li>
//                         <h4 class="card-info-title">Area</h4>
//                         <span>340m
//                           <sup>2</sup>
//                         </span>
//                       </li>
//                       <li>
//                         <h4 class="card-info-title">Beds</h4>
//                         <span>2</span>
//                       </li>
//                       <li>
//                         <h4 class="card-info-title">Baths</h4>
//                         <span>4</span>
//                       </li>
//                       <li>
//                         <h4 class="card-info-title">Garages</h4>
//                         <span>1</span>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>`;
    
//             // Add the product element to the category element
//             categoryElem.appendChild(productElem);

//           });
//         productContainer.appendChild(categoryElem);
//       });
      
//       document.getElementById('preloader').style.display = 'none';
//     })
//     .catch(err => console.error('An error occurred:', err));
    
    // .then(products => {

    //     const productContainer = document.querySelector('#property-grid-item');
    //     // Loop through each product
    //     products.forEach(product => {
    //       console.log(product)
    //         // Create the product elements
    //         const productElem = document.createElement('div');
    //         productElem.classList.add('carousel-item-b');
    //         productElem.classList.add('col-md-4');


    //         productElem.innerHTML = `
    //       <div class="card-box-a card-shadow">
    //         <div class="img-box-a">
    //           <img src="img/pegatec.png" alt="" class="img-a img-fluid">
    //         </div>
    //         <div class="card-overlay">
    //           <div class="card-overlay-a-content">
    //             <div class="card-header-a">
    //               <h2 class="card-title-a">
    //                 <a href="#">${product.name}
    //                   <br /> ${product.name}</a>
    //               </h2>
    //             </div>
    //             <div class="card-body-a">
    //               <div class="price-box d-flex">
    //                 <span class="price-a">rent | ${product.age}</span>
    //               </div>
    //               <a href="property-single.html" class="link-a">Click here to view
    //                 <span class="ion-ios-arrow-forward"></span>
    //               </a>
    //             </div>
    //             <div class="card-footer-a">
    //               <ul class="card-info d-flex justify-content-around">
    //                 <li>
    //                   <h4 class="card-info-title">Area</h4>
    //                   <span>340m
    //                     <sup>2</sup>
    //                   </span>
    //                 </li>
    //                 <li>
    //                   <h4 class="card-info-title">Beds</h4>
    //                   <span>2</span>
    //                 </li>
    //                 <li>
    //                   <h4 class="card-info-title">Baths</h4>
    //                   <span>4</span>
    //                 </li>
    //                 <li>
    //                   <h4 class="card-info-title">Garages</h4>
    //                   <span>1</span>
    //                 </li>
    //               </ul>
    //             </div>
    //           </div>
    //         </div>
    //       </div>`;

    //         // Add the product element to the product container
    //         productContainer.appendChild(productElem);

    //       });





// fetch('https://648b1ff3cee5150c9aed2208--aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/products-by-category')
// .then(response => response.json())
// .then(categories => {
//   const mainContainer = document.querySelector('#property-grid-item');

//   // Loop through each category
//   categories.forEach(category => {
//     // Create a new row for the category
//     const categoryRow = document.createElement('div');
//     categoryRow.classList.add('row');
//     categoryRow.innerHTML = `<div class="col-12"><h2>${category._id}</h2></div>`;
    
//     // Loop through the first three products of each category
//     category.products.slice(0, 3).forEach(product => {
//         // Create the product elements
//         const productElem = document.createElement('div');
//         productElem.classList.add('carousel-item-b', 'col-md-4');

//         // Add product HTML here
//         productElem.innerHTML = `
//         <div class="card-box-a card-shadow">
//         <div class="img-box-a">
//           <img src="img/pegatec.png" alt="" class="img-a img-fluid">
//         </div>
//         <div class="card-overlay">
//           <div class="card-overlay-a-content">
//             <div class="card-header-a">
//               <h2 class="card-title-a">
//                 <a href="#">${product.name}
//                   <br /> ${product.name}</a>
//               </h2>
//             </div>
//             <div class="card-body-a">
//               <div class="price-box d-flex">
//                 <span class="price-a">rent | ${product.price}</span>
//               </div>
//               <a href="property-single.html" class="link-a">Click here to view
//                 <span class="ion-ios-arrow-forward"></span>
//               </a>
//             </div>
//             <div class="card-footer-a">
//               <ul class="card-info d-flex justify-content-around">
//                 <li>
//                   <h4 class="card-info-title">Area</h4>
//                   <span>340m
//                     <sup>2</sup>
//                   </span>
//                 </li>
//                 <li>
//                   <h4 class="card-info-title">Beds</h4>
//                   <span>2</span>
//                 </li>
//                 <li>
//                   <h4 class="card-info-title">Baths</h4>
//                   <span>4</span>
//                 </li>
//                 <li>
//                   <h4 class="card-info-title">Garages</h4>
//                   <span>1</span>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>`;

//         // Add the product element to the category row
//         categoryRow.appendChild(productElem);
//       });

//     const showAllBtn = document.createElement('div');
//     showAllBtn.classList.add('col-12');
//     showAllBtn.innerHTML = `<a href="all-products.html?category=${category._id}" class="btn btn-primary">Show all</a>`;
//     categoryRow.appendChild(showAllBtn);
//     // Add the category row to the main container
//     mainContainer.appendChild(categoryRow);
//   });
  
  
//   document.getElementById('preloader').style.display = 'none';
// })
// .catch(err => console.error('An error occurred:', err));


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
            <img src="images/3.png" alt="" class="img-a img-fluid">
          </div>
          <div class="card-overlay">
            <div class="card-overlay-a-content">
              <div class="card-header-a">
                <h2 class="card-title-a">
                  <a href="#">${product.name}
                    <br /> ${product.name}</a>
                </h2>
              </div>
              <div class="card-body-a">
                <div class="price-box d-flex">
                  <span class="price-a">rent | ${product.price}</span>
                </div>
                <a href="product-details.html?id=${product._id}" class="link-a">Click here to view
                  <span class="ion-ios-arrow-forward"></span>
                </a>
              </div>
              <div class="card-footer-a">
                <ul class="card-info d-flex justify-content-around">
                  <li>
                    <h4 class="card-info-title">Area</h4>
                    <span>340m
                      <sup>2</sup>
                    </span>
                  </li>
                  <li>
                    <h4 class="card-info-title">Beds</h4>
                    <span>2</span>
                  </li>
                  <li>
                    <h4 class="card-info-title">Baths</h4>
                    <span>4</span>
                  </li>
                  <li>
                    <h4 class="card-info-title">Garages</h4>
                    <span>1</span>
                  </li>
                </ul>
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

