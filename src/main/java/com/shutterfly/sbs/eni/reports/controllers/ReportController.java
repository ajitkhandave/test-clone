package com.shutterfly.sbs.eni.reports.controllers;


import com.shutterfly.sbs.eni.reports.exception.RecordsNotFoundException;
import com.shutterfly.sbs.eni.reports.repositories.model.ReportNames;
import com.shutterfly.sbs.eni.reports.repositories.model.StandardBrochuresEnum;
import com.shutterfly.sbs.eni.reports.services.ReportService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/eni")
@AllArgsConstructor
public class ReportController {


  private final ReportService reportService;


  @ApiOperation(value = "ENI Reports Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/{reportName}", produces = "application/json")
  public List<Object> fetchReports(@PathVariable ReportNames reportName, @Nullable @RequestParam(value = "startDate", required = false) Optional<String> startDate, @Nullable @RequestParam(value = "endDate", required = false) Optional<String>  endDate ) {
    try {
        List<String> queries = reportService.getQueriesForReport(reportName.getName());
        return reportService.getAllActiveProducts(queries, reportName.getRepository());
    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
  }

  @ApiOperation(value = "ENI Onboarding Dashbaord Reports Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/standardBrochures", produces = "application/json")
  public Map<String, List<Object>> fetchStandardBrochuresReport() {
    Map<String, List<Object>> standardBrochuresReport = new HashMap<String, List<Object>>();
    try {
      List<String> queries = reportService.getQueriesForReport(StandardBrochuresEnum.ONLINE_DASHBOARD_STANDARD_BROCHURES_BY_MONTH_REPORT.getName());
      List<Object> reportResult = reportService.getAllActiveProducts(queries, StandardBrochuresEnum.ONLINE_DASHBOARD_STANDARD_BROCHURES_BY_MONTH_REPORT.getRepository());
      standardBrochuresReport.put("BY_MONTH", reportResult);

      queries = reportService.getQueriesForReport(StandardBrochuresEnum.ONLINE_DASHBOARD_STANDARD_BROCHURES_BY_SEGMENT_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, StandardBrochuresEnum.ONLINE_DASHBOARD_STANDARD_BROCHURES_BY_SEGMENT_REPORT.getRepository());
      standardBrochuresReport.put("BY_SEGMENT", reportResult);

      queries = reportService.getQueriesForReport(StandardBrochuresEnum.ONLINE_DASHBOARD_STANDARD_BROCHURES_BY_PRODUCT_REPORT.getName());
      reportResult = reportService.getAllActiveProducts(queries, StandardBrochuresEnum.ONLINE_DASHBOARD_STANDARD_BROCHURES_BY_PRODUCT_REPORT.getRepository());
      standardBrochuresReport.put("BY_PRODUCT", reportResult);

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), ex);
    }
    return standardBrochuresReport;
  }

  @ApiOperation(value = "ENI Valid Connection", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(value = {"/validConnection"})
  public String valid(HttpServletResponse response) {
    return "Success";
  }

}
