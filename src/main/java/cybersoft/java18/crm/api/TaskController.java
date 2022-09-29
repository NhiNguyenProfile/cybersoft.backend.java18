package cybersoft.java18.crm.api;

import com.google.gson.Gson;
import cybersoft.java18.crm.model.TaskModel;
import cybersoft.java18.crm.model.ResponseData;
import cybersoft.java18.crm.services.TaskServices;
import cybersoft.java18.crm.utils.UrlUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "Task",urlPatterns = {UrlUtils.URL_TASK})
public class TaskController extends HttpServlet {
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
//       TaskModel TaskModel = new TaskModel();//Tạo ra một constant của TaskModel
//        TaskModel.setId(1);
//        TaskModel.setName("Nguyễn Ngọc Ý Nhi");
//        TaskModel.setDescription("Đây là mô tả về JSON");
        List<TaskModel> taskModels = TaskServices.getInstance().getAllTask();
        dataHandler.handleData(gson.toJson(taskModels), resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String task = req.getParameter("task");
        String startDate = req.getParameter("startDate");
        String endDate = req.getParameter("endDate");
        String userId = req.getParameter("userId");
        String jobId = req.getParameter("jobId");
        String statusId = req.getParameter("statusId");

        Integer result = TaskServices.getInstance().saveTask(task,startDate,endDate,userId,jobId,statusId);
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

        System.out.println("kiemtra do post "+ task);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        Integer result = TaskServices.getInstance().deleteTaskById(id);
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
//        BufferedReader br = new BufferedReader(req.getReader()); // Trong getReader có inputStream để đọc dữ liệu, Data được truyền ngầm sẽ lưu vào InputStream
//        StringBuilder builder = new StringBuilder();
//        String line;
//        while ((line = br.readLine()) != null) {
//            builder.append(line);
//        }
//        String data = builder.toString();
//
//        TaskModel taskModel = gson.fromJson(data, TaskModel.class);
        String task = req.getParameter("task");
        String startDate = req.getParameter("startDate");
        String endDate = req.getParameter("endDate");
        String userId = req.getParameter("userId");
        String jobId = req.getParameter("jobId");
        String statusId = req.getParameter("statusId");
        String id = req.getParameter("id");
        Integer result = TaskServices.getInstance().updateTaskById(task,startDate,endDate,userId,jobId,statusId, id);

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

        System.out.println("Kimetra do Put " + id + " - " + task);
    }
}
