package com.shutterfly.sbs.eni.reports.controllers;

import com.shutterfly.sbs.eni.reports.configuration.RepositoryFactory;
import com.shutterfly.sbs.eni.reports.models.dto.ReportNames;
import com.shutterfly.sbs.eni.reports.repositories.eni.ReportQueryDetailsRepo;
import com.shutterfly.sbs.eni.reports.repositories.eni.SkuItemRepo;
import com.shutterfly.sbs.eni.reports.repositories.eni.model.ReportsDetails;
import com.shutterfly.sbs.eni.reports.repositories.eni.model.SkuItem;
import com.shutterfly.sbs.eni.reports.repositories.platformorder.PlatformOrder;
import com.shutterfly.sbs.eni.reports.repositories.platformorder.PlatformOrderRepo;
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
  private final PlatformOrderRepo platformOrderRepo;

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

  @ApiOperation(value = "", authorizations = { @Authorization(value="Authorization") })
  @GetMapping(path = "/fetchOrders/{reportName}", produces = "application/json")
  public List<PlatformOrder> getProductsfFromPlatformOrder(@PathVariable ReportNames reportName) {
    ReportsDetails result = reportQueryDetailsRepo.findByReportName(reportName.getName());
    List<String> queries = result.getQueryDetailsEntities().stream()
        .map(reportsQueryDetailsEntity -> reportsQueryDetailsEntity.getQueryDetail()).collect(
            Collectors.toList());
    List<PlatformOrder> orders = platformOrderRepo.findWithQuery(queries.get(0), null, PlatformOrder.class);
    return orders;
  }

}
