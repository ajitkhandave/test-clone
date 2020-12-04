INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ONBOARDING DASHBOARD WCB BY MONTH REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ONBOARDING DASHBOARD WCB BY MONTH REPORT';

update `reports_query_details` set `query_detail`='SELECT MONTH(po.order_date) AS order_month ,YEAR(po.order_date) AS order_year ,DATE(po.order_date) AS order_date ,COUNT(DISTINCT po.id) AS orders_count ,SUM(lic.quantity) AS total_quantity FROM ${schema}.platform_order po JOIN ${schema}.line_item li ON po.id = li.order_id JOIN ${schema}.line_item_component lic ON li.id = lic.line_item_id WHERE po.program_id = 3 AND li.customer_product_id LIKE ''%Welcome%'' AND li.customer_product_id LIKE ''%Configurable%'' AND (SELECT status FROM ${schema}.order_status WHERE id = po.order_status_id) IN (''ORDER_APPROVED'',''FAILED_SENT_TO_PRINTER'',''IN_PROCESS'',''SENT_TO_PRINTER'',''SHIPPED'') GROUP BY DATE(po.order_date)' , `datasource` = '${schema}', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details where report_name = 'ONBOARDING DASHBOARD WCB BY MONTH REPORT')
