package com.kozik.MPGK;

import java.util.Arrays;
import java.util.List;

import com.google.common.collect.Lists;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.ParameterBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.schema.ModelRef;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.Parameter;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@EnableScheduling
@EnableSwagger2
@SpringBootApplication
public class MpgkApplication {

	@Bean
	BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public Docket get() {
		return new Docket(DocumentationType.SWAGGER_2).select().paths(PathSelectors.ant("/api/**")).build()
				.apiInfo(createApiInfo()).securitySchemes(Lists.newArrayList(apiKey()))
				.securityContexts(Arrays.asList(securityContext()));
	}

	private ApiInfo createApiInfo() {
		return new ApiInfoBuilder().title("MPGK API Documentation").version("1.0.0").build();
	}

	private ApiKey apiKey() {
		return new ApiKey("Bearer", "Authorization", "header");
	}

	private SecurityContext securityContext() {
		return SecurityContext.builder().securityReferences(defaultAuth()).forPaths(PathSelectors.any()).build();
	}

	private List<SecurityReference> defaultAuth() {
		AuthorizationScope authorizationScope = new AuthorizationScope("global", "accessEverything");
		AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
		authorizationScopes[0] = authorizationScope;
		return Arrays.asList(new SecurityReference("Bearer", authorizationScopes));
	}

	Parameter authHeader = new ParameterBuilder().parameterType("header").name("Authorization")
			.modelRef(new ModelRef("string")).build();

	public static void main(String[] args) {
		SpringApplication.run(MpgkApplication.class, args);
	}

}
