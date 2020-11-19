INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MPT_REPORT_ORDER_COUNTS_PER_DAY', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MPT_REPORT_ORDER_COUNTS_PER_DAY';

update `reports_query_details` set `query_detail`='SELECT DATE(po.order_date) AS order_date ,TRIM(pv.print_vendor) AS print_vendor ,COUNT(DISTINCT po.id) AS order_count ,COUNT(DISTINCT (CASE WHEN LOWER(li.customer_product_id) LIKE ''%kit%'' THEN li.id END)) AS kit_count ,SUM(lic.quantity) AS quantity FROM ${schema}.platform_order po JOIN ${schema}.line_item li ON po.id = li.order_id JOIN ${schema}.line_item_component lic ON li.id = lic.line_item_id LEFT JOIN ${schema}.print_vendor pv ON pv.id = li.print_vendor WHERE po.program_id = 3 GROUP BY DATE(po.order_date) ,TRIM(pv.print_vendor)' , `datasource` = '${schema}', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details where report_name = 'MPT_REPORT_ORDER_COUNTS_PER_DAY')
