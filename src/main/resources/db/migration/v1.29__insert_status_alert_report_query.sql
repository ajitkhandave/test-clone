INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('STATUS ALERT REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'STATUS ALERT REPORT';

update `reports_query_details` set `query_detail`='SELECT platform_order_id , sbs_order_id , correlation_id , status , destination_id , DATE(created_date) AS order_date, modified_date AS last_modified_date FROM EnI.platform_correlation' , `datasource` = 'eni', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details where report_name = 'STATUS ALERT REPORT')
