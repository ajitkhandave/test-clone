package com.shutterfly.sbs.eni.reports.controllers;

import com.shutterfly.sbs.eni.reports.configuration.RepositoryFactory;
import com.shutterfly.sbs.eni.reports.models.dto.ReportNames;
import com.shutterfly.sbs.eni.reports.repositories.ReportQueryDetailsRepo;
import com.shutterfly.sbs.eni.reports.repositories.SkuItemRepo;
import com.shutterfly.sbs.eni.reports.repositories.model.ReportsDetails;
import com.shutterfly.sbs.eni.reports.repositories.model.SkuItem;
import java.util.List;
import java.util.stream.Collectors;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/eni")
@AllArgsConstructor
public class ReportController {

  private final ReportQueryDetailsRepo reportQueryDetailsRepo;
  private final RepositoryFactory repositoryFactory;
  private final SkuItemRepo skuItemRepo;

    @ApiOperation(value = "", authorizations = { @Authorization(value="Authorization") })
    @GetMapping(path = "/fetchReport/{reportName}", produces = "application/json")
  public List<SkuItem> getAllSkuItems(@PathVariable ReportNames reportName) {
      ReportsDetails result = reportQueryDetailsRepo.findByReportName(reportName.getName());
      List<String> queries = result.getQueryDetailsEntities().stream()
          .map(reportsQueryDetailsEntity -> reportsQueryDetailsEntity.getQueryDetail()).collect(
              Collectors.toList());
      List<SkuItem> skuItems = skuItemRepo.findWithQuery(queries.get(0), null, SkuItem.class);
      return skuItems;
  }

}
