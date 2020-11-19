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
 * Defines an order-details corresponding to MPT Report.
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class MPTPerDayData implements Serializable  {
  @EmbeddedId
  private MPTPerDayIdentity identity;

  @Column(name = "order_count")
  private String orderCount;

  @Column(name = "kit_count")
  private String kitCount;

  @Column(name = "quantity")
  private String quantity;

}
