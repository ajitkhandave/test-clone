package com.shutterfly.sbs.eni.reports.configuration;

import com.shutterfly.sbs.eni.reports.repositories.platformorder.model.PlatformOrder;
import javax.sql.DataSource;
import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@EnableJpaRepositories(basePackages = "com.shutterfly.sbs.eni.reports.repositories.platformorder",
    entityManagerFactoryRef = "eniEntityManagerFactory",
    transactionManagerRef= "eniTransactionManager")
public class PlatformOrderDataSourceConfiguration {

  @Bean
  @ConfigurationProperties("spring.datasource.platformorder")
  public DataSourceProperties platformOrderDataSourceProperties() {
    return new DataSourceProperties();
  }

  @Bean
  @ConfigurationProperties("spring.datasource.platformorder.configuration")
  public DataSource platformOrderDataSource() {
    return platformOrderDataSourceProperties().initializeDataSourceBuilder()
        .type(BasicDataSource.class).build();
  }

  @Bean(name = "platformOrderEntityManagerFactory")
  public LocalContainerEntityManagerFactoryBean platformOrderEntityManagerFactory(
      EntityManagerFactoryBuilder builder) {
    return builder
        .dataSource(platformOrderDataSource())
        .packages(PlatformOrder.class)
        .build();
  }

  @Bean
  public PlatformTransactionManager platformOrderTransactionManager(
      final @Qualifier("platformOrderEntityManagerFactory") LocalContainerEntityManagerFactoryBean platformOrderEntityManagerFactory) {
    return new JpaTransactionManager(platformOrderEntityManagerFactory.getObject());
  }


}
