package com.shutterfly.sbs.eni.reports.repositories;

import java.io.Serializable;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface ExtendedRepository<T, ID extends Serializable>
    extends JpaRepository<T, ID> {

  public List<T> findWithQuery(String query, String startDate, String endDate);
}