package cybersoft.java18.crm.model;

import lombok.Data;

import java.util.Date;

@Data
public class JobModel {
    private int id;
    private String job;
    private Date startDate;
    private Date endDate;
}
