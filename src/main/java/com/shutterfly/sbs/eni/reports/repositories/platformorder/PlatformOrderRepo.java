package com.shutterfly.sbs.eni.reports.repositories.platformorder;

import com.shutterfly.sbs.eni.reports.repositories.ExtendedRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * DAO for Platform Order repository entities.
 *
 * @author Anju Garg
 */

@RepositoryRestResource(collectionResourceRel = "Platform Order Controller", path = "orderController")
public interface PlatformOrderRepo extends ExtendedRepository<PlatformOrder, String> {

}

