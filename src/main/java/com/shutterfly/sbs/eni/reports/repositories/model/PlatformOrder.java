package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Defines a model corresponding to order status report, status alert report
 * @author Anju Garg
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class PlatformOrder implements Serializable {

  @Id
  @Column(name = "Platform_Order_ID")
  private Long platformOrderId;

  @Column(name="Client_Order_ID")
  private String clientOrderId;

  @Column(name="Need_By_Date")
  private String needByDate;

  @Column(name="Print_Vendor")
  private String printVendor;

  @Column(name="Destination_ID")
  private String destinationId;

  @Column(name = "Address_Id")
  private String addressId;

  @Column(name = "Address1")
  private String address1;

  @Column(name = "Address2")
  private String address2;

  @Column(name = "Address3")
  private String address3;

  @Column(name = "City")
  private String city;

  @Column(name = "State")
  private String state;

  @Column(name = "Zip_Code")
  private String zipCode;

  @Column(name= "SBS_Order_Id")
  private String sbsOrderId;

}
