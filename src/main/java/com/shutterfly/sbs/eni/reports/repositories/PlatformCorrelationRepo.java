package com.shutterfly.sbs.eni.reports.repositories;

import com.shutterfly.sbs.eni.reports.repositories.model.PlatformCorrelation;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * DAO for Platform Correlation repository entities.
 *
 * @author Anju Garg
 */

@RepositoryRestResource(collectionResourceRel = "Status Alert Repository", path = "statusAlertReport")
public interface PlatformCorrelationRepo extends ExtendedRepository<PlatformCorrelation, String> {

}
