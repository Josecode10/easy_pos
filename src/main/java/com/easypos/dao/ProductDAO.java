package com.easypos.dao;

import com.easypos.model.Product;
import com.easypos.util.DBConnection;
import java.sql.*;

public class ProductDAO {
    public boolean insertProduct(Product product) {
        // Complete SQL matching your image schema
        String sql = "INSERT INTO producto (" +
                     "CATEGORIA_ID, CODIGO_SKU, NOMBRE_PRODUCTO, " +
                     "DESCRIPCION_PRODUCTO, PRECIO_VENTA, PRECIO_COSTO, " +
                     "STOCK_ACTUAL, STOCK_MIN) " +
                     "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        
        try (Connection conn = DBConnection.getConnection(); 
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, product.getCatagoriaId());
            ps.setString(2, product.getCodigoSku());
            ps.setString(3, product.getNombreProducto());
            ps.setString(4, product.getDescripcionProducto());
            ps.setBigDecimal(5, product.getPrecioVenta());
            ps.setBigDecimal(6, product.getPrecioCosto());
            ps.setInt(7, product.getStockActual());
            ps.setInt(8, product.getStockMin());
            
            return ps.executeUpdate() > 0;
            
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}