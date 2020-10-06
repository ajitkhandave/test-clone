package com.shutterfly.sbs.eni.reports.configuration;

import com.shutterfly.sbs.eni.reports.repositories.ExtendedRepositoryImpl;
import com.shutterfly.sbs.eni.reports.repositories.eni.model.ReportsDetails;
import com.shutterfly.sbs.eni.reports.repositories.eni.model.SkuItem;
import javax.sql.DataSource;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(basePackages = {"com.shutterfly.sbs.eni.reports.repositories.eni"},
    repositoryBaseClass = ExtendedRepositoryImpl.class,
    entityManagerFactoryRef = "eniEntityManagerFactory",
    transactionManagerRef= "eniTransactionManager")
public class ENIDataSourceConfiguration {

  @Bean
  @Primary
  @ConfigurationProperties("spring.datasource.eni")
  public DataSourceProperties eniDataSourceProperties() {
    return new DataSourceProperties();
  }

  @Bean
  @Primary
  @ConfigurationProperties("spring.datasource.eni.configuration")
  public DataSource eniDataSource() {
    return eniDataSourceProperties().initializeDataSourceBuilder()
        .type(BasicDataSource.class).build();
  }

  @Bean(name = "eniEntityManagerFactory")
  @Primary
  public LocalContainerEntityManagerFactoryBean eniEntityManagerFactory(
      EntityManagerFactoryBuilder builder) {
    return builder
        .dataSource(eniDataSource())
        .packages(SkuItem.class, ReportsDetails.class)
        .build();
  }

  @Bean
  public PlatformTransactionManager eniTransactionManager(
      final @Qualifier("eniEntityManagerFactory") LocalContainerEntityManagerFactoryBean eniEntityManagerFactory) {
    return new JpaTransactionManager(eniEntityManagerFactory.getObject());
  }

}
