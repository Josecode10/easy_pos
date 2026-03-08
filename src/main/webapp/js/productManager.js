/**
 * Product Manager Module
 * Handles inventory CRUD operations via Jakarta EE Servlets
 */

const ENDPOINTS = {
    PRODUCTS: 'manageProduct',
    CATEGORIES: 'getCategories'
};

let isEditMode = false;

// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    document.getElementById('productForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('loadProducts').addEventListener('click', loadProducts);
});

// --- API Logic ---

/**
 * Fetches categories and populates the select dropdown
 */
async function populateCategories() {
    const select = document.getElementById('catId');
    try {
        const response = await fetch(ENDPOINTS.CATEGORIES);
        const categories = await response.json();

        categories.forEach(cat => {
            const option = new Option(cat.NOMBRE_CATEGORIA, cat.CATEGORIA_ID);
            select.add(option);
        });
    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

/**
 * Orchestrates form submission for both CREATE (POST) and UPDATE (PUT)
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    const productData = getFormData();
    if (!validateProduct(productData)) return;

    try {
        const method = isEditMode ? 'PUT' : 'POST';
        const response = await fetch(ENDPOINTS.PRODUCTS, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Server Error");

        alert(`✅ ${result.message}`);
        resetForm();
        loadProducts();
    } catch (error) {
        console.error("Submission error:", error);
        alert(`🚨 ${error.message}`);
    }
}

/**
 * Retrieves all products and triggers table rendering
 */
async function loadProducts() {
    try {
        const response = await fetch(ENDPOINTS.PRODUCTS);
        const products = await response.json();
        renderProductTable(products);
    } catch (error) {
        console.error("Failed to load products:", error);
    }
}

/**
 * Deletes a product by SKU after user confirmation
 */
async function deleteProduct(sku) {
    if (!confirm(`Are you sure you want to delete SKU: ${sku}?`)) return;

    try {
        const response = await fetch(`${ENDPOINTS.PRODUCTS}?sku=${sku}`, { method: 'DELETE' });
        const result = await response.json();
        if (result.success) loadProducts();
    } catch (error) {
        console.error("Delete error:", error);
    }
}

// --- UI & Helper Functions ---

function getFormData() {
    return {
        CODIGO_SKU: document.getElementById('sku').value,
        NOMBRE_PRODUCTO: document.getElementById('nombre').value,
        DESCRIPCION_PRODUCTO: document.getElementById('desc').value,
        PRECIO_VENTA: parseFloat(document.getElementById('precioVenta').value),
        PRECIO_COSTO: parseFloat(document.getElementById('precioCosto').value),
        STOCK: parseInt(document.getElementById('stockActual').value),
        STOCK_MIN: parseInt(document.getElementById('stockMin').value),
        CATEGORIA_ID: parseInt(document.getElementById('catId').value)
    };
}

function validateProduct(data) {
    const fields = [data.PRECIO_VENTA, data.PRECIO_COSTO, data.STOCK, data.STOCK_MIN];
    if (fields.some(val => val < 0)) {
        alert("🚨 Error: Values cannot be negative.");
        return false;
    }
    return true;
}

function renderProductTable(products) {
    const table = document.getElementById('productTable');
    const tbody = document.getElementById('productTableBody');
    
    table.style.display = "table";
    tbody.innerHTML = products.map(p => `
        <tr>
            <td>${p.CODIGO_SKU}</td>
            <td>${p.NOMBRE_PRODUCTO}</td>
            <td>${p.NOMBRE_CATEGORIA}</td>
            <td>$${parseFloat(p.PRECIO_VENTA).toFixed(2)}</td>
            <td>${p.STOCK}</td>
            <td>
                <button class="btn-edit" onclick="prepareEdit('${p.CODIGO_SKU}', '${p.NOMBRE_PRODUCTO}', '${p.DESCRIPCION_PRODUCTO || ''}', ${p.PRECIO_VENTA}, ${p.PRECIO_COSTO}, ${p.STOCK}, ${p.STOCK_MIN}, ${p.CATEGORIA_ID})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct('${p.CODIGO_SKU}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function prepareEdit(sku, nombre, desc, pVenta, pCosto, stock, stockMin, catId) {
    isEditMode = true;

    document.getElementById('sku').value = sku;
    document.getElementById('sku').disabled = true;
    document.getElementById('nombre').value = nombre;
    document.getElementById('desc').value = desc;
    document.getElementById('precioVenta').value = pVenta;
    document.getElementById('precioCosto').value = pCosto;
    document.getElementById('stockActual').value = stock;
    document.getElementById('stockMin').value = stockMin;
    document.getElementById('catId').value = catId;

    const submitBtn = document.querySelector('#productForm .btn-primary');
    submitBtn.textContent = "Update Product";
    submitBtn.style.backgroundColor = "#f39c12";

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    isEditMode = false;
    const form = document.getElementById('productForm');
    form.reset();
    document.getElementById('sku').disabled = false;
    
    const submitBtn = form.querySelector('.btn-primary');
    submitBtn.textContent = "Add Product";
    submitBtn.style.backgroundColor = "";
}