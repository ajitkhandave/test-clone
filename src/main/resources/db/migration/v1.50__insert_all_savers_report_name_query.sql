--- ALL SAVERS REPORT QUERY ALL IN ONE

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ALL SAVERS REPORTS', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ALL SAVERS REPORTS';