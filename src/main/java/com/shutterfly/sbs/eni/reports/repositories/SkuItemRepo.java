package com.shutterfly.sbs.eni.reports.repositories;

import com.shutterfly.sbs.eni.reports.repositories.model.SkuItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * DAO for SkuItem repository entities.
 *
 * @author Anju Garg
 */
@Repository
public interface SkuItemRepo extends JpaRepository<SkuItem, String> {

}
