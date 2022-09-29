package cybersoft.java18.crm.repository;

import cybersoft.java18.crm.jdbc.MysqlConnection;

import java.sql.Connection;
import java.util.List;

public abstract class AbstracRepository<T> {
    // Get All -> List Data
    protected List<T> excuteQuery(JdbcExcute<List<T>> process) {
        try {
            //Mở conection
            Connection connection = MysqlConnection.getConnection();
            // Lambda function
            return process.processor(connection);
        } catch(Exception e) {
            throw new RuntimeException("Error connect database"); // throw không cần phải return
        }
    }

    protected Integer excuteQueryToGetId(JdbcExcute<Integer> process) {
        try {
            //Mở conection
            Connection connection = MysqlConnection.getConnection();
            // Lambda function
            return process.processor(connection);
        } catch(Exception e) {
            throw new RuntimeException("Error connect database"); // throw không cần phải return
        }
    }

    protected Integer excuteSaveAndUpdate(JdbcExcute<Integer> process) {
        try {
            //Mở conection
            Connection connection = MysqlConnection.getConnection();
            // Lambda function
            return process.processor(connection);
        } catch(Exception e) {
            throw new RuntimeException("Error connect database"); // throw không cần phải return
        }
    }
}
