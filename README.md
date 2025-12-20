# EasyPOS - Java Web Inventory Management

A robust, "Vanilla Java" Point of Sale inventory module built using **Jakarta EE** specifications. This project demonstrates a deep understanding of core Java Web technologies without the abstraction of modern frameworks.

## 🚀 Features
- **MVC Architecture:** Clear separation of concerns between Model, View, and Controller.
- **RESTful Design:** Handles asynchronous data transmission via JSON and Fetch API.
- **Data Integrity:** Dual-layer validation (Frontend JavaScript & Backend Java logic).
- **Secure Persistence:** JDBC implementation with `PreparedStatement` to prevent SQL Injection.

## 🛠️ Tech Stack
- **Backend:** Java 21, Jakarta Servlets 6.0 (Tomcat 11)
- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Database:** MySQL 8.0
- **Libraries:** Google Gson (JSON Serialization)
- **Build Tool:** Maven

## 🔧 Setup & Installation
1. Clone the repository.
2. Run the SQL script located in `src/main/resources/db/schema.sql` to set up your database.
3. Rename `src/main/resources/db.properties.example` to `db.properties`.
4. Enter your local MySQL credentials in the newly renamed `db.properties`.
5. Deploy to a Tomcat 10+ server.
