package com.easypos.servlet;

import com.easypos.dao.CategoryDAO;
import com.easypos.model.Category;
import com.google.gson.Gson;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet("/getCategories")
public class CategoryServlet extends HttpServlet {
    private final Gson gson = new Gson();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        CategoryDAO dao = new CategoryDAO();
        List<Category> list = dao.getAllCategories();
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(this.gson.toJson(list));
    }
}