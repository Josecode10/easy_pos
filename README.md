# EasyPOS - Java Web Inventory Management

A robust, "Vanilla Java" Point of Sale inventory module built using Jakarta EE 10. This project demonstrates a deep understanding of core Java Web technologies without the abstraction of high-level frameworks like Spring.

## 🚀 Features
* **Full CRUD Operations:** Create, Read, Update, and Delete products seamlessly.
* **MVC Architecture:** Clear separation of concerns between Model, View, and Controller.
* **RESTful Communication:** Handles asynchronous data transmission via JSON and Fetch API.
* **Data Integrity:** Dual-layer validation (Frontend JavaScript & Backend Java logic).
* **Secure Persistence:** JDBC implementation with `PreparedStatement` to prevent SQL Injection.

## 🛠️ Tech Stack
* **Backend:** Java 21, Jakarta Servlets 6.0
* **Server:** Apache Tomcat 11
* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Database:** MySQL 8.0
* **Libraries:** Google Gson (JSON Serialization)
* **Build Tool:** Maven

## 🔧 Setup & Installation
1. **Clone the repository.**
2. **Database Setup:** Run the SQL script located in `src/main/resources/db/schema.sql`.
3. **Configuration:** Rename `src/main/resources/db.properties.example` to `db.properties` and enter your MySQL credentials.
4. **Build:** Run `mvn clean install` to generate the `.war` file.
5. **Deployment:** * Move the generated `easypos.war` to the Tomcat `webapps` folder.
   * Ensure your Tomcat instance has the `mysql-connector-j` dependency (provided via Maven in this project).

## 📡 API Endpoints (Internal)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/manageProduct` | Fetches all products in JSON format. |
| POST | `/manageProduct` | Creates a new product. |
| PUT | `/manageProduct` | Updates an existing product by SKU. |
| DELETE | `/manageProduct?sku=XYZ` | Deletes a product by SKU. |