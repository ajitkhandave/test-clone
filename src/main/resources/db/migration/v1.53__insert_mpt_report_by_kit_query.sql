INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MPT__REPORT_ORDER_COUNTS_BY_KIT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MPT__REPORT_ORDER_COUNTS_BY_KIT';

update `reports_query_details` set `query_detail`='SELECT TRIM(li.customer_product_id) AS product_name ,CASE WHEN ( TRIM(pv.print_vendor) ) IS NULL THEN '''' ELSE TRIM(pv.print_vendor) END AS print_vendor ,DATE(po.order_date) AS order_date, COUNT(DISTINCT po.id) AS order_count ,COUNT(DISTINCT li.id) AS kit_count ,SUM(li.quantity) AS quantity FROM ${schema}.platform_order po JOIN ${schema}.line_item li ON po.id = li.order_id LEFT JOIN ${schema}.print_vendor pv ON pv.id = li.print_vendor WHERE po.program_id = 3 AND LOWER(li.customer_product_id) LIKE ''%kit%'' GROUP BY DATE(po.order_date),TRIM(li.customer_product_id) ,CASE WHEN ( TRIM(pv.print_vendor) ) IS NULL THEN '''' ELSE TRIM(pv.print_vendor) END' , `datasource` = '${schema}', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details where report_name = 'MPT__REPORT_ORDER_COUNTS_BY_KIT')
