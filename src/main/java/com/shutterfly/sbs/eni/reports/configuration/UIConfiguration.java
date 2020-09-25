package com.shutterfly.sbs.eni.reports.configuration;

import java.util.Map;
import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "app")
public class UIConfiguration {
    private Map<String, Object> ui;
}
