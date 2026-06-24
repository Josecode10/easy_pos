/**
 * Product API Module
 * Handles all fetch requests to Jakarta EE Servlets
 */

var ENDPOINTS = {
    PRODUCTS: 'manageProduct',
    CATEGORIES: 'getCategories'
};

/**
 * Fetches categories from the server
 * @returns {Promise} Promise that resolves to array of categories
 */
function fetchCategories() {
    return fetch(ENDPOINTS.CATEGORIES)
        .then(function(response) {
            return response.json();
        })
        .catch(function(error) {
            console.error("Error fetching categories:", error);
            throw error;
        });
}

/**
 * Populates the category select dropdown with server data
 */
function populateCategories() {
    var select = document.getElementById('catId');
    fetchCategories()
        .then(function(categories) {
            categories.forEach(function(cat) {
                var option = new Option(cat.NOMBRE_CATEGORIA, cat.CATEGORIA_ID);
                select.add(option);
            });
        })
        .catch(function(error) {
            console.error("Failed to populate categories:", error);
        });
}

/**
 * Fetches all products from the server
 * @returns {Promise} Promise that resolves to array of products
 */
function fetchProducts() {
    return fetch(ENDPOINTS.PRODUCTS)
        .then(function(response) {
            return response.json();
        })
        .catch(function(error) {
            console.error("Error fetching products:", error);
            throw error;
        });
}

/**
 * Submits a product (CREATE or UPDATE) to the server
 * @param {Object} productData - Product object with CODIGO_SKU, NOMBRE_PRODUCTO, etc.
 * @param {string} method - 'POST' for create, 'PUT' for update
 * @returns {Promise} Promise that resolves to server response
 */
function submitProduct(productData, method) {
    return fetch(ENDPOINTS.PRODUCTS, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
    })
    .then(function(response) {
        return response.json().then(function(result) {
            if (!response.ok) throw new Error(result.message || "Server Error");
            return result;
        });
    })
    .catch(function(error) {
        console.error("Error submitting product:", error);
        throw error;
    });
}

/**
 * Deletes a product by SKU
 * @param {string} sku - Product SKU code
 * @returns {Promise} Promise that resolves to server response
 */
function deleteProductBySku(sku) {
    return fetch(ENDPOINTS.PRODUCTS + "?sku=" + sku, { method: 'DELETE' })
        .then(function(response) {
            return response.json();
        })
        .catch(function(error) {
            console.error("Error deleting product:", error);
            throw error;
        });
}
