package com.shutterfly.sbs.eni.reports.security.filters;

import com.shutterfly.sbs.eni.reports.configuration.AuthConfiguration;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

@Configuration
@RequiredArgsConstructor
public class FilterRegistration {

    private final AuthConfiguration authConfig;
    private final Environment environment;

    @Bean
    public FilterRegistrationBean<AuthPostProcessorFilter> authPostProcessorFilterRegistrationBean() {
        FilterRegistrationBean<AuthPostProcessorFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(authPostProcessorFilter());
        registrationBean.addUrlPatterns("/api/auth/sso", "/api/auth/authenticate", "/api/auth/refresh-token", "/saml/SSO");
        return registrationBean;
    }

    @Bean
    public FilterRegistrationBean<InvalidatePostProcessorFilter> invalidatePostProcessorFilterFilterRegistrationBean() {
        FilterRegistrationBean<InvalidatePostProcessorFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(invalidatePostProcessorFilter());
        registrationBean.addUrlPatterns("/api/auth/invalidate");
        return registrationBean;
    }

    private AuthPostProcessorFilter authPostProcessorFilter() {
        return new AuthPostProcessorFilter(authConfig, environment);
    }

    private InvalidatePostProcessorFilter invalidatePostProcessorFilter() {
        return new InvalidatePostProcessorFilter(authConfig);
    }
}
