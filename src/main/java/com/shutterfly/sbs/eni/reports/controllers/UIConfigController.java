package com.shutterfly.sbs.eni.reports.controllers;

import com.shutterfly.sbs.eni.reports.configuration.UIConfiguration;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/api")
@AllArgsConstructor
public class UIConfigController {

    private final UIConfiguration uiConfiguration;

    @GetMapping(path = "/ui-config/{appName}", produces = "application/json")
    public Object getConfigurations(@PathVariable String appName) {
        return uiConfiguration.getUi().get(appName);
    }

    @GetMapping(path = "/ui-config", produces = "application/json")
    public Object getConfigurations() {
        return uiConfiguration.getUi();
    }
}
