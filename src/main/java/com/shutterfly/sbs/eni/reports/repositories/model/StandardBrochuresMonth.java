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
 * Defines a model corresponding to Online Dashboard Report
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class StandardBrochuresMonth implements Serializable {

  @Column(name = "orders_count")
  private String totalOrders;

  @Id
  @Column(name = "yearmonth")
  private String yearmonth;

  @Column(name = "order_month")
  private String order_month;

  @Column(name = "order_year")
  private String order_year;

  @Column(name = "total_quantity")
  private String total_quantity;

}
