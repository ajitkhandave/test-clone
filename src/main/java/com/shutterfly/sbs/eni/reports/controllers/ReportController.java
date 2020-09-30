package com.shutterfly.sbs.eni.reports.controllers;

import com.shutterfly.sbs.eni.reports.repositories.ReportQueryDetailsRepo;
import com.shutterfly.sbs.eni.reports.repositories.SkuItemRepo;
import com.shutterfly.sbs.eni.reports.repositories.model.ReportsDetails;
import com.shutterfly.sbs.eni.reports.repositories.model.SkuItem;
import java.util.List;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/eni")
@AllArgsConstructor
public class ReportController {

  private final ReportQueryDetailsRepo reportQueryDetailsRepo;
  private final SkuItemRepo skuItemRepo;

  @GetMapping(path = "/getQuery", produces = "application/json")
  public List<SkuItem> getAllSkuItems(@RequestParam String reportName) {
    ReportsDetails result =  reportQueryDetailsRepo.findByReportName(reportName);
    ReportsDetails reportResult = reportQueryDetailsRepo.customFind("reportName","POP ACTIVE PRODUCTS REPORT");
    List<String> queries = reportResult.getQueryDetailsEntities().stream().map(reportsQueryDetailsEntity -> reportsQueryDetailsEntity.getQueryDetail()).collect(
        Collectors.toList());
    List<SkuItem> skuItems = skuItemRepo.findWithQuery(queries.get(0),null);
    return skuItems;
  }

}
