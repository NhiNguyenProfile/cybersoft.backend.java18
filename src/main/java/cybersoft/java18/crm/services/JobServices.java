package cybersoft.java18.crm.services;


import cybersoft.java18.crm.model.JobModel;
import cybersoft.java18.crm.repository.JobRepository;


import java.util.List;

public class JobServices {
    private static JobServices INSTANCE = null;
    private JobRepository jobRepository = new JobRepository();

    public static JobServices getInstance() {
        if(INSTANCE == null) {
            INSTANCE = new JobServices();
        }
        return INSTANCE;
    }

    // Lấy data và show ra (trả về)
    public List<JobModel> getAllJob() {
        return jobRepository.getAllJob();
    }

    public Integer deleteJobById(String id) {
        return jobRepository.deleteJob(id);
    }

    public Integer saveJob(String job, String startDate, String endDate) {
        return jobRepository.saveJob(job, startDate, endDate);
    }

    public Integer updateJobById(String job, String startDate, String endDate, String id){
        return  jobRepository.updateJob(job, startDate, endDate, id);
    }

}
