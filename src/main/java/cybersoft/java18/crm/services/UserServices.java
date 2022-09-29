package cybersoft.java18.crm.services;

import cybersoft.java18.crm.model.UserModel;
import cybersoft.java18.crm.repository.UserRepository;

import java.util.List;

public class UserServices {
    private static UserServices INSTANCE = null;
    private UserRepository userRepository = new UserRepository();

    public static UserServices getInstance() {
        if(INSTANCE == null) {
            INSTANCE = new UserServices();
        }
        return INSTANCE;
    }

    // Lấy data và show ra (trả về)
    public List<UserModel> getAllUser() {
        return userRepository.getAllUser();
    }

    public Integer deleteUserById(String id) {
        return userRepository.deleteUser(id);
    }

    public Integer saveUser(String email, String password, String fullname, String roleId) {

        return userRepository.saveUser(email, password, fullname, roleId);
    }

    public Integer updateUserById(UserModel userModel){
        return  userRepository.updateUser(userModel);
    }
}
