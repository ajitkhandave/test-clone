package com.shutterfly.sbs.eni.reports.repositories.eni.model;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class ReportsDetails {

  @Id
  @GeneratedValue
  @Column(name = "report_id")
  private Integer reportId;
  @Column(name = "report_name")
  private String reportName;
  @OneToMany(mappedBy = "reportId")
  private List<ReportsQueryDetails> queryDetailsEntities;

}
