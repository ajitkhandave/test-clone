package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import javax.persistence.*;

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
public class MPTReportsData implements Serializable  {

  @Id
  @Column(name = "uuid")
  private String uuid;

  @Column(name = "client_order_id")
  private String clientOrderId;

  @Column(name = "order_date")
  private String orderDate;

  @Column(name = "order_need_by_date")
  private String orderNeedByDate;

  @Column(name = "po_id")
  private String platformOrderId;

  @Column(name = "sent_to_print_date")
  private String sentToPrintDate;

  @Column(name = "customer_product_id")
  private String customerProductId;

  @Column(name = "kit_y_n")
  private String isKit;

  @Column(name = "li_id")
  private String lineItemId;

  @Column(name = "status")
  private String status;

  @Column(name = "lic_id")
  private String lineItemComponentId;

  @Column(name = "component_number")
  private String componentNumber;

  @Column(name = "customer_sku")
  private String customerSku;

  @Column(name = "lic_quantity")
  private String quantity;

  @Column(name = "print_vendor")
  private String printVendor;

  @Column(name = "p3Segment")
  private String p3Segment;

  @Column(name = "userName")
  private String userName;

  @Column(name = "trim_sku")
  private String trim_sku;

  @Column(name = "product_name")
  private String productName;

  @Column(name = "product_type")
  private String productType;

  @Column(name = "lower_product_name")
  private String lowerProductName;

  @Column(name = "lower_product_type")
  private String lowerProductType;

  @Column(name = "oecb_identifier")
  private String oecbIdentifier;

  @Column(name = "placemat_identifier")
  private String placematIdentifier;

  @Column(name = "bensum_identifier")
  private String bensum_identifier;

  @Column(name = "allsaver_identifier")
  private String allsaver_identifier;

  @Column(name = "benatglace_identifier")
  private String benatglace_identifier;

  @Column(name = "sbc_identifier")
  private String sbcIdentifier;

  @Column(name = "oe_static_brochure_identifier")
  private String oeStaticBrochureIdentifier;

  @Column(name = "kit_identifier")
  private String kitIdentifier;

  @Column(name = "oecb_template")
  private String oecbTemplate;

  @Column(name = "envelope_identifier")
  private String envelopeIdentifier;

  @Column(name = "folder_identifier")
  private String folderIdentifier;

  @Column(name = "flier_identifier")
  private String flierIdentifier;

  @Column(name = "tracking_number")
  private String trackingNumber;

}
