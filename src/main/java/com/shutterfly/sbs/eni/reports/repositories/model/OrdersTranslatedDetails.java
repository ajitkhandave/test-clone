package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Defines a model corresponding to Orders Translated
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder

public class OrdersTranslatedDetails implements Serializable  {

  @Id
  @Column(name = "tranlation_header")
  private String translationHeader;

  @Column(name = "order_count")
  private String orderCount;

  @Column(name = "printed")
  private String printed;

}
