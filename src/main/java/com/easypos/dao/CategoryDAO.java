package com.easypos.dao;

import com.easypos.model.Category;
import com.easypos.util.DBConnection;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CategoryDAO {
    
    public List<Category> getAllCategories() {
        List<Category> categories = new ArrayList<>();
        String sql = "SELECT CATEGORIA_ID, NOMBRE_CATEGORIA FROM categoria ORDER BY NOMBRE_CATEGORIA ASC";

        try (Connection con = DBConnection.getConnection();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                Category cat = new Category();
                cat.setId(rs.getInt("CATEGORIA_ID"));
                cat.setNombre(rs.getString("NOMBRE_CATEGORIA"));
                categories.add(cat);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return categories;
    }
}