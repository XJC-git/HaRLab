package com.xjc.harlab.utils;

import com.alibaba.fastjson.JSONObject;
import jakarta.servlet.http.HttpServletRequest;


public class LogUtils {
    public static String HttpServletRequestToString(HttpServletRequest request){
        JSONObject tmp = new JSONObject();
        tmp.put("Host",request.getRemoteHost());
        tmp.put("Origin",request.getHeader("Origin"));
        tmp.put("TargetURL",request.getServletPath());
        return tmp.toString();
    }
}
