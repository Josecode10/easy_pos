package com.easypos.servlet;

import com.easypos.model.Product;
import com.easypos.dao.ProductDAO;
import com.google.gson.Gson;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.*;
import java.util.*;

@WebServlet("/addProduct") // This URL must match your JS fetch('addProduct')
public class ProductServlet extends HttpServlet {
    
    // Create one instance of Gson to reuse
    private final Gson gson = new Gson();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    	// 1. Set response type to JSON
    	response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");

        // 2. Read JSON from request and convert to Product object
        Product product = gson.fromJson(request.getReader(), Product.class);
        
        // Prepare a response object (Map is easiest for this)
        Map<String, Object> result = new HashMap<>();

        try {
            // 3. BACKEND VALIDATION: Use the new isValid() method
            if (product != null && product.isValid()) {
                
                ProductDAO dao = new ProductDAO();
                boolean success = dao.insertProduct(product);

                if (success) {
                    response.setStatus(HttpServletResponse.SC_OK); // 200
                    result.put("success", true);
                    result.put("message", "Product " + product.getNombreProducto() + " saved successfully!");
                } else {
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR); // 500
                    result.put("success", false);
                    result.put("message", "Database error: Could not save product.");
                }
                
            } else {
                // 4. VALIDATION FAILED
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST); // 400
                result.put("success", false);
                result.put("message", "Invalid data: Please check prices, stock, and SKU.");
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            result.put("success", false);
            result.put("message", "System Error: " + e.getMessage());
            e.printStackTrace();
        }

        // 5. Send the JSON response back to JavaScript
        response.getWriter().write(gson.toJson(result));
    }
    
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        ProductDAO dao = new ProductDAO();
        List<Product> list = dao.getAllProducts();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        // Send the list as JSON back to the browser
        response.getWriter().write(this.gson.toJson(list));
    }
    
}
