package com.shutterfly.sbs.eni.reports.controllers;

import com.shutterfly.sbs.eni.reports.configuration.RepositoryFactory;
import com.shutterfly.sbs.eni.reports.models.dto.ReportNames;
import com.shutterfly.sbs.eni.reports.repositories.ExtendedRepository;
import com.shutterfly.sbs.eni.reports.repositories.ReportQueryDetailsRepo;
import com.shutterfly.sbs.eni.reports.repositories.model.ReportsDetails;
import com.shutterfly.sbs.eni.reports.repositories.model.SkuItem;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/eni")
@AllArgsConstructor
public class ReportController {

  private final ReportQueryDetailsRepo reportQueryDetailsRepo;
  private final RepositoryFactory repositoryFactory;

  @GetMapping(path = "/fetchReport/{reportName}", produces = "application/json")
  public List<SkuItem> getAllSkuItems(@PathVariable ReportNames reportName, @Nullable @RequestParam("startDate") Optional<String> startDate, @Nullable @RequestParam("endDate") Optional<String>  endDate ) {
      ReportsDetails result = reportQueryDetailsRepo.findByReportName(reportName.getName());
      ExtendedRepository extendedRepository = repositoryFactory.getRepository("skuItemRepo");
      List<String> queries = result.getQueryDetailsEntities().stream()
          .map(reportsQueryDetailsEntity -> reportsQueryDetailsEntity.getQueryDetail()).collect(
              Collectors.toList());
      List<SkuItem> skuItems = extendedRepository.findWithQuery(queries.get(0), null);
      return skuItems;
  }

}
