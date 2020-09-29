package com.shutterfly.sbs.eni.reports.controllers;

import com.shutterfly.sbs.eni.reports.configuration.UIConfiguration;
import com.shutterfly.sbs.eni.reports.repositories.ReportQueryDetailsRepo;
import com.shutterfly.sbs.eni.reports.repositories.model.ReportsDetailsEntity;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/public/api")
@AllArgsConstructor
public class UIConfigController {

    private final ReportQueryDetailsRepo reportQueryDetailsRepo;
    private final UIConfiguration uiConfiguration;

    @GetMapping(path = "/ui-config/{appName}", produces = "application/json")
    public Object getConfigurations(@PathVariable String appName) {
        return uiConfiguration.getUi().get(appName);
    }

    @GetMapping(path = "/ui-config", produces = "application/json")
    public Object getConfigurations() {
        return uiConfiguration.getUi();
    }

    @GetMapping(path = "/reports-queries", produces = "application/json")
    public List<String> getAllReportQueries() {
        ReportsDetailsEntity result =  reportQueryDetailsRepo.findByReportName("POP ACTIVE PRODUCTS REPORT");
        List<String> queries = result.getQueryDetailsEntities().stream().map(reportsQueryDetailsEntity -> reportsQueryDetailsEntity.getQueryDetail()).collect(
            Collectors.toList());
        return queries;
    }
}
