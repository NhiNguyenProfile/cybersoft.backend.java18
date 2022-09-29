package cybersoft.java18.crm.services;

import cybersoft.java18.crm.model.StatusModel;
import cybersoft.java18.crm.repository.StatusRepository;

import java.util.List;

public class StatusServices {
    private static StatusServices INSTANCE = null;
    private StatusRepository statusRepository = new StatusRepository();

    public static StatusServices getInstance() {
        if(INSTANCE == null) {
            INSTANCE = new StatusServices();
        }
        return INSTANCE;
    }

    // Lấy data và show ra (trả về)
    public List<StatusModel> getAllStatus() {
        return statusRepository.getAllStatus();
    }
}
