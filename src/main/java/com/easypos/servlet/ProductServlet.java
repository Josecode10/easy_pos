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
        // 1. Read the JSON from the request body and convert to Product object
        // The ClassLoader and Gson will map fields like PRECIO_COSTO automatically
        Product product = gson.fromJson(request.getReader(), Product.class);

        // 2. Call the DAO to execute the SQL INSERT
        ProductDAO dao = new ProductDAO();
        boolean isSaved = dao.insertProduct(product);

        // 3. Prepare a Map for the JSON response
        Map<String, Object> jsonResponse = new HashMap<>();
        if (isSaved) {
            jsonResponse.put("success", true);
            jsonResponse.put("message", "Product " + product.getNombreProducto() + " was saved successfully!");
        } else {
            jsonResponse.put("success", false);
            jsonResponse.put("message", "Failed to save product. Check server logs.");
        }

        // 4. Send the JSON response back to the browser
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        PrintWriter out = response.getWriter();
        out.print(gson.toJson(jsonResponse));
        out.flush();
    }
}
