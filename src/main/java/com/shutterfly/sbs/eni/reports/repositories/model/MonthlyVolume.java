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
 * Defines a model corresponding to monthly volume report
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class MonthlyVolume implements Serializable {

  @EmbeddedId
  private MonthlyVolumeIdentity monthlyVolumeIdentity;

  @Column(name = "order_year")
  private String orderYear;

  @Column(name = "order_month")
  private String orderMonth;

  @Column(name = "Ordered_Qty")
  private String orderedQty;

  @Column(name = "Product_Name")
  private String productName;

  @Column(name = "Item_Revision_Number")
  private String itemRevisionNumber;

}
