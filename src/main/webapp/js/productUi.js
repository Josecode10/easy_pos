/**
 * Product UI Module
 * Handles all DOM manipulation and user interface logic
 */

var isEditMode = false;

// --- Initialization ---

/**
 * Initializes the product form and loads initial data
 */
function initializeProductForm() {
    populateCategories();
    document.getElementById('productForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('loadProducts').addEventListener('click', loadProducts);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initializeProductForm);

// --- Form Submission & Loading ---

/**
 * Handles form submission for both CREATE (POST) and UPDATE (PUT)
 */
function handleFormSubmit(event) {
    event.preventDefault();

    var productData = getFormData();
    if (!validateProduct(productData)) return;

    var method = isEditMode ? 'PUT' : 'POST';
    submitProduct(productData, method)
        .then(function(result) {
            alert("[OK] " + result.message);
            resetForm();
            loadProducts();
        })
        .catch(function(error) {
            console.error("Submission error:", error);
            alert("[ERROR] " + error.message);
        });
}

/**
 * Loads all products and displays them in the table
 */
function loadProducts() {
    fetchProducts()
        .then(function(products) {
            renderProductTable(products);
        })
        .catch(function(error) {
            console.error("Failed to load products:", error);
            alert("[ERROR] Could not load products");
        });
}

// --- Table Rendering ---

/**
 * Renders the product table with data and attaches event listeners
 * @param {Array} products - Array of product objects
 */
function renderProductTable(products) {
    var table = document.getElementById('productTable');
    var tbody = document.getElementById('productTableBody');
    
    table.style.display = "table";
    
    // Build HTML table rows with data attributes
    var html = '';
    products.forEach(function(p) {
        var desc = (p.DESCRIPCION_PRODUCTO || '').replace(/"/g, '&quot;');
        html += '<tr>' +
                '<td>' + p.CODIGO_SKU + '</td>' +
                '<td>' + p.NOMBRE_PRODUCTO + '</td>' +
                '<td>' + p.NOMBRE_CATEGORIA + '</td>' +
                '<td>$' + parseFloat(p.PRECIO_VENTA).toFixed(2) + '</td>' +
                '<td>' + p.STOCK + '</td>' +
                '<td>' +
                '<button class="btn-edit" ' +
                'data-sku="' + p.CODIGO_SKU + '" ' +
                'data-nombre="' + p.NOMBRE_PRODUCTO + '" ' +
                'data-desc="' + desc + '" ' +
                'data-pventa="' + p.PRECIO_VENTA + '" ' +
                'data-pcosto="' + p.PRECIO_COSTO + '" ' +
                'data-stock="' + p.STOCK + '" ' +
                'data-stockmin="' + p.STOCK_MIN + '" ' +
                'data-catid="' + p.CATEGORIA_ID + '">' +
                'Edit' +
                '</button>' +
                '<button class="btn-delete" data-sku="' + p.CODIGO_SKU + '">Delete</button>' +
                '</td>' +
                '</tr>';
    });
    tbody.innerHTML = html;

    // Attach event listeners to Edit buttons
    var editButtons = tbody.querySelectorAll('.btn-edit');
    for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', function() {
            var d = this.dataset;
            prepareEdit(
                d.sku,
                d.nombre,
                d.desc,
                parseFloat(d.pventa),
                parseFloat(d.pcosto),
                parseInt(d.stock),
                parseInt(d.stockmin),
                parseInt(d.catid)
            );
        });
    }

    // Attach event listeners to Delete buttons
    var deleteButtons = tbody.querySelectorAll('.btn-delete');
    for (var j = 0; j < deleteButtons.length; j++) {
        deleteButtons[j].addEventListener('click', function() {
            handleDeleteClick(this.dataset.sku);
        });
    }
}

/**
 * Handles delete button click with confirmation
 * @param {string} sku - Product SKU to delete
 */
function handleDeleteClick(sku) {
    if (!confirm("Are you sure you want to delete SKU: " + sku + "?")) return;

    deleteProductBySku(sku)
        .then(function(result) {
            if (result.success) {
                loadProducts();
            }
        })
        .catch(function(error) {
            console.error("Delete error:", error);
            alert("[ERROR] " + error.message);
        });
}

// --- Form Data Handling ---

/**
 * Extracts form data and returns as product object
 * @returns {Object} Product data object
 */
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

/**
 * Prepares the form for editing an existing product
 * @param {string} sku - Product SKU
 * @param {string} nombre - Product name
 * @param {string} desc - Product description
 * @param {number} pVenta - Sale price
 * @param {number} pCosto - Cost price
 * @param {number} stock - Current stock
 * @param {number} stockMin - Minimum stock
 * @param {number} catId - Category ID
 */
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

    var submitBtn = document.querySelector('#productForm .btn-primary');
    submitBtn.textContent = "Update Product";
    submitBtn.style.backgroundColor = "#f39c12";

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Resets the form to its initial state for adding new products
 */
function resetForm() {
    isEditMode = false;
    var form = document.getElementById('productForm');
    form.reset();
    document.getElementById('sku').disabled = false;
    
    var submitBtn = form.querySelector('.btn-primary');
    submitBtn.textContent = "Add Product";
    submitBtn.style.backgroundColor = "";
}
