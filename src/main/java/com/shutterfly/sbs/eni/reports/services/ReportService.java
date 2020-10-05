package com.shutterfly.sbs.eni.reports.services;

import com.shutterfly.sbs.eni.reports.configuration.RepositoryFactory;
import com.shutterfly.sbs.eni.reports.exception.RecordsNotFoundException;
import com.shutterfly.sbs.eni.reports.repositories.ExtendedRepository;
import java.util.List;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

@Service
@AllArgsConstructor
public class ReportService {

  private final RepositoryFactory repositoryFactory;

  public List<Object> getAllActiveProducts(List<String> queries, String sourceRepository) throws RecordsNotFoundException {
    if (!CollectionUtils.isEmpty(queries) && queries.size() == 1) {
      ExtendedRepository extendedRepository = repositoryFactory.getRepository(sourceRepository);
      List<Object> skuItems = extendedRepository.findWithQuery(queries.get(0), null);
      if(!CollectionUtils.isEmpty(skuItems)) {
        return skuItems;
      } else {
        throw new RecordsNotFoundException("No Report Data Found");
      }
    } else {
      throw new RecordsNotFoundException("Query not found in Repository");
    }
  }

}
