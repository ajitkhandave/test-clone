package com.shutterfly.sbs.eni.reports.services;

import com.shutterfly.sbs.eni.reports.configuration.RepositoryFactory;
import com.shutterfly.sbs.eni.reports.constants.ApplicationConstants;
import com.shutterfly.sbs.eni.reports.exception.RecordsNotFoundException;
import com.shutterfly.sbs.eni.reports.repositories.ExtendedRepository;
import com.shutterfly.sbs.eni.reports.repositories.ReportQueryDetailsRepo;
import com.shutterfly.sbs.eni.reports.repositories.model.ReportsDetails;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class ReportService {

  private final ReportQueryDetailsRepo reportQueryDetailsRepo;
  private final RepositoryFactory repositoryFactory;

  public List<String> getQueriesForReport(String reportName) {
    Optional<ReportsDetails> result = reportQueryDetailsRepo.findByReportName(reportName);
    if(result.isPresent()) {
      List<String> queries = result.get().getQueryDetailsEntities().stream()
          .map(reportsQueryDetailsEntity -> reportsQueryDetailsEntity.getQueryDetail()).collect(
              Collectors.toList());
      return queries;
    }
    else {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ApplicationConstants.NO_REPORT_FOUND);
    }

  }

  public List<Object> getAllActiveProducts(List<String> queries, String sourceRepository) throws RecordsNotFoundException {
    if (!CollectionUtils.isEmpty(queries) && queries.size() == 1) {
      ExtendedRepository extendedRepository = repositoryFactory.getRepository(sourceRepository);
      List<Object> skuItems = extendedRepository.findWithQuery(queries.get(0), null);
      if(!CollectionUtils.isEmpty(skuItems)) {
        return skuItems;
      } else {
        throw new RecordsNotFoundException(ApplicationConstants.NO_REPORT_DATA_FOUND);
      }
    } else {
      throw new RecordsNotFoundException(ApplicationConstants.NO_QUERY_FOR_REPORT);
    }
  }

}
