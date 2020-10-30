INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ONBOARDING DASHBOARD WCB BY PROGRAM REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ONBOARDING DASHBOARD WCB BY PROGRAM REPORT';

update `reports_query_details` set `query_detail`='SELECT  count(distinct b1.order_id) AS orders_count, b1.order_date as order_date, b1.title, b1.value2, SUM(b1.quantity) as quantity FROM ( SELECT b.po_id as order_id, b.order_date as order_date, b.yearmonth as yearmonth, b.customer_product_id, b.total_quantity AS quantity, REPLACE(( CASE WHEN LEFT(b.funding_type, 5) = ''https'' THEN REPLACE(SUBSTRING_INDEX(b.funding_type, ''/'', - 1), ''.jpg'', '''') ELSE SUBSTRING_INDEX(b.funding_type, ''_'', - 1) END ), ''%20'', ''_'') AS FundingType, REPLACE(( CASE WHEN LEFT(liccp.value, 5) = ''https'' THEN REPLACE(SUBSTRING_INDEX(liccp.value, ''/'', - 1), ''.jpg'', '''') ELSE SUBSTRING_INDEX(liccp.value, ''_'', - 1) END ), ''%20'', ''_'') AS value2, ( CASE WHEN liccp.name = ''sku'' THEN ''Sku Code'' WHEN liccp.name = ''TEMPLATE_Cover_Image'' THEN ''Cover'' WHEN liccp.name = ''TEMPLATE_Company_Name'' THEN ''Company Name'' WHEN liccp.name = ''TEMPLATE_DS_Mod_1'' THEN ''Decision Support'' WHEN liccp.name = ''TEMPLATE_DS_Mod_2'' THEN ''Decision Support'' WHEN liccp.name = ''TEMPLATE_DS_Mod_3'' THEN ''Decision Support'' WHEN liccp.name = ''TEMPLATE_ES_Mod_1'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATE_ES_Mod_2'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATE_ES_Mod_3'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATE_ES_Mod_4'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATE_ES_Mod_5'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATE_ES_Mod_6'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATE_ES_Mod_7'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATE_ES_Mod_8'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATE_ES_Mod_9'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATE_Funding_Type'' THEN ''Funding Type'' WHEN liccp.name = ''TEMPLATE_Funding_Method'' THEN ''Funding Type'' WHEN liccp.name = ''TEMPLATE_HW_Mod_1'' THEN ''Health And Wellness'' WHEN liccp.name = ''TEMPLATE_HW_Mod_2'' THEN ''Health And Wellness'' WHEN liccp.name = ''TEMPLATE_HW_Mod_3'' THEN ''Health And Wellness'' WHEN liccp.name = ''TEMPLATE_HW_Mod_4'' THEN ''Health And Wellness'' WHEN liccp.name = ''TEMPLATE_HW_Mod_5'' THEN ''Health And Wellness'' WHEN liccp.name = ''TEMPLATE_Optum_Rx'' THEN ''Pharmacy Selected'' WHEN liccp.name = ''TEMPLATE_WH_Mod_1'' THEN ''Womens Health'' WHEN liccp.name = ''TEMPLATE_WH_Mod_2'' THEN ''Womens Health'' WHEN liccp.name = ''TEMPLATECover_Image'' THEN ''Cover'' WHEN liccp.name = ''TEMPLATECompany_Name'' THEN ''Company Name'' WHEN liccp.name = ''TEMPLATEDS_Mod_1'' THEN ''Decision Support'' WHEN liccp.name = ''TEMPLATEDS_Mod_2'' THEN ''Decision Support'' WHEN liccp.name = ''TEMPLATEDS_Mod_3'' THEN ''Decision Support'' WHEN liccp.name = ''TEMPLATEES_Mod_1'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATEES_Mod_2'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATEES_Mod_3'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATEES_Mod_4'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATEES_Mod_5'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATEES_Mod_6'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATEES_Mod_7'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATEES_Mod_8'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATEES_Mod_9'' THEN ''Extra Care Support'' WHEN liccp.name = ''TEMPLATEFunding_Type'' THEN ''Funding Type'' WHEN liccp.name = ''TEMPLATEFunding_Method'' THEN ''Funding Type'' WHEN liccp.name = ''TEMPLATEHW_Mod_1'' THEN ''Health And Wellness'' WHEN liccp.name = ''TEMPLATEHW_Mod_2'' THEN ''Health And Wellness'' WHEN liccp.name = ''TEMPLATEHW_Mod_3'' THEN ''Health And Wellness'' WHEN liccp.name = ''TEMPLATEHW_Mod_4'' THEN ''Health And Wellness'' WHEN liccp.name = ''TEMPLATEHW_Mod_5'' THEN ''Health And Wellness'' WHEN liccp.name = ''TEMPLATEOptum_Rx'' THEN ''Pharmacy Selected'' WHEN liccp.name = ''TEMPLATEWH_Mod_1'' THEN ''Womens Health'' WHEN liccp.name = ''TEMPLATEWH_Mod_2'' THEN ''Womens Health'' WHEN liccp.name = ''TEMPLATESP_MOD_01'' THEN ''Support for Parents'' WHEN liccp.name = ''TEMPLATESP_MOD_02'' THEN ''Support for Parents'' WHEN liccp.name = ''TEMPLATEBusiness_Segment'' THEN ''Business Segment'' WHEN liccp.name = ''TEMPLATEPlan_Type'' THEN ''Plan Type'' WHEN liccp.name = ''TEMPLATEPercentage_Question'' THEN ''Percentage Question'' WHEN liccp.name = ''TEMPLATEDental'' THEN ''Dental'' WHEN liccp.name = ''TEMPLATEVision'' THEN ''Vision'' WHEN liccp.name = ''TEMPLATEVirtual_Visits'' THEN ''Virtual Visits'' WHEN liccp.name = ''TEMPLATEConvenience_Care'' THEN ''Convenience Care'' WHEN liccp.name = ''TEMPLATEBrochure_Version'' THEN ''Brochure Version'' END ) AS title  FROM ( SELECT po.id AS po_id, po.client_order_id, DATE(po.order_date) AS order_date, EXTRACT(YEAR_MONTH FROM DATE(po.order_date)) yearmonth, EXTRACT(MONTH FROM DATE(po.order_date)) order_month, EXTRACT(YEAR FROM DATE(po.order_date)) order_year,DATE(po.order_need_by_date) AS order_need_by_date, ( SELECT status FROM EnI.order_status WHERE id = po.order_status_id ) AS order_status, ( SELECT DATE(value) FROM EnI.order_property WHERE order_id = po.id AND name = ''eventDate'' ) AS eventDate, CONCAT(( SELECT value FROM EnI.order_property WHERE order_id = po.id AND name = ''userFirstName''), '' '', ( SELECT value FROM EnI.order_property WHERE order_id = po.id AND name = ''userLastName'' ) ) AS userName , ( SELECT value FROM EnI.order_property WHERE order_id = po.id AND name = ''p3Segment'' ) AS p3Segment, li.id AS li_id, li.customer_product_id, li.quantity as total_quantity, lic.id AS lic_id, lic.customer_sku, CAST(( SELECT value FROM EnI.line_item_component_custom_property WHERE line_item_component_id = lic.id AND name = ''TEMPLATEText_Num_Subscribers'') AS UNSIGNED) AS Number_of_Subscribers, ( SELECT value FROM EnI.line_item_component_custom_property WHERE line_item_component_id = lic.id AND name = ''TEMPLATEBusiness_Segment'' ) AS business_segment , ( SELECT value FROM EnI.line_item_component_custom_property WHERE line_item_component_id = lic.id AND name IN ( ''TEMPLATEFunding_Type'', ''TEMPLATEFunding_Method'', ''TEMPLATE_Funding_Type'', ''TEMPLATE_Funding_Method'' ) ) AS funding_type FROM EnI.platform_order po JOIN EnI.line_item li ON po.id = li.order_id JOIN EnI.line_item_component lic ON li.id = lic.line_item_id WHERE po.program_id = 3 AND li.customer_product_id LIKE ''%Welcome%Configurable%'' AND ( SELECT status FROM EnI.order_status WHERE id = po.order_status_id ) IN ( ''ORDER_APPROVED'', ''FAILED_SENT_TO_PRINTER'', ''IN_PROCESS'', ''SENT_TO_PRINTER'', ''SHIPPED'' ) ) b JOIN EnI.line_item_component_custom_property liccp ON b.lic_id = liccp.line_item_component_id WHERE ( liccp.value != '''' OR liccp.name IN ( ''TEMPLATE_Cover_Image'', ''TEMPLATECover_Image'' ) ) AND liccp.name IN ( ''sku'', ''TEMPLATE_Cover_Image'', ''TEMPLATE_Company_Name'', ''TEMPLATE_DS_Mod_1'', ''TEMPLATE_DS_Mod_2'', ''TEMPLATE_DS_Mod_3'', ''TEMPLATE_ES_Mod_1'', ''TEMPLATE_ES_Mod_2'', ''TEMPLATE_ES_Mod_3'', ''TEMPLATE_ES_Mod_4'', ''TEMPLATE_ES_Mod_5'', ''TEMPLATE_ES_Mod_6'', ''TEMPLATE_ES_Mod_7'', ''TEMPLATE_ES_Mod_8'', ''TEMPLATE_ES_Mod_9'', ''TEMPLATE_Funding_Type'', ''TEMPLATE_Funding_Method'', ''TEMPLATE_HW_Mod_1'', ''TEMPLATE_HW_Mod_2'', ''TEMPLATE_HW_Mod_3'', ''TEMPLATE_HW_Mod_4'', ''TEMPLATE_HW_Mod_5'', ''TEMPLATE_Optum_Rx'', ''TEMPLATE_WH_Mod_1'', ''TEMPLATE_WH_Mod_2'', ''TEMPLATECover_Image'', ''TEMPLATECompany_Name'', ''TEMPLATEDS_Mod_1'', ''TEMPLATEDS_Mod_2'', ''TEMPLATEDS_Mod_3'', ''TEMPLATEES_Mod_1'', ''TEMPLATEES_Mod_2'', ''TEMPLATEES_Mod_3'', ''TEMPLATEES_Mod_4'', ''TEMPLATEES_Mod_5'', ''TEMPLATEES_Mod_6'', ''TEMPLATEES_Mod_7'', ''TEMPLATEES_Mod_8'', ''TEMPLATEES_Mod_9'', ''TEMPLATEFunding_Type'', ''TEMPLATEFunding_Method'', ''TEMPLATEHW_Mod_1'', ''TEMPLATEHW_Mod_2'', ''TEMPLATEHW_Mod_3'', ''TEMPLATEHW_Mod_4'', ''TEMPLATEHW_Mod_5'', ''TEMPLATEOptum_Rx'', ''TEMPLATEWH_Mod_1'', ''TEMPLATEWH_Mod_2'' , ''TEMPLATEBusiness_Segment'', ''TEMPLATEPlan_Type'', ''TEMPLATEPercentage_Question'', ''TEMPLATEDental'', ''TEMPLATEVision'', ''TEMPLATEVirtual_Visits'', ''TEMPLATEConvenience_Care'', ''TEMPLATESP_MOD_01'', ''TEMPLATESP_Mod_02'', ''TEMPLATEBrochure_Version'')) b1 group by b1.order_date, b1.title, b1.value2' , `datasource` = 'eni', `created_date` = NOW(), `modified_date` = NOW()
where report_id = (SELECT report_id from reports_details where report_name = 'ONBOARDING DASHBOARD WCB BY PROGRAM REPORT')
