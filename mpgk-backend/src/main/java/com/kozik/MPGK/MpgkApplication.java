package com.kozik.MPGK;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class MpgkApplication {

	public static void main(String[] args) {
		SpringApplication.run(MpgkApplication.class, args);
	}

}
