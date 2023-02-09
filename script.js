const productsList = document.getElementById("products-list");
const categoryInput = document.getElementById("select-category");
const ratingInput = document.getElementById("select-rating");
const titleInput = document.getElementById("title");
const orderByInput = document.getElementById("select-orderby");

function createProductDetail(tag, innerText, className) {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.innerHTML = innerText;
  return element;
}

function showProducts(products) {
  products.forEach((product) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("product-container");

    const imageElement = document.createElement("img");
    imageElement.classList.add("image");
    imageElement.src = product.image;

    const titleElement = createProductDetail(
      "p",
      `title: ${product.title}`,
      "title"
    );

    const descriptionElement = createProductDetail(
      "p",
      `description: ${product.description}`,
      "description"
    );

    const ratingElement = createProductDetail(
      "p",
      `rating: ${product.rating.rate}`,
      "rating"
    );

    productContainer.append(titleElement);
    productContainer.append(imageElement);
    productContainer.append(descriptionElement);
    productContainer.append(ratingElement);

    productsList.append(productContainer);
  });
}

function filteredProducts(products, category, title, rating, orderBy) {
  let finalFiltered = products.filter(
    (product) =>
      (category === "" ? true : product.category === category) &&
      (title === ""
        ? true
        : String(product.title).toLowerCase().includes(title)) &&
      (rating === "" ? true : product.rating.rate >= rating)
  );
  if (orderBy === "ascending") {
    finalFiltered.sort((a, b) => Number(a.rating.rate) - Number(b.rating.rate));
  } else if (orderBy === "descending") {
    finalFiltered.sort((a, b) => Number(b.rating.rate) - Number(a.rating.rate));
  }
  return finalFiltered;
}

async function fetchAPI() {
  const response = await fetch("https://fakestoreapi.com/products");
  const productData = await response.json();

  function updateProducts() {
    productsList.innerHTML = "";
    const updatedProduct = filteredProducts(
      productData,
      categoryInput.value,
      String(titleInput.value).toLowerCase().trim(),
      ratingInput.value,
      orderByInput.value
    );
    showProducts(updatedProduct);
  }

  categoryInput.addEventListener("input", updateProducts);

  ratingInput.addEventListener("input", updateProducts);

  orderByInput.addEventListener("input", updateProducts);

  titleInput.addEventListener("input", updateProducts);

  showProducts(productData);
}

fetchAPI();
