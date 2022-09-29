package cybersoft.java18.crm.repository;

import cybersoft.java18.crm.model.JobModel;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

public class JobRepository extends AbstracRepository<JobModel>{

    public List<JobModel> getAllJob() {
        return excuteQuery((connection) -> {
            List<JobModel> jobModels = new ArrayList<>();
            //PreparedStatement
            String query = "select * from jobs";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            // Lấy dữ liệu (ExcuteQuery)
            ResultSet resultSet = preparedStatement.executeQuery();
            while(resultSet.next()) { //Duyẻ̀t qua database
                JobModel jobModel = new JobModel();
                jobModel.setId(resultSet.getInt("id"));
                jobModel.setJob(resultSet.getString("name"));
                jobModel.setStartDate(resultSet.getDate("start_date"));
                jobModel.setEndDate(resultSet.getDate("end_date"));
                //sau khi duyệt xong thì thêm vào list
                jobModels.add(jobModel);
            }
            return jobModels;
        });

    }

    public Integer deleteJob(String id) {
        return excuteSaveAndUpdate((connection) -> {
            String query = "delete from jobs where id = ?";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1,id);

            return preparedStatement.executeUpdate();
        });
    }

    public Integer updateJob(String job, String startDate, String endDate, String id){
        return excuteSaveAndUpdate((connection) -> {
            String query = "update jobs set name=? ,start_date=?, end_date=? WHERE id=?";

            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1,job);
            preparedStatement.setString(2,startDate);
            preparedStatement.setString(3,endDate);
            preparedStatement.setString(4,id);

            return  preparedStatement.executeUpdate();
        });
    }

    public Integer saveJob(String job, String startDate, String endDate){
        return excuteSaveAndUpdate((connection) -> {
            String query = "insert into jobs(name, start_date, end_date) values(?,?,?)";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setString(1,job);
            preparedStatement.setString(2,startDate);
            preparedStatement.setString(3,endDate);

            return  preparedStatement.executeUpdate();
        });
    }
}
