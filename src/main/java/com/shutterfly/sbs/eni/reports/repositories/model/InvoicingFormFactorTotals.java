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
 * Defines a model corresponding to Invoicing Form Factors Total Information
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class InvoicingFormFactorTotals implements Serializable {

  @EmbeddedId
  private FormFactorTotalsIdentity identity;

  @Column(name = "quantity_ordered")
  private String quantityOrdered;
}
