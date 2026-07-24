const PRODUCT_API_BASE = 'https://aesthetic-eclair-56d00c.netlify.app/.netlify/functions/api/product_today/';
const productId = new URLSearchParams(window.location.search).get('id');

function clean(value) {
  return String(value || '').trim();
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
  return benefits.filter(([, pattern]) => pattern.test(text)).map(([label]) => label);
}

function targetsNutritionTable(product) {
  return /health\s*up|florb[uú]|gull[oó]n|pictolin|monte|today|nilky|abonett|snatt|venus/i
    .test(`${product.name} ${product.description}`);
}

function extractNutritionFacts(description) {
  const text = clean(description).replace(/\s+/g, ' ');
  const facts = [];
  const pair = text.match(/(\d+(?:\.\d+)?)\s*kJ\s*\/\s*(\d+(?:\.\d+)?)\s*kcal/i);

  if (pair) {
    facts.push(['Energy', `${pair[1]} kJ / ${pair[2]} kcal`]);
  } else {
    const calories = text.match(/(?:only\s*)?(\d+(?:\.\d+)?)\s*(?:calories|kcal)/i);
    if (calories) facts.push(['Energy', `${calories[1]} kcal`]);
  }

  const patterns = [
    ['Total fat', /(?:fat|grease)\s*:?[ ]*(\d+(?:\.\d+)?)\s*g/i],
    ['Saturated fat', /(?:of which saturated|saturated)\s*:?[ ]*(\d+(?:\.\d+)?)\s*g/i],
    ['Carbohydrates', /(?:carbohydrates|hydrates)\s*:?[ ]*(\d+(?:\.\d+)?)\s*g/i],
    ['Sugars', /(?:of which sugars|sugars)\s*:?[ ]*(\d+(?:\.\d+)?)\s*g/i],
    ['Fiber', /(?:fiber|fibre)\s*:?[ ]*(\d+(?:\.\d+)?)\s*g/i],
    ['Protein', /protein\s*:?[ ]*(\d+(?:\.\d+)?)\s*g/i],
    ['Salt', /salt\s*:?[ ]*(\d+(?:\.\d+)?)\s*g/i]
  ];

  patterns.forEach(([label, pattern]) => {
    const match = text.match(pattern);
    if (match) facts.push([label, `${match[1]} g`]);
  });
  return facts;
}

function createMetaChip(text) {
  const chip = document.createElement('span');
  chip.textContent = text;
  return chip;
}

function renderNutritionSection(product) {
  const section = document.createElement('section');
  section.className = 'nutrition-panel';

  const heading = document.createElement('h3');
  heading.textContent = 'Nutrition facts';
  section.appendChild(heading);

  const table = document.createElement('table');
  table.className = 'nutrition-table';
  const tbody = document.createElement('tbody');
  const facts = extractNutritionFacts(product.description);

  if (facts.length) {
    facts.forEach(([label, value]) => {
      const row = document.createElement('tr');
      const header = document.createElement('th');
      const cell = document.createElement('td');
      header.scope = 'row';
      header.textContent = label;
      cell.textContent = value;
      row.append(header, cell);
      tbody.appendChild(row);
    });
  } else {
    const row = document.createElement('tr');
    const header = document.createElement('th');
    const cell = document.createElement('td');
    header.scope = 'row';
    header.textContent = 'Current values';
    cell.textContent = 'See the nutrition panel on the product packaging.';
    row.append(header, cell);
    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  section.appendChild(table);

  const note = document.createElement('p');
  note.className = 'nutrition-note';
  note.textContent = 'Packaging is the source of truth for serving size, ingredients, allergens, and current nutrition values.';
  section.appendChild(note);
  return section;
}

function displayProductDetails(product) {
  const container = document.getElementById('product-details-inner');
  const pageTitle = document.getElementById('product-page-title');
  if (!container) return;
  container.replaceChildren();
  if (pageTitle) pageTitle.textContent = clean(product.name) || 'Product details';
  document.title = `${clean(product.name) || 'Product Details'} | Target Food`;

  const article = document.createElement('article');
  article.className = 'product-detail';

  const media = document.createElement('div');
  media.className = 'product-detail__media';
  const image = document.createElement('img');
  image.src = product.image || 'images/favicon.png';
  image.alt = clean(product.name);
  image.addEventListener('error', () => { image.src = 'images/favicon.png'; }, { once: true });
  media.appendChild(image);

  const benefits = getBenefits(product);
  if (benefits.length) {
    const benefitList = document.createElement('div');
    benefitList.className = 'benefit-badges benefit-badges--detail';
    benefits.forEach((benefit) => {
      const badge = document.createElement('span');
      badge.textContent = benefit;
      benefitList.appendChild(badge);
    });
    media.appendChild(benefitList);
  }

  const content = document.createElement('div');
  content.className = 'product-detail__content';
  const eyebrow = document.createElement('span');
  eyebrow.className = 'pill';
  eyebrow.textContent = clean(product.subcategory) || clean(product.category) || 'Product';
  const heading = document.createElement('h2');
  heading.textContent = clean(product.name);
  const description = document.createElement('p');
  description.className = 'product-detail__description';
  description.textContent = clean(product.description) || 'Product information will be added soon.';
  content.append(eyebrow, heading, description);

  const meta = document.createElement('div');
  meta.className = 'company-card__meta';
  if (clean(product.category)) meta.appendChild(createMetaChip(clean(product.category)));
  if (clean(product.subcategory)) meta.appendChild(createMetaChip(clean(product.subcategory)));
  if (meta.children.length) content.appendChild(meta);

  if (targetsNutritionTable(product)) {
    content.appendChild(renderNutritionSection(product));
  }

  const backLink = document.createElement('a');
  backLink.className = 'btn btn--primary product-detail__back';
  backLink.href = 'products.html';
  backLink.textContent = 'Back to all products';
  content.appendChild(backLink);

  article.append(media, content);
  container.appendChild(article);
}

function displayError(message) {
  const container = document.getElementById('product-details-inner');
  if (!container) return;
  container.innerHTML = `<div class="catalog-message"><h3>Product unavailable</h3><p>${message}</p><a class="btn btn--primary" href="products.html">Back to products</a></div>`;
}

document.addEventListener('DOMContentLoaded', () => {
  if (!productId) {
    displayError('No product was selected.');
    return;
  }

  fetch(`${PRODUCT_API_BASE}${encodeURIComponent(productId)}`)
    .then((response) => {
      if (!response.ok) throw new Error(`Product request failed with ${response.status}`);
      return response.json();
    })
    .then(displayProductDetails)
    .catch((error) => {
      console.error('Product detail error:', error);
      displayError('Please return to the catalog and try again.');
    });
});
