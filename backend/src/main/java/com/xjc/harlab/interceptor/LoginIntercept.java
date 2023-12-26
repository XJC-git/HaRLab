package com.xjc.harlab.interceptor;

import com.xjc.harlab.anotation.Login;
import com.xjc.harlab.repository.CliniciansRepository;
import com.xjc.harlab.utils.EncryptionUtils;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.antlr.v4.runtime.misc.NotNull;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@Slf4j
public class LoginIntercept implements HandlerInterceptor {
    @Resource
    CliniciansRepository cliniciansRepository;

    @Override
    public boolean preHandle(@NotNull HttpServletRequest request, @NotNull HttpServletResponse response,
                             @NotNull Object handler){
        if (!(handler instanceof HandlerMethod method)) {
            return true;
        }
        String token = request.getHeader("Authorization");
        var login = method.getMethod().getAnnotation(Login.class);
        if(login!=null){
            if(EncryptionUtils.verifyToken(token)){
                return true;
            }
            else{
                response.setStatus(401);
                return false;
            }
        }
        return true;
    }
}
