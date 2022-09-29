package cybersoft.java18.crm.repository;

import cybersoft.java18.crm.model.TaskModel;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class TaskRepository extends AbstracRepository<TaskModel>{
    public List<TaskModel> getAllTask() {
        return excuteQuery((connection) -> {
            List<TaskModel> taskModels = new ArrayList<>();
            //PreparedStatement
            String query = "select * from tasks";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            // Lấy dữ liệu (ExcuteQuery)
            ResultSet resultSet = preparedStatement.executeQuery();
            while(resultSet.next()) { //Duyẻ̀t qua database
                TaskModel taskModel = new TaskModel();
                taskModel.setId(resultSet.getInt("id"));
                taskModel.setTask(resultSet.getString("name"));
                taskModel.setStartDate(resultSet.getDate("start_date"));
                taskModel.setEndDate(resultSet.getDate("end_date"));
                taskModel.setUserId(resultSet.getInt("user_id"));
                taskModel.setJobId(resultSet.getInt("job_id"));
                taskModel.setStatusId(resultSet.getInt("status_id"));
                //sau khi duyệt xong thì thêm vào list
                taskModels.add(taskModel);
            }
            return taskModels;
        });

    }

    public Integer deleteTask(String id) {
        return excuteSaveAndUpdate((connection) -> {
            String query = "delete from tasks where id = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1,id);

            return preparedStatement.executeUpdate();
        });
    }

    public Integer updateTask(String task, String startDate, String endDate, String userId, String jobId, String statusId, String id){
        return excuteSaveAndUpdate((connection) -> {
            String query = "update tasks set name=? ,start_date=?, end_date=?, user_id=?, job_id=?, status_id=? WHERE id=?";

            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1,task);
            preparedStatement.setString(2,startDate);
            preparedStatement.setString(3,endDate);
            preparedStatement.setString(4,userId);
            preparedStatement.setString(5,jobId);
            preparedStatement.setString(6,statusId);
            preparedStatement.setString(7,id);

            return  preparedStatement.executeUpdate();
        });
    }

    public Integer saveTask(String task, String startDate, String endDate, String userId, String jobId, String statusId){
        return excuteSaveAndUpdate((connection) -> {
            String query = "insert into tasks(name, start_date, end_date, user_id, job_id, status_id) values(?,?,?,?,?,?)";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1,task);
            preparedStatement.setString(2,startDate);
            preparedStatement.setString(3,endDate);
            preparedStatement.setString(4,userId);
            preparedStatement.setString(5,jobId);
            preparedStatement.setString(6,statusId);

            return  preparedStatement.executeUpdate();
        });
    }
}
