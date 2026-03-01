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

@WebServlet("/manageProduct") 
public class ProductServlet extends HttpServlet {
    
    private final Gson gson = new Gson();

    // CREATE: Handles saving a brand new product
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        setupResponse(response);
        Product product = gson.fromJson(request.getReader(), Product.class);
        Map<String, Object> result = new HashMap<>();

        try {
            if (product != null && product.isValid()) {
                ProductDAO dao = new ProductDAO();
                boolean success = dao.insertProduct(product);

                if (success) {
                    response.setStatus(HttpServletResponse.SC_OK);
                    result.put("success", true);
                    result.put("message", "Product " + product.getNombreProducto() + " saved successfully!");
                } else {
                    // This is where your previous error message came from
                    response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                    result.put("success", false);
                    result.put("message", "Database error: Could not save product. Check if SKU already exists.");
                }
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                result.put("success", false);
                result.put("message", "Invalid data: Please check prices and stock.");
            }
        } catch (Exception e) {
            sendError(response, result, e);
        }
        response.getWriter().write(gson.toJson(result));
    }

    // READ: Handles fetching the list of products
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        setupResponse(response);
        ProductDAO dao = new ProductDAO();
        List<Product> list = dao.getAllProducts();
        response.getWriter().write(this.gson.toJson(list));
    }

    // UPDATE: Handles updating an existing product
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws IOException {
        setupResponse(response);
        Product product = gson.fromJson(request.getReader(), Product.class);
        Map<String, Object> result = new HashMap<>();

        try {
            if (product != null && product.isValid()) {
                ProductDAO dao = new ProductDAO();
                boolean success = dao.updateProduct(product); // Ensure this method exists in ProductDAO

                if (success) {
                    result.put("success", true);
                    result.put("message", "Product updated successfully!");
                } else {
                    response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                    result.put("success", false);
                    result.put("message", "Update failed: Product not found.");
                }
            }
        } catch (Exception e) {
            sendError(response, result, e);
        }
        response.getWriter().write(gson.toJson(result));
    }

    // DELETE: Handles removing a product via SKU
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws IOException {
        setupResponse(response);
        String sku = request.getParameter("sku");
        Map<String, Object> result = new HashMap<>();

        if (sku != null && !sku.isEmpty()) {
            ProductDAO dao = new ProductDAO();
            boolean success = dao.deleteProduct(sku); // Ensure this method exists in ProductDAO
            result.put("success", success);
            result.put("message", success ? "Product deleted." : "Delete failed.");
        }
        
        response.getWriter().write(gson.toJson(result));
    }

    // Helper to keep code DRY (Don't Repeat Yourself)
    private void setupResponse(HttpServletResponse response) {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
    }

    private void sendError(HttpServletResponse response, Map<String, Object> result, Exception e) {
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        result.put("success", false);
        result.put("message", "System Error: " + e.getMessage());
        e.printStackTrace();
    }
}
