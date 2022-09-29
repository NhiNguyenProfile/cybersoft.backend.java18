package cybersoft.java18.crm.model;

import lombok.Data;

@Data
public class ResponseData {
    private int statusCode;
    private String message;
    private boolean isSuccess;
    private Object data;
}
