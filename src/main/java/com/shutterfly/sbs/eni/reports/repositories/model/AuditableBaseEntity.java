package com.shutterfly.sbs.eni.reports.repositories.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.EntityListeners;
import javax.persistence.MappedSuperclass;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

/**
 * Created by imteyaz on 8/11/16.
 *
 * <p>This class is deprecated due to mis-configuration, for a working implementation refer to
 * {@see com.shutterfly.eni.model.AuditableAbstractEntity}</p>
 * <p>We're leaving this class as is to prevent breaking previous functionality</p>
 *
 *
 */
@Deprecated
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class AuditableBaseEntity extends PersistableBaseEntity {

    @Column(name = "created_date")
    @CreatedDate
    @JsonSerialize(using = CustomDateSerializer.class)
    private Date createdDate;

    @LastModifiedDate
    @Column(name = "modified_date")
    @JsonSerialize(using = CustomDateSerializer.class)
    private Date modifiedDate;

    @CreatedBy
    @Column(name = "created_by", nullable = false)
    private String createdBy = "";

    @LastModifiedBy
    @Column(name = "modified_by", nullable = false)
    private String modifiedBy = "";


    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getModifiedDate() {
        return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
        this.modifiedDate = modifiedDate;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }
}
