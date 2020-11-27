package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created by angarg on 18/6/19.
 */
@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SkuInformationIdentity implements Serializable  {

  @Column(name = "customer_sku")
  private String customer_sku;

  @Column(name = "product_name")
  private String productName;

  @Column(name = "size")
  private String size;

  @Column(name = "finish")
  private String finish;

}
