package cybersoft.java18.crm.api;

import com.google.gson.Gson;
import cybersoft.java18.crm.model.ResponseData;
import cybersoft.java18.crm.model.RoleModel;
import cybersoft.java18.crm.services.RoleServices;
import cybersoft.java18.crm.utils.UrlUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

//Đặt đường dẫn quy định ở urlPatterns
@WebServlet(name = "role",urlPatterns = {UrlUtils.URL_ROLE})
public class RoleController extends HttpServlet {

    private Gson gson = new Gson();
    static DataHandler dataHandler = new DataHandler();

    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Headers", "*");
        resp.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, HEAD, PUT, POST, DELETE");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        List<RoleModel> roleModels = RoleServices.getInstance().getAllRole();
        dataHandler.handleData(gson.toJson(roleModels), resp);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String role = req.getParameter("role");
        String description = req.getParameter("description");

        Integer result = RoleServices.getInstance().saveRole(role,description);
        ResponseData responseData = new ResponseData();

        if(result == 1) {
            responseData.setStatusCode(200);
            responseData.setSuccess(true);
            responseData.setMessage("add success");
        }else {
            responseData.setStatusCode(200);
            responseData.setSuccess(false);
            responseData.setMessage("add fail");
        }
        dataHandler.handleData(gson.toJson(responseData),resp);

        System.out.println("kiemtra do post "+role+" - "+description);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("Test doDelete");
        String id = req.getParameter("id");
        Integer result = RoleServices.getInstance().deleteRoleById(id);
        System.out.println("test doDelete " + result);

        ResponseData responseData = new ResponseData();
        if (result == 1) {
            // xóa thành công
            responseData.setStatusCode(200);
            responseData.setSuccess(true);
            responseData.setMessage("Xóa thành công!");
        } else {
            // xóa thất bại
            responseData.setStatusCode(200);
            responseData.setSuccess(false);
            responseData.setMessage("Xóa thất bại!");
        }
        dataHandler.handleData(gson.toJson(responseData), resp);
    }

    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        BufferedReader br = new BufferedReader(req.getReader()); // Trong getReader có inputStream để đọc dữ liệu, Data được truyền ngầm sẽ lưu vào InputStream
        StringBuilder builder = new StringBuilder();
        String line;
        while ((line = br.readLine()) != null) {
            builder.append(line);
        }
        String data = builder.toString();

        RoleModel roleModel = gson.fromJson(data, RoleModel.class);
        Integer result = RoleServices.getInstance().updateRoleById(roleModel);

        ResponseData responseData = new ResponseData();

        if (result == 1) {
            //Xoá thành công
            responseData.setStatusCode(200);
            responseData.setSuccess(true);
            responseData.setMessage("Cập nhật thành công !");
        } else {
            //Xoá thất bại
            responseData.setStatusCode(200);
            responseData.setSuccess(false);
            responseData.setMessage("Cập nhật thất bại !");
        }
        dataHandler.handleData(gson.toJson(responseData),resp);

        System.out.println("Kimetra do Put " + roleModel.getId() + " - " + roleModel.getName());
    }
}
