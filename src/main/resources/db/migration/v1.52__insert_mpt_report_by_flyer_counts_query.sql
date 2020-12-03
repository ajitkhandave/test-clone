INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MPT__REPORT_ORDER_COUNTS_BY_FLYER_COUNTS', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MPT__REPORT_ORDER_COUNTS_BY_FLYER_COUNTS';

update `reports_query_details` set `query_detail`='SELECT TRIM(a.productName) AS product_name ,CASE WHEN ( TRIM(a.print_vendor) ) IS NULL THEN '''' ELSE TRIM(a.print_vendor) END AS print_vendor ,DATE(a.order_date) AS order_date ,COUNT(DISTINCT a.po_id) AS order_count ,COUNT(DISTINCT a.kit_li_id) AS kit_count ,SUM(a.quantity) AS quantity ,COUNT(DISTINCT a.tracking_number) AS shipments FROM ( SELECT (SELECT value FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'') AS productName ,pv.print_vendor ,po.id AS po_id ,po.order_date as order_date ,(CASE WHEN LOWER(li.customer_product_id) LIKE ''%kit%'' THEN li.id END) AS kit_li_id ,CAST((CASE WHEN (SELECT value FROM ${schema}.destination_property WHERE destination_id = d.id AND name = ''quantityOrdered'') IS NULL THEN lic.quantity ELSE (SELECT value FROM ${schema}.destination_property WHERE destination_id = d.id AND name = ''quantityOrdered'') END) AS UNSIGNED) AS quantity ,@trim_sku := LEFT(lic.customer_sku,LOCATE(''.'',lic.customer_sku)-1) AS trim_sku ,@lowerproductType := (SELECT LOWER(value) FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productType'') AS lowerproductType ,@lowerproductName := (SELECT LOWER(value) FROM ${schema}.line_item_component_custom_property WHERE line_item_component_id = lic.id AND NAME = ''productName'') AS lowerproductName ,@oestaticbrochure_identifier := (CASE WHEN (lic.customer_sku LIKE ''EI2090401%'' OR lic.customer_sku LIKE ''EI20295463%'') THEN 1 ELSE 0 END) AS oestaticbrochure_identifier ,@envelope_identifier := (CASE WHEN @lowerproductName LIKE ''%envelope%'' THEN 1 ELSE 0 END) AS envelope_identifier ,@folder_identifier := (CASE WHEN @lowerproductName LIKE ''%folder%'' THEN 1 ELSE 0 END) AS folder_identifier ,@placemat_identifier := (CASE WHEN (lic.customer_sku LIKE ''9144528%'' OR lic.customer_sku LIKE ''MT-1170047%'') THEN 1 ELSE 0 END) AS placemat_identifier ,@flier_identifier := (CASE WHEN @lowerproductType = ''static'' AND @envelope_identifier = 0 AND @folder_identifier = 0 AND @placemat_identifier = 0 THEN 1 ELSE 0 END) AS flier_identifier ,(SELECT TRIM(message) FROM ${schema}.tracking_status WHERE LEFT(TRIM(message),2) = ''1Z'' AND destination_id = d.id GROUP BY destination_id) AS tracking_number FROM ${schema}.platform_order po JOIN ${schema}.line_item li ON po.id = li.order_id JOIN ${schema}.line_item_component lic ON li.id = lic.line_item_id JOIN ${schema}.destination d ON d.line_item_id = li.id LEFT JOIN ${schema}.print_vendor pv ON pv.id = li.print_vendor WHERE po.program_id = 3 ) a WHERE a.flier_identifier = 1 GROUP BY a.order_date ,TRIM(a.productName) ,CASE WHEN ( TRIM(a.print_vendor) ) IS NULL THEN '''' ELSE TRIM(a.print_vendor) END' , `datasource` = '${schema}', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details where report_name = 'MPT__REPORT_ORDER_COUNTS_BY_FLYER_COUNTS')
