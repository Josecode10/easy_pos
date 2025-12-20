package com.easypos.model;

import com.google.gson.annotations.SerializedName;

public class Category {
    @SerializedName("CATEGORIA_ID")
    private int id;
    
    @SerializedName("NOMBRE_CATEGORIA")
    private String nombre;

    // Getters and setters
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

    
}
