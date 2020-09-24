package com.shutterfly.sbs.eni.reports.configuration;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "app.security.auth")
public class AuthConfiguration {
    private String clientId;
    private String clientSecret;
    private String gatewayEndpoint;
    private String appCode;
    private int accessTokenCookieMaxAge;
    private int refreshTokenCookieMaxAge;
    private String issuer;
    private String cookieDomain;
}
