package com.shutterfly.sbs.eni.reports.repositories;

import java.io.Serializable;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.JpaEntityInformation;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.transaction.annotation.Transactional;

public class ExtendedRepositoryImpl <T, ID extends Serializable>
    extends SimpleJpaRepository<T, ID> implements ExtendedRepository<T, ID>  {

  @Autowired
  private EntityManager entityManager;

  public ExtendedRepositoryImpl(JpaEntityInformation<T, ?>
      entityInformation, EntityManager entityManager) {
    super(entityInformation, entityManager);
    this.entityManager = entityManager;
  }

  @Transactional
  public List<T> findByAttributeContainsText(String attributeName, String text) {
    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    CriteriaQuery<T> cQuery = builder.createQuery(getDomainClass());
    Root<T> root = cQuery.from(getDomainClass());
    cQuery
        .select(root)
        .where(builder
            .like(root.<String>get(attributeName), "%" + text + "%"));
    TypedQuery<T> query = entityManager.createQuery(cQuery);
    return query.getResultList();
  }

  @Transactional
  public T customFind(String whereClause, String text) {
    CriteriaBuilder builder = entityManager.getCriteriaBuilder();
    CriteriaQuery<T> cq = builder.createQuery(getDomainClass());
    Root<T> root = cq.from(getDomainClass());
    cq.select(root).where(builder
        .like(root.<String>get(whereClause), "%" + text + "%"));
    return entityManager.createQuery(cq).getSingleResult();
  }

  @Transactional
  public List<T> findWithQuery(String query, Object positionalParams[]) {

    return entityManager.createNativeQuery(
        query , getDomainClass())
        .getResultList();

  }

}
