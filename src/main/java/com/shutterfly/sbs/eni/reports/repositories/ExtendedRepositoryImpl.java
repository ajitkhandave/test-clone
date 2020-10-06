package com.shutterfly.sbs.eni.reports.repositories;

import java.io.Serializable;
import java.util.List;
import javax.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

public class ExtendedRepositoryImpl <T, ID extends Serializable>
    extends SimpleJpaRepository<T, ID> implements ExtendedRepository<T, ID> {

  @Autowired
  private EntityManager entityManager;

  public ExtendedRepositoryImpl(JpaEntityInformation<T, ?>
      entityInformation, EntityManager entityManager) {
    super(entityInformation, entityManager);
    this.entityManager = entityManager;
  }

  @Transactional
  public List<T> findWithQuery(String query, Object positionalParams[] , Class T) {

    return entityManager.createNativeQuery(
        query , T)
        .getResultList();

  }

}
