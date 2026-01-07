package com.easypos.util;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DBConnection {
	// Create a Properties object (Map) to handle 
	// the .properties file where the database data
	// is stored is pairs (key=value)
    private static final Properties props = new Properties();

    static {
        // Load the file using the ClassLoader
        try (InputStream input = DBConnection.class.getClassLoader().getResourceAsStream("db.properties")) {
            if (input == null) {
                System.err.println("Sorry, unable to find db.properties");
            } else {
                // Load the properties file
                props.load(input);
                // Pre-load the driver
                Class.forName("com.mysql.cj.jdbc.Driver");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(
            props.getProperty("db.url"),
            props.getProperty("db.user"),
            props.getProperty("db.password")
        );
    }
}
