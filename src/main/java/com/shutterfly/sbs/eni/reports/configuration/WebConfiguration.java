package com.shutterfly.sbs.eni.reports.configuration;

import com.shutterfly.sbs.nextgen.security.config.AuthRestClient;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@RequiredArgsConstructor
public class WebConfiguration {
    private final AuthConfiguration authConfig;

    @Bean
    public AuthRestClient authRestClient() {
        final AuthRestClient.Properties properties = new AuthRestClient.Properties();
        properties.setGatewayBaseUrl(authConfig.getGatewayEndpoint());
        properties.setAppCode(authConfig.getAppCode());
        properties.setClientId(authConfig.getClientId());
        properties.setClientSecret(authConfig.getClientSecret());
        return new AuthRestClient(properties);
    }


    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("*")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS")
                        .exposedHeaders("Access-Control-Allow-Origin", "Content-Disposition", "Access-Control-Expose-Headers", "Access-Control-Allow-Headers", "Access-Control-Allow-Credentials")
                        .maxAge(3600);
            }
        };
    }

    @Configuration
    public class WebConfig implements WebMvcConfigurer {
        @Override
        public void addViewControllers(ViewControllerRegistry registry) {
            registry.addRedirectViewController("/", "/reports/");
        }
    }
}
