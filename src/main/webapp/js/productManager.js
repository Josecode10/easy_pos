/**
 * ============================================================
 * 1. UI INITIALIZATION & EVENT LISTENERS
 * ============================================================
 * These lines run as soon as the browser finishes reading the HTML.
 * This is the bridge between frontend and backend
 */

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

/**
 * Fetches the list of categories from the server and populates the dropdown menu.
 */
async function populateCategories() {
    const select = document.getElementById('catId');
    
    try {
        // Fetch data from the GetCategoriesServlet
        const response = await fetch('./getCategories');
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
    // Prevent the browser from refreshing the page (default form behavior)
    event.preventDefault();

    // Gather data from all input fields and store them in a single JavaScript Object
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

    // --- FRONTEND VALIDATION ---
    // Stop the process early if the user entered negative numbers
    if (productData.PRECIO_VENTA < 0 || productData.PRECIO_COSTO < 0) {
        alert("Error: Prices cannot be negative.");
        return; 
    }
    if (productData.STOCK < 0 || productData.STOCK_MIN < 0) {
        alert("Error: Stock levels cannot be negative.");
        return;
    }

    // --- SERVER COMMUNICATION ---
    try {
		// Helps you verify what’s being sent before the request is made
        console.log("Attempting to save to database:", productData);

		// HTTP POST request to ProductServlet
        const response = await fetch('addProduct', {
			
            method: 'POST', // tells the server this is a create action
            headers: { 'Content-Type': 'application/json' }, // Tells the server the body is JSON.
            body: JSON.stringify(productData) // Convert JS Object to JSON string
        });

        // Check if the server responded with an error (like 400 or 500)
        if (!response.ok) { // boolean that’s true if the status code is 200–299
            const errorData = await response.json();
            throw new Error(errorData.message || "Server Error");
        }

        // If successful, tell the user and clear the form fields
        const result = await response.json();
        alert("✅ " + result.message);
        document.getElementById('productForm').reset();

    } catch (error) {
        console.error("Connection Error:", error);
        alert("🚨 " + error.message);
    }
}

/**
 * Fetches all products from the server and displays them in the HTML table.
 */
async function loadProducts() {
    try {
        // Request the list of products (Standard GET request)
        const response = await fetch('addProduct'); 
        const products = await response.json();
        
        const table = document.getElementById('productTable');
        const tbody = document.getElementById('productTableBody');
        
        // 1. Clear any old rows currently in the table
        tbody.innerHTML = ""; 
        
        // 2. Make the table visible (it's hidden by default in CSS)
        table.style.display = "table"; 

        // 3. Loop through each product and build an HTML row
        products.forEach(p => {
            const row = `<tr>
                <td>${p.CODIGO_SKU}</td>
                <td>${p.NOMBRE_PRODUCTO}</td>
                <td>${p.NOMBRE_CATEGORIA}</td>
                <td>$${parseFloat(p.PRECIO_VENTA).toFixed(2)}</td>
                <td>${p.STOCK}</td>
            </tr>`;
            // Append the row to the table body
            tbody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error:", error);
        alert("Could not load products.");
    }
}