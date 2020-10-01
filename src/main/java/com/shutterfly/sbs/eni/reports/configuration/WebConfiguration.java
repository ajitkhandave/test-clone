package com.shutterfly.sbs.eni.reports.configuration;

import com.shutterfly.sbs.eni.reports.converters.ReportControllerParamConverter;
import com.shutterfly.sbs.eni.reports.repositories.ExtendedRepositoryImpl;
import com.shutterfly.sbs.nextgen.security.config.AuthRestClient;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.config.ServiceLocatorFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
@EnableJpaRepositories(basePackages = "com.shutterfly.sbs.eni.reports.repositories",
    repositoryBaseClass = ExtendedRepositoryImpl.class)
@RequiredArgsConstructor
public class WebConfiguration {
    private final AuthConfiguration authConfig;

    @Bean
    public ServiceLocatorFactoryBean serviceLocatorBean(){
        ServiceLocatorFactoryBean bean = new ServiceLocatorFactoryBean();
        bean.setServiceLocatorInterface(RepositoryFactory.class);
        return bean;
    }

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

        @Override
        public void addFormatters(FormatterRegistry registry) {
            registry.addConverter(new ReportControllerParamConverter());
        }

    }
}
