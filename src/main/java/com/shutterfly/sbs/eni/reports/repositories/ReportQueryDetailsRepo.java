package com.shutterfly.sbs.eni.reports.repositories;

import com.shutterfly.sbs.eni.reports.repositories.model.ReportsDetails;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "Fetch Query Details By Report Name Controller", path = "fetchQueryByName")
public interface ReportQueryDetailsRepo extends ExtendedRepository<ReportsDetails, String> {

  ReportsDetails findByReportName(@Param("reportName") String reportName);

}
