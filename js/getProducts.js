const CATALOG_URL = 'https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/products-by-category_today';
const CATEGORY_ORDER = [
  'Healthy & Dietetic',
  'Sweets & Gummies',
  "Kids' Selection",
  'Beverages',
  'Pantry',
  'Household'
];

const catalogState = {
  categories: [],
  scope: [],
  query: ''
};

function showLoader() {
  document.getElementById('loader')?.classList.remove('loader-hidden');
}

function hideLoader() {
  document.getElementById('loader')?.classList.add('loader-hidden');
}

function clean(value) {
  return String(value || '').trim();
}

function productKey(product) {
  return clean(product.name).toLowerCase().replace(/[^a-z0-9]+/g, '');
}

function uniqueProducts(products) {
  const seen = new Set();
  return products.filter((product) => {
    const key = productKey(product);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function healthySubcategory(product) {
  const text = `${product.name} ${product.description}`.toLowerCase();
  if (text.includes('jam')) return 'Jam';
  if (/abonett|abonettt|crackerbread/.test(text)) return 'Cracker Bread';
  if (/rice cake|corn cake/.test(text)) return 'Rice Cakes';
  if (/snatt|soft pop|salty|chips|cracker|pretzel/.test(text)) return 'Salty Snacks';
  if (/choc|biscuit|wafer|cookie|brownie|florb|monte|today/.test(text)) return 'Chocolate & Biscuits';
  return 'Healthy Essentials';
}

function normalizeCatalog(rawCategories) {
  const groups = new Map(CATEGORY_ORDER.map((name) => [name, new Map()]));

  const addProduct = (categoryName, subcategoryName, product, sourceCategory = '', sourceSubcategory = '') => {
    const category = groups.get(categoryName);
    if (!category) return;
    const subcategory = clean(subcategoryName) || 'Other';
    if (!category.has(subcategory)) category.set(subcategory, []);
    category.get(subcategory).push({
      ...product,
      name: clean(product.name),
      description: clean(product.description),
      sourceCategory: clean(sourceCategory),
      sourceSubcategory: clean(sourceSubcategory)
    });
  };

  rawCategories.forEach((category) => {
    const sourceCategory = clean(category._id);
    if (!sourceCategory) return;

    (category.subcategories || []).forEach((subcategory) => {
      const sourceSubcategory = clean(subcategory.subcategory);

      (subcategory.products || []).forEach((product) => {
        const name = clean(product.name);
        const text = `${name} ${clean(product.description)}`.toLowerCase();

        if (sourceCategory === 'Household') {
          if (/children/.test(sourceSubcategory.toLowerCase())) {
            addProduct("Kids' Selection", 'Chocolate, Candy & Biscuits', product, sourceCategory, sourceSubcategory);
            return;
          }
          let target = sourceSubcategory || 'Household essentials';
          if (/pocket.*wipe|super pocket/.test(text)) target = 'Pocket Wipes';
          else if (/wipe|wet towel/.test(text)) target = 'Wipes';
          else if (/saniti/.test(text)) target = 'Sanitizer';
          addProduct('Household', target, product, sourceCategory, sourceSubcategory);
          return;
        }

        if (sourceCategory === 'Pantry') {
          if (/(olive oil|sunflower oil|cooking oil)/.test(text)) return;
          let target = sourceSubcategory || 'Pantry essentials';
          if (/vinegar|lemon substitute/.test(text)) target = 'Condiments & Dressings';
          else if (/toast/.test(text)) target = 'Toast';
          else if (/pasta|spaghetti|vermicelli|snails|shells|penne|fusili/.test(text)) target = 'Pasta';
          else if (/rice|flour|grain/.test(text)) target = 'Grains & Flour';
          addProduct('Pantry', target, product, sourceCategory, sourceSubcategory);
          return;
        }

        if (sourceCategory === 'Beverage') {
          if (/cappuccino|3\s*in\s*1|3in1/.test(text)) return;
          addProduct('Beverages', sourceSubcategory || 'Beverages', product, sourceCategory, sourceSubcategory);
          return;
        }

        if (sourceCategory === 'Healthy') {
          if (/abonett|abonettt|crackerbread/.test(text)) {
            addProduct('Pantry', 'Cracker Bread', product, sourceCategory, sourceSubcategory);
            return;
          }
          if (/health up/.test(text) && /(rice cake|corn cake)/.test(text)) {
            addProduct('Pantry', 'Rice Cakes', product, sourceCategory, sourceSubcategory);
            return;
          }
          addProduct('Healthy & Dietetic', healthySubcategory(product), product, sourceCategory, sourceSubcategory);
          if (/pictolin/.test(text)) {
            addProduct('Sweets & Gummies', 'Sugar-Free Candy', product, sourceCategory, sourceSubcategory);
          }
          return;
        }

        if (sourceCategory === 'Snacks') {
          const isChildRange = /children/.test(sourceSubcategory.toLowerCase());
          const isHealthyRange = /healthy|cracker/.test(sourceSubcategory.toLowerCase());
          const isRequestedSweet = /laica|eviza|bonart|mr\.?\s*hoot|cocco\s*candy|coccocandy|simsek|dippo|sharawi/.test(text);

          if (isChildRange) {
            addProduct("Kids' Selection", 'Chocolate, Candy & Biscuits', product, sourceCategory, sourceSubcategory);
          }

          if (isRequestedSweet || /chocolate/.test(sourceSubcategory.toLowerCase())) {
            const target = /eviza|mr\.?\s*hoot|cocco\s*candy|coccocandy|sharawi|jelly|gummy|lollipop|candy/.test(text)
              ? 'Gummies & Candy'
              : 'Chocolate & Sweet Treats';
            addProduct('Sweets & Gummies', target, product, sourceCategory, sourceSubcategory);
          }

          if (isHealthyRange || /health up|gull[oó]n|monte|snatt|today|florb|soft pop|abonett/.test(text)) {
            addProduct('Healthy & Dietetic', healthySubcategory(product), product, sourceCategory, sourceSubcategory);
          }
        }
      });
    });
  });

  addProduct('Beverages', 'Plant Based Milk', {
    _id: 'local-soya-milk',
    name: 'Soya Plant-Based Milk',
    description: 'A smooth plant-based soya drink for pouring, cooking, and everyday refreshment.',
    image: 'images/product-soya-milk.jpg',
    _local: true
  });

  addProduct('Sweets & Gummies', 'Chocolate & Sweet Treats', {
    _id: 'local-bonart-sweets',
    name: 'Bonart Sweets & Gummies',
    description: 'Bonart confectionery for sweet sharing occasions and impulse displays.',
    image: 'images/brandslogos/9.png',
    _local: true
  });

  addProduct('Pantry', 'Toast', {
    _id: 'local-oat-cereals-toast',
    name: 'Health Up Max Oat & Cereals Toast',
    description: 'Standard-format oat and cereal toast from the Health Up Max range.',
    image: 'images/brands/healthup.png',
    _local: true
  });

  addProduct('Pantry', 'Pasta', {
    _id: 'local-tricolor-pasta',
    name: 'Today Tricolor Pasta',
    description: 'Tricolor pasta made with tomato, spinach, and classic durum wheat pasta.',
    image: 'images/product-tricolor-pasta.jpg',
    _local: true
  });

  addProduct('Household', 'Wipes', {
    _id: 'local-water-wipes',
    name: 'Water Wipes',
    description: 'Gentle water-based wipes for convenient everyday care.',
    image: 'images/product-water-wipes.jpg',
    _local: true
  });

  return CATEGORY_ORDER.map((name) => ({
    _id: name,
    subcategories: Array.from(groups.get(name).entries())
      .map(([subcategory, products]) => ({ subcategory, products: uniqueProducts(products) }))
      .filter((subcategory) => subcategory.products.length)
  }));
}

function createCategoryNavbar(categories) {
  const categoriesList = document.getElementById('categories-list');
  if (!categoriesList) return;
  categoriesList.replaceChildren();

  const addNavItem = (label, products, title, subcategories = []) => {
    const li = document.createElement('li');
    li.className = 'category-dropdown';

    const link = document.createElement('a');
    link.href = '#catalog-results';
    link.textContent = label;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      displayProducts(products, title);
    });
    li.appendChild(link);

    if (subcategories.length) {
      const dropdown = document.createElement('div');
      dropdown.className = 'dropdown-content';
      subcategories.forEach((subcategory) => {
        const subLink = document.createElement('a');
        subLink.href = '#catalog-results';
        subLink.textContent = subcategory.subcategory;
        subLink.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          displayProducts(subcategory.products, `${title} · ${subcategory.subcategory}`);
        });
        dropdown.appendChild(subLink);
      });
      li.appendChild(dropdown);
    }

    categoriesList.appendChild(li);
  };

  const allProducts = uniqueProducts(categories.flatMap((category) =>
    category.subcategories.flatMap((subcategory) => subcategory.products)
  ));
  addNavItem('All Products', allProducts, 'All Products');

  categories.forEach((category) => {
    const products = uniqueProducts(category.subcategories.flatMap((subcategory) => subcategory.products));
    addNavItem(category._id, products, category._id, category.subcategories);
  });
}

function getBenefits(product) {
  const text = `${product.name} ${product.description}`.toLowerCase();
  const benefits = [
    ['Gluten-Free', /gluten[- ]?free|\bgf\b/],
    ['No Added Sugar', /no added sugar|sugar[- ]?free|\bzero sugar|\bn\.a\.s\b/],
    ['Plant-Based', /plant[- ]?based|soya|soy |oat milk|almond milk|coconut milk|hazelnut milk/],
    ['High Fiber', /high (?:in )?fib(?:er|re)|rich in fib(?:er|re)/],
    ['Protein', /\bprotein\b/],
    ['Popped, Not Fried', /popped not fried/],
    ['Low Calorie', /low (?:in )?cal|only \d+ calories/],
    ['Lactose-Free', /lactose[- ]?free/]
  ];

  return benefits.filter(([, pattern]) => pattern.test(text)).slice(0, 3).map(([label]) => label);
}

function renderProducts(products) {
  const grid = document.getElementById('property-grid-item');
  const resultsCount = document.getElementById('results-count');
  if (!grid) return;
  grid.replaceChildren();

  if (!products.length) {
    const empty = document.createElement('div');
    empty.className = 'catalog-message';
    empty.innerHTML = '<h3>No matching products</h3><p>Try a different product, brand, benefit, or category.</p>';
    grid.appendChild(empty);
  }

  products.forEach((product) => {
    const card = document.createElement('article');
    card.className = 'product-card';

    const media = document.createElement('div');
    media.className = 'product-card__media';
    const image = document.createElement('img');
    image.src = product.image || 'images/favicon.png';
    image.alt = product.name;
    image.loading = 'lazy';
    image.addEventListener('error', () => {
      image.src = 'images/favicon.png';
      image.classList.add('product-card__fallback');
    }, { once: true });
    media.appendChild(image);

    const benefits = getBenefits(product);
    if (benefits.length) {
      const badgeList = document.createElement('div');
      badgeList.className = 'benefit-badges';
      benefits.forEach((benefit) => {
        const badge = document.createElement('span');
        badge.textContent = benefit;
        badgeList.appendChild(badge);
      });
      media.appendChild(badgeList);
    }

    const body = document.createElement('div');
    body.className = 'product-card__body';
    const title = document.createElement('div');
    title.className = 'product-card__title';
    title.textContent = product.name;
    body.appendChild(title);

    if (product._local) {
      const status = document.createElement('span');
      status.className = 'product-card__link product-card__link--static';
      status.textContent = 'New catalog addition';
      body.appendChild(status);
    } else {
      const link = document.createElement('a');
      link.className = 'product-card__link';
      link.href = `product-details.html?id=${encodeURIComponent(product._id)}`;
      link.textContent = 'View details →';
      body.appendChild(link);
    }

    card.append(media, body);
    grid.appendChild(card);
  });

  if (resultsCount) {
    resultsCount.textContent = `${products.length} product${products.length === 1 ? '' : 's'} shown`;
  }
  hideLoader();
}

function applySearch() {
  const query = catalogState.query.toLowerCase();
  const filtered = !query
    ? catalogState.scope
    : catalogState.scope.filter((product) => {
        const benefits = getBenefits(product).join(' ');
        const haystack = [
          product.name,
          product.description,
          product.sourceCategory,
          product.sourceSubcategory,
          benefits
        ].join(' ').toLowerCase();
        return haystack.includes(query);
      });
  renderProducts(filtered);
}

function displayProducts(products, title) {
  catalogState.scope = uniqueProducts(products);
  const categoryTitle = document.getElementById('category-title');
  if (categoryTitle) categoryTitle.textContent = title;
  applySearch();
}

function setupSearch() {
  const input = document.getElementById('product-search');
  const clearButton = document.getElementById('product-search-clear');
  if (!input) return;

  input.addEventListener('input', () => {
    catalogState.query = input.value.trim();
    applySearch();
  });

  clearButton?.addEventListener('click', () => {
    input.value = '';
    catalogState.query = '';
    input.focus();
    applySearch();
  });
}

function showCatalogError() {
  hideLoader();
  const grid = document.getElementById('property-grid-item');
  const resultsCount = document.getElementById('results-count');
  if (resultsCount) resultsCount.textContent = 'The catalog could not be loaded.';
  if (grid) {
    grid.innerHTML = '<div class="catalog-message"><h3>Catalog temporarily unavailable</h3><p>Please refresh the page or try again shortly.</p></div>';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  showLoader();
  setupSearch();

  fetch(CATALOG_URL)
    .then((response) => {
      if (!response.ok) throw new Error(`Catalog request failed with ${response.status}`);
      return response.json();
    })
    .then((categories) => {
      catalogState.categories = normalizeCatalog(categories);
      createCategoryNavbar(catalogState.categories);
      const allProducts = uniqueProducts(catalogState.categories.flatMap((category) =>
        category.subcategories.flatMap((subcategory) => subcategory.products)
      ));
      displayProducts(allProducts, 'All Products');
    })
    .catch((error) => {
      console.error('Catalog load error:', error);
      showCatalogError();
    });
});
