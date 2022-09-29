package cybersoft.java18.crm.api;

import com.google.gson.Gson;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class DataHandler {
    public void handleData(String json, HttpServletResponse resp) throws IOException {
        try {
            // biến một đối tượng về JSON => to , biến một JSON về đối tượng => from
            resp.setContentType("application/json");
            // Vì có Tiếng Việt nên phải encoding "UTF-8"
            resp.setCharacterEncoding("UTF-8");
            resp.addHeader("Access-Control-Allow-Origin", "*");
            PrintWriter printWriter = resp.getWriter(); //trả về màn hình
            printWriter.print(json);
            printWriter.flush(); // xóa sạch dữ liệu trong luồng xử lí
        } catch(Exception e) {
            throw new RuntimeException("Failed for changing Data to Json!");
        }

    }

}
