package com.easypos.model;

import java.math.BigDecimal;

import com.google.gson.annotations.SerializedName;

public class Product {
    // Attributes
	@SerializedName("CATEGORIA_ID")
    private int catagoriaId;
	
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
	
	@SerializedName("STOCK_ACTUAL")
    private int stockActual;
	
	@SerializedName("STOCK_MIN")
    private int stockMin;

	public int getCatagoriaId() {
		return catagoriaId;
	}

	public void setCatagoriaId(int catagoriaId) {
		this.catagoriaId = catagoriaId;
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
    
}
