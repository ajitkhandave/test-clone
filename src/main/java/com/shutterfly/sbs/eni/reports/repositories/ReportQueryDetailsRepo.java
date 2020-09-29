package com.shutterfly.sbs.eni.reports.repositories;

import com.shutterfly.sbs.eni.reports.repositories.model.ReportsDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "Fetch Query Details By Report Name Controller", path = "fetchQueryByName")
public interface ReportQueryDetailsRepo extends JpaRepository<ReportsDetailsEntity, String> {

  ReportsDetailsEntity findByReportName(@Param("reportName") String reportName);

}
