/**
 * ============================================================
 * 1. UI INITIALIZATION & EVENT LISTENERS
 * ============================================================
 * These lines run as soon as the browser finishes reading the HTML.
 * This is the bridge between frontend and backend
 */

// Track which mode the form is in
let isEditMode = false;
let editingSku = null; // Stores the SKU of the product being edited

// Loads the categories into the <select> dropdown automatically on page load
populateCategories();

// Watches the Form: When the user clicks "Add Product", run the submission logic
document.getElementById('productForm').addEventListener('submit', handleFormSubmit);

// Watches the Button: When "Display All Products" is clicked, fetch and show the table
document.getElementById('loadProducts').addEventListener('click', loadProducts);


/**
 * ============================================================
 * 2. CORE LOGIC FUNCTIONS
 * ============================================================
 */

// Fetches the list of categories from the server and populates the dropdown menu //
async function populateCategories() {
    const select = document.getElementById('catId');
    
    try {
        // Fetch data from the GetCategoriesServlet
        const response = await fetch('getCategories');
		// Expects a JSON array
        const categories = await response.json();

        // Loop through each category and create a new <option> element
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat.CATEGORIA_ID;        // THe cat ID will be the option value
            option.textContent = cat.NOMBRE_CATEGORIA; // Text shown to user
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading categories:", error);
    }
}

/**
 * Handles the logic when a user submits the "Add New Product" form.
 */
async function handleFormSubmit(event) {
    // 1. Prevent page refresh
    event.preventDefault();

    // 2. Gather data
    const productData = {
        CODIGO_SKU: document.getElementById('sku').value,
        NOMBRE_PRODUCTO: document.getElementById('nombre').value,
        DESCRIPCION_PRODUCTO: document.getElementById('desc').value,
        PRECIO_VENTA: parseFloat(document.getElementById('precioVenta').value),
        PRECIO_COSTO: parseFloat(document.getElementById('precioCosto').value),
        STOCK: parseInt(document.getElementById('stockActual').value),
        STOCK_MIN: parseInt(document.getElementById('stockMin').value),
        CATEGORIA_ID: parseInt(document.getElementById('catId').value)
    };

    // 3. Frontend Validation
    if (productData.PRECIO_VENTA < 0 || productData.PRECIO_COSTO < 0 || 
        productData.STOCK < 0 || productData.STOCK_MIN < 0) {
        alert("🚨 Error: Values cannot be negative.");
        return;
    }

    // 4. Single Server Communication block
    try {
        // Determine method based on state
        const method = isEditMode ? 'PUT' : 'POST';
        
        console.log(`Attempting ${method} request:`, productData);

        const response = await fetch('manageProduct', {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });

        // Parse JSON once
        const result = await response.json();

        // Check for server-side errors (400, 500, etc.)
        if (!response.ok) {
            throw new Error(result.message || "Server Error");
        }

        // 5. Success Handling
        alert("✅ " + result.message);
        
        // Reset form and UI state
        resetForm(); 
        
        // Refresh the product list automatically
        loadProducts(); 

    } catch (error) {
        console.error("Connection/Server Error:", error);
        alert("🚨 " + error.message);
    }
}

/**
 * Fetches all products from the server and displays them in the HTML table.
 */
async function loadProducts() {
    try {
        const response = await fetch('manageProduct'); 
        const products = await response.json();
        
        const table = document.getElementById('productTable');
        const tbody = document.getElementById('productTableBody');
        tbody.innerHTML = ""; 
        table.style.display = "table"; 

        products.forEach(p => {
            // Create the row with two action buttons
            const row = `<tr>
                <td>${p.CODIGO_SKU}</td>
                <td>${p.NOMBRE_PRODUCTO}</td>
                <td>${p.NOMBRE_CATEGORIA}</td>
                <td>$${parseFloat(p.PRECIO_VENTA).toFixed(2)}</td>
                <td>${p.STOCK}</td>
                <td>
                    <button class="btn-edit" onclick="prepareEdit('${p.CODIGO_SKU}', '${p.NOMBRE_PRODUCTO}', '${p.DESCRIPCION_PRODUCTO || ''}', ${p.PRECIO_VENTA}, ${p.PRECIO_COSTO}, ${p.STOCK}, ${p.STOCK_MIN}, ${p.CATEGORIA_ID})">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct('${p.CODIGO_SKU}')">Delete</button>
                </td>
            </tr>`;
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

async function deleteProduct(sku) {
    if (confirm(`Are you sure you want to delete SKU: ${sku}?`)) {
        const resp = await fetch(`manageProduct?sku=${sku}`, { method: 'DELETE' });
        const result = await resp.json();
        if (result.success) loadProducts(); // Refresh table
    }
}

function prepareEdit(sku, nombre, desc, pVenta, pCosto, stock, stockMin, catId) {
    isEditMode = true;
    editingSku = sku;

    // Fill form fields
    document.getElementById('sku').value = sku;
    document.getElementById('sku').disabled = true; // SKU usually shouldn't be edited
    document.getElementById('nombre').value = nombre;
    document.getElementById('desc').value = desc;
    document.getElementById('precioVenta').value = pVenta;
    document.getElementById('precioCosto').value = pCosto;
    document.getElementById('stockActual').value = stock;
    document.getElementById('stockMin').value = stockMin;
    document.getElementById('catId').value = catId;

    // Change UI to reflect Edit Mode
    const submitBtn = document.querySelector('#productForm .btn-primary');
    submitBtn.textContent = "Update Product";
    submitBtn.style.backgroundColor = "#f39c12"; // Optional: Change color to orange

    // Scroll to the top so the user sees the form
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function resetForm() {
    isEditMode = false;
    editingSku = null;
    document.getElementById('productForm').reset();
    document.getElementById('sku').disabled = false;
    
    const submitBtn = document.querySelector('#productForm .btn-primary');
    submitBtn.textContent = "Add Product";
    submitBtn.style.backgroundColor = ""; // Reset to original CSS
}