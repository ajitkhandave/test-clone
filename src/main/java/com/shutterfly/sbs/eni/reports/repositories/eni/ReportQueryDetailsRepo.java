package com.shutterfly.sbs.eni.reports.repositories.eni;

import com.shutterfly.sbs.eni.reports.repositories.ExtendedRepository;
import com.shutterfly.sbs.eni.reports.repositories.eni.model.ReportsDetails;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "Fetch Query Details By Report Name Controller", path = "fetchQueryByName")
public interface ReportQueryDetailsRepo extends ExtendedRepository<ReportsDetails, Integer> {

  ReportsDetails findByReportName(@Param("reportName") String reportName);

}
