INSERT INTO `reports_details_entity` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('POP ACTIVE PRODUCTS REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details_entity` (`report_id`) SELECT report_id from reports_details_entity where report_name = 'POP ACTIVE PRODUCTS REPORT';

update `reports_query_details_entity` set `query_detail`='SELECT item_number,item_name ,document_type ,(CASE WHEN is_static = 1 THEN ''static'' ELSE ''configurable'' END) AS static_configurable ,asset_url FROM eni.sku_item' , `datasource` = 'eni', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details_entity where report_name = 'POP ACTIVE PRODUCTS REPORT')