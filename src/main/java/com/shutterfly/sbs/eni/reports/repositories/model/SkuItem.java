package com.shutterfly.sbs.eni.reports.repositories.model;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * Defines an sku-item corresponding to platform sku entity.
 * @author Abhishek Bhuskute
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
@Builder
public class SkuItem implements Serializable {

    @Id
    private String itemNumber;
    private String itemName;
    private String documentType;
    private boolean isStatic;
    private String assetUrl;

}
