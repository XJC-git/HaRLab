package com.xjc.harlab.interceptor;

import jakarta.annotation.Resource;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Resource
    LoginIntercept loginIntercept;

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(loginIntercept)
                .addPathPatterns("/clinicians/**");
    }
}
