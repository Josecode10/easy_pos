package com.easypos.model;

import java.math.BigDecimal;

import com.google.gson.annotations.SerializedName;

public class Product {
    // Attributes
	@SerializedName("ID_PRODUCTO")
    private int idProducto;
	
	@SerializedName("CATEGORIA_ID")
    private int categoriaId;
	
	@SerializedName("NOMBRE_CATEGORIA")
	private String nombreCategoria;
	
	@SerializedName("CODIGO_SKU")
    private String codigoSku;
	
	@SerializedName("NOMBRE_PRODUCTO")
    private String nombreProducto;
	
	@SerializedName("DESCRIPCION_PRODUCTO")
    private String descripcionProducto;
	
	@SerializedName("PRECIO_VENTA")
    private BigDecimal precioVenta;
	
	@SerializedName("PRECIO_COSTO")
    private BigDecimal precioCosto;
	
	@SerializedName("STOCK")
    private int stockActual;
	
	@SerializedName("STOCK_MIN")
    private int stockMin;
	
	// The Validation Method
	public boolean isValid() {
	    // 1. String Validation: SKU and Name cannot be null or just empty spaces
	    if (codigoSku == null || codigoSku.trim().isEmpty()) return false;
	    if (nombreProducto == null || nombreProducto.trim().isEmpty()) return false;

	    // 2. BigDecimal Validation: Use compareTo for objects. 
	    // val.compareTo(ZERO) < 0 means the value is negative.
	    if (precioVenta == null || precioVenta.compareTo(BigDecimal.ZERO) < 0) return false;
	    if (precioCosto == null || precioCosto.compareTo(BigDecimal.ZERO) < 0) return false;

	    // 3. Integer Validation: These are primitives, so they are never null, just check range.
	    if (stockActual < 0) return false;
	    if (stockMin < 0) return false;
	    
	    // Category ID must be a valid positive ID (assuming IDs start at 1)
	    if (categoriaId <= 0) return false;

	    // 4. Business Logic (Optional but recommended): 
	    // You usually don't want to sell something for less than it cost you!
	    if (precioVenta.compareTo(precioCosto) < 0) {
	        // You could allow this, but often it's a sign of a data entry error.
	        // For now, let's just allow it or add a console warning.
	    }
	    return true; // If all checks pass
	}
	
	public int getIdProducto() {
		return idProducto;
	}

	public void setIdProducto(int idProducto) {
		this.idProducto = idProducto;
	}
	
	// Getters and setters
	public int getCategoriaId() {
		return categoriaId;
	}

	public void setCategoriaId(int catagoriaId) {
		this.categoriaId = catagoriaId;
	}

	public String getCodigoSku() {
		return codigoSku;
	}

	public void setCodigoSku(String codigoSku) {
		this.codigoSku = codigoSku;
	}

	public String getNombreProducto() {
		return nombreProducto;
	}

	public void setNombreProducto(String nombreProducto) {
		this.nombreProducto = nombreProducto;
	}

	public String getDescripcionProducto() {
		return descripcionProducto;
	}

	public void setDescripcionProducto(String descripcionProducto) {
		this.descripcionProducto = descripcionProducto;
	}

	public BigDecimal getPrecioVenta() {
		return precioVenta;
	}

	public void setPrecioVenta(BigDecimal precioVenta) {
		this.precioVenta = precioVenta;
	}

	public BigDecimal getPrecioCosto() {
		return precioCosto;
	}

	public void setPrecioCosto(BigDecimal precioCosto) {
		this.precioCosto = precioCosto;
	}

	public int getStockActual() {
		return stockActual;
	}

	public void setStockActual(int stockActual) {
		this.stockActual = stockActual;
	}

	public int getStockMin() {
		return stockMin;
	}

	public void setStockMin(int stockMin) {
		this.stockMin = stockMin;
	}

	public String getNombreCategoria() {
		return nombreCategoria;
	}

	public void setNombreCategoria(String nombreCategoria) {
		this.nombreCategoria = nombreCategoria;
	}
	
}
