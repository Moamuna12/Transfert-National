package com.example.TN_Blocage_MS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;
@EnableDiscoveryClient
@SpringBootApplication
public class TnBlocageMsApplication {

	public static void main(String[] args) {
		SpringApplication.run(TnBlocageMsApplication.class, args);
	}

@LoadBalanced
@Bean
   public RestTemplate getRestTemplate() {
      return new RestTemplate();
   }
}
