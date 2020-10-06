package com.shutterfly.sbs.eni.reports.repositories.eni.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Defines an sku-item corresponding to platform sku entity.
 * @author Abhishek Bhuskute
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="sku_item",schema="eni")
@Builder
public class SkuItem implements Serializable {

    @Id
    @Column(name = "item_number")
    private String itemNumber;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "document_type")
    private String documentType;

    @Column(name = "static_configurable")
    private String staticConfigurable;

    @Column(name = "asset_url")
    private String assetUrl;

}
