package com.shutterfly.sbs.eni.reports.repositories.model;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Defines an sku-item corresponding to platform sku entity.
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class ReportsQueryDetails {

  @Id
  @Column(name = "id")
  private Integer id;

  @Column(name = "report_id")
  private Integer reportId;

  @Column(name = "query_detail")
  private String queryDetail;

}
