package com.shutterfly.sbs.eni.reports.repositories;

import com.shutterfly.sbs.eni.reports.repositories.model.SkuItem;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

/**
 * DAO for SkuItem repository entities.
 *
 * @author Anju Garg
 */

@RepositoryRestResource(collectionResourceRel = "POP Active Products Controller", path = "activeProducts")
public interface SkuItemRepo extends ExtendedRepository<SkuItem, String> {

}
