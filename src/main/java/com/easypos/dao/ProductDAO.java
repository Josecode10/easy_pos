package com.easypos.dao;

import com.easypos.model.Product;
import com.easypos.util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductDAO {
    public boolean insertProduct(Product product) {
        // Create the string will become an SQL statement
        String sql = "INSERT INTO producto (" +
                     "CATEGORIA_ID, CODIGO_SKU, NOMBRE_PRODUCTO, " +
                     "DESCRIPCION_PRODUCTO, PRECIO_VENTA, PRECIO_COSTO, " +
                     "STOCK, STOCK_MIN) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DBConnection.getConnection(); 
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, product.getCategoriaId());
            ps.setString(2, product.getCodigoSku());
            ps.setString(3, product.getNombreProducto());
            ps.setString(4, product.getDescripcionProducto());
            ps.setBigDecimal(5, product.getPrecioVenta());
            ps.setBigDecimal(6, product.getPrecioCosto());
            ps.setInt(7, product.getStockActual());
            ps.setInt(8, product.getStockMin());
            
            // Return true if at least one row was updated
            return ps.executeUpdate() > 0;
            
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
    public List<Product> getAllProducts() {
        List<Product> products = new ArrayList<>();
        // Join 'producto' with 'categoria' to get the name
        String sql = "SELECT p.*, c.NOMBRE_CATEGORIA " +
                     "FROM producto p " +
                     "INNER JOIN categoria c ON p.CATEGORIA_ID = c.CATEGORIA_ID";

        try (Connection conn = DBConnection.getConnection(); 
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Product p = new Product();
                p.setCodigoSku(rs.getString("CODIGO_SKU"));
                p.setNombreProducto(rs.getString("NOMBRE_PRODUCTO"));
                p.setPrecioVenta(rs.getBigDecimal("PRECIO_VENTA"));
                p.setStockActual(rs.getInt("STOCK"));
                // Map the joined name to our new attribute
                p.setNombreCategoria(rs.getString("NOMBRE_CATEGORIA")); 
                products.add(p);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return products;
    }
    
    public boolean updateProduct(Product product) {
        String sql = "UPDATE producto SET CATEGORIA_ID=?, NOMBRE_PRODUCTO=?, DESCRIPCION_PRODUCTO=?, " +
                     "PRECIO_VENTA=?, PRECIO_COSTO=?, STOCK=?, STOCK_MIN=? WHERE CODIGO_SKU=?";
        try (Connection conn = DBConnection.getConnection(); 
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, product.getCategoriaId());
            ps.setString(2, product.getNombreProducto());
            ps.setString(3, product.getDescripcionProducto());
            ps.setBigDecimal(4, product.getPrecioVenta());
            ps.setBigDecimal(5, product.getPrecioCosto());
            ps.setInt(6, product.getStockActual());
            ps.setInt(7, product.getStockMin());
            ps.setString(8, product.getCodigoSku()); // The identifier
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean deleteProduct(String sku) {
        String sql = "DELETE FROM producto WHERE CODIGO_SKU = ?";
        try (Connection conn = DBConnection.getConnection(); 
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, sku);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    
}