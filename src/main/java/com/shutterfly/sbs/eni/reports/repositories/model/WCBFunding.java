package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Defines a model corresponding to Onboarding Dashboard Report
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class WCBFunding implements Serializable  {

  @Column(name = "orders_count")
  private String totalOrders;

  @EmbeddedId
  private WCBFundingIdentity identity;

  @Column(name = "quantity")
  private String total_quantity;


}
