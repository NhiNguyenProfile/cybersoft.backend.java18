package cybersoft.java18.crm.model;

import lombok.Data;
import java.util.Date;

@Data
public class TaskModel {
    private int id;
    private String task;
    private Date startDate;
    private Date endDate;
    private int userId;
    private int jobId;
    private int statusId;


}


