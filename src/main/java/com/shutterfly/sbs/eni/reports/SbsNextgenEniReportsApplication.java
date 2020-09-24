package com.shutterfly.sbs.eni.reports;

import com.shutterfly.sbs.nextgen.security.annotation.EnableNextGenSecurity;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties
@EnableNextGenSecurity
@SpringBootApplication
public class SbsNextgenEniReportsApplication {

	public static void main(String[] args) {
		SpringApplication.run(SbsNextgenEniReportsApplication.class, args);
	}

}
