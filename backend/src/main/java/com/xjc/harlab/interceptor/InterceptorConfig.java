package com.xjc.harlab.interceptor;

import jakarta.annotation.Resource;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {


    @Resource
    CORSInterceptor corsInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        List<String> includePathLists= new ArrayList<>();
        includePathLists.add("/**");//  拦截
        List<String> excludePathLists= new ArrayList<>();
        excludePathLists.add("/login");//  不拦截
        excludePathLists.add("/administrator/**");
        excludePathLists.add("/tag/**");
        excludePathLists.add("/error");
        registry.addInterceptor(corsInterceptor)
                .excludePathPatterns(excludePathLists);

    }

}