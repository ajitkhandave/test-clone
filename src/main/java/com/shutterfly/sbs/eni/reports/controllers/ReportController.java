package com.shutterfly.sbs.eni.reports.controllers;

import com.shutterfly.sbs.eni.reports.exception.RecordsNotFoundException;
import com.shutterfly.sbs.eni.reports.models.dto.ErrorCodes;
import com.shutterfly.sbs.eni.reports.models.dto.ReportNames;
import com.shutterfly.sbs.eni.reports.repositories.ReportQueryDetailsRepo;
import com.shutterfly.sbs.eni.reports.repositories.model.ReportsDetails;
import com.shutterfly.sbs.eni.reports.services.ReportService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/eni")
@AllArgsConstructor
public class ReportController {

  private final ReportQueryDetailsRepo reportQueryDetailsRepo;
  private final ReportService reportService;


  @ApiOperation(value = "ENI Reports Data", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchReport/{reportName}", produces = "application/json")
  public List<Object> fetchReports(@PathVariable ReportNames reportName, @Nullable @RequestParam(value = "startDate", required = false) Optional<String> startDate, @Nullable @RequestParam(value = "endDate", required = false) Optional<String>  endDate ) {
    try {
      Optional<ReportsDetails> result = reportQueryDetailsRepo.findByReportName(reportName.getName());
      if(result.isPresent()) {
        List<String> queries = result.get().getQueryDetailsEntities().stream()
            .map(reportsQueryDetailsEntity -> reportsQueryDetailsEntity.getQueryDetail()).collect(
                Collectors.toList());
        return reportService.getAllActiveProducts(queries, reportName.getRepository());
      } else {
        throw new ResponseStatusException(HttpStatus.NOT_FOUND, ErrorCodes.NO_REPORT_FOUND.getMessage());
      }

    } catch(RecordsNotFoundException ex) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
    } catch(Exception ex) {
      throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", ex);
    }
  }

}
