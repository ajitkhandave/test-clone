package com.shutterfly.sbs.eni.reports.repositories;

import com.shutterfly.sbs.eni.reports.repositories.model.SkuItem;
import java.util.List;
import java.util.Set;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * DAO for SkuItem repository entities.
 *
 * @author Abhishek Bhuskute
 */
@Repository
public interface SkuItemRepo extends JpaRepository<SkuItem, String> {

}
