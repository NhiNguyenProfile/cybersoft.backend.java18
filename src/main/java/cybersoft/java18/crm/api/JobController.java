package cybersoft.java18.crm.api;

import com.google.gson.Gson;
import cybersoft.java18.crm.model.ResponseData;
import cybersoft.java18.crm.model.JobModel;
import cybersoft.java18.crm.services.JobServices;
import cybersoft.java18.crm.utils.UrlUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "Job",urlPatterns = {UrlUtils.URL_JOB})
public class JobController extends HttpServlet {

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
//       JobModel JobModel = new JobModel();//Tạo ra một constant của JobModel
//        JobModel.setId(1);
//        JobModel.setName("Nguyễn Ngọc Ý Nhi");
//        JobModel.setDescription("Đây là mô tả về JSON");
        List<JobModel> jobModels = JobServices.getInstance().getAllJob();
        dataHandler.handleData(gson.toJson(jobModels), resp);

    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String job = req.getParameter("job");
        String startDate = req.getParameter("startDate");
        String endDate = req.getParameter("endDate");

        Integer result = JobServices.getInstance().saveJob(job, startDate, endDate);
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

        System.out.println("kiemtra do post "+ job);
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String id = req.getParameter("id");
        Integer result = JobServices.getInstance().deleteJobById(id);
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

        String job = req.getParameter("job");
        String startDate = req.getParameter("startDate");
        String endDate = req.getParameter("endDate");
        String id = req.getParameter("id");
        Integer result = JobServices.getInstance().updateJobById(job, startDate, endDate,id);

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

        System.out.println("Kimetra do Put " + id + " - " + job);
    }
}
