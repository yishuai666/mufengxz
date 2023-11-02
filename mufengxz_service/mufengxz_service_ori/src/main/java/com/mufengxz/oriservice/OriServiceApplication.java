package com.mufengxz.oriservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
@EnableDiscoveryClient  //nacos注册
@EnableFeignClients
@ComponentScan(basePackages = {"com.mufengxz"})
public class OriServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(OriServiceApplication.class, args);
    }
}
