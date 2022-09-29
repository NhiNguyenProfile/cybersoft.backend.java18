package cybersoft.java18.crm.repository;

import cybersoft.java18.crm.model.StatusModel;
import cybersoft.java18.crm.model.StatusModel;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class StatusRepository extends AbstracRepository<StatusModel>{
    public List<StatusModel> getAllStatus() {
        return excuteQuery((connection) -> {
            List<StatusModel> statusModels = new ArrayList<>();
            //PreparedStatement
            String query = "select * from status";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            // Lấy dữ liệu (ExcuteQuery)
            ResultSet resultSet = preparedStatement.executeQuery();
            while(resultSet.next()) { //Duyẻ̀t qua database
                StatusModel statusModel = new StatusModel();
                statusModel.setId(resultSet.getInt("id"));
                statusModel.setStatus(resultSet.getString("name"));
                //sau khi duyệt xong thì thêm vào list
                statusModels.add(statusModel);
            }
            return statusModels;
        });

    }
}
