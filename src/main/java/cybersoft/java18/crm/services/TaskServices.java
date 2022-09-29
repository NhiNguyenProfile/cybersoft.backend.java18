package cybersoft.java18.crm.services;

import cybersoft.java18.crm.model.TaskModel;
import cybersoft.java18.crm.repository.TaskRepository;

import java.util.List;

public class TaskServices {
    private static TaskServices INSTANCE = null;
    private TaskRepository taskRepository = new TaskRepository();

    public static TaskServices getInstance() {
        if(INSTANCE == null) {
            INSTANCE = new TaskServices();
        }
        return INSTANCE;
    }

    // Lấy data và show ra (trả về)
    public List<TaskModel> getAllTask() {
        return taskRepository.getAllTask();
    }

    public Integer deleteTaskById(String id) {
        return taskRepository.deleteTask(id);
    }

    public Integer saveTask(String task, String startDate, String endDate, String userId, String jobId, String statusId) {

        return taskRepository.saveTask(task,startDate,endDate,userId,jobId,statusId);
    }

    public Integer updateTaskById(String task, String startDate, String endDate, String userId, String jobId, String statusId, String id){
        return  taskRepository.updateTask(task,startDate,endDate,userId,jobId,statusId, id);
    }
}
