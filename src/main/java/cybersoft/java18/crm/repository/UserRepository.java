package cybersoft.java18.crm.repository;

import cybersoft.java18.crm.model.UserModel;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class UserRepository extends AbstracRepository<UserModel> {
    public List<UserModel> getAllUser() {
        return excuteQuery((connection) -> {
            List<UserModel> userModels = new ArrayList<>();
            //PreparedStatement
            String query = "select * from users";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            // Lấy dữ liệu (ExcuteQuery)
            ResultSet resultSet = preparedStatement.executeQuery();
            while(resultSet.next()) { //Duyẻ̀t qua database
                UserModel userModel = new UserModel();
                userModel.setId(resultSet.getInt("id"));
                userModel.setEmail(resultSet.getString("email"));
                userModel.setPassword(resultSet.getString("password"));
                userModel.setFullname(resultSet.getString("fullname"));
                userModel.setRoleId(resultSet.getInt("role_id"));
                //sau khi duyệt xong thì thêm vào list
                userModels.add(userModel);
            }
            return userModels;
        });

    }

    public Integer deleteUser(String id) {
        return excuteSaveAndUpdate((connection) -> {
            String query = "delete from users where id = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1,id);

            return preparedStatement.executeUpdate();
        });
    }

    public Integer updateUser(UserModel userModel){
        return excuteSaveAndUpdate((connection) -> {
            String query = "update users set email=? ,password=? ,fullname=? ,role_id=? WHERE id=?";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1,userModel.getEmail());
            preparedStatement.setString(2,userModel.getPassword());
            preparedStatement.setString(3,userModel.getFullname());
            preparedStatement.setInt(4,userModel.getRoleId());
            preparedStatement.setInt(5,userModel.getId());

            return  preparedStatement.executeUpdate();
        });
    }

    public Integer saveUser(String email, String password, String fullname, String roleId){
        return excuteSaveAndUpdate((connection) -> {
            String query = "insert into users(email, password,fullname,role_id) values(?,?,?,?)";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1,email);
            preparedStatement.setString(2,password);
            preparedStatement.setString(3,fullname);
            preparedStatement.setString(4,roleId);

            return  preparedStatement.executeUpdate();
        });
    }
}
