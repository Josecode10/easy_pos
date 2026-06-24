/**
 * Product Validator Module
 * Handles all product validation logic
 */

/**
 * Validates product data before submission
 * @param {Object} data - Product data object
 * @returns {boolean} True if valid, false otherwise
 */
function validateProduct(data) {
    var fields = [data.PRECIO_VENTA, data.PRECIO_COSTO, data.STOCK, data.STOCK_MIN];
    
    // Check if any numeric field is negative
    if (fields.some(function(val) { return val < 0; })) {
        alert("[ERROR] Values cannot be negative.");
        return false;
    }
    
    // Check if SKU is provided
    if (!data.CODIGO_SKU || data.CODIGO_SKU.trim() === '') {
        alert("[ERROR] SKU code is required.");
        return false;
    }
    
    // Check if product name is provided
    if (!data.NOMBRE_PRODUCTO || data.NOMBRE_PRODUCTO.trim() === '') {
        alert("[ERROR] Product name is required.");
        return false;
    }
    
    // Check if category is selected
    if (!data.CATEGORIA_ID || data.CATEGORIA_ID <= 0) {
        alert("[ERROR] Please select a valid category.");
        return false;
    }
    
    return true;
}
