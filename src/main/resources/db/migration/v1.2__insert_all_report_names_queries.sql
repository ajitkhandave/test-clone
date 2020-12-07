-- POP ACTIVE PRODUCTS

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('POP ACTIVE PRODUCTS REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'POP ACTIVE PRODUCTS REPORT';

-- STATUS ALERT REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('STATUS ALERT REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'STATUS ALERT REPORT';

-- MONTHLY VOLUME REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MONTHLY VOLUME REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MONTHLY VOLUME REPORT';

-- ORDER STATUS REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ORDER STATUS REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ORDER STATUS REPORT';

-- ALL SAVERS REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ALL SAVERS REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ALL SAVERS REPORT';

-- ALL SAVERS REPORT BY MONTH

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ALL SAVERS REPORT BY MONTH', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ALL SAVERS REPORT BY MONTH';

-- ALL SAVERS REPORT BY SEGMENT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ALL SAVERS REPORT BY SEGMENT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ALL SAVERS REPORT BY SEGMENT';

-- ORDER DETAILS REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ORDER DETAILS REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ORDER DETAILS REPORT';

-- ORDER LINE ITEM DETAILS REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('LINE ITEM DETAILS REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'LINE ITEM DETAILS REPORT';

-- MEMBER ENGAGEMENT REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MEMBER ENGAGEMENT REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MEMBER ENGAGEMENT REPORT';

-- MEMBER ENGAGEMENT REPORT BY MONTH

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MEMBER ENGAGEMENT REPORT BY YEAR', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MEMBER ENGAGEMENT REPORT BY YEAR';

-- MEMBER ENGAGEMENT REPORT BY SEGMENT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MEMBER ENGAGEMENT REPORT BY SEGMENT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MEMBER ENGAGEMENT REPORT BY SEGMENT';

-- STD BROCHURES REPORT BY MONTH

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ONBOARDING DASHBOARD STD BROCHURES BY MONTH REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ONBOARDING DASHBOARD STD BROCHURES BY MONTH REPORT';

-- STD BROCHURES REPORT BY SEGMENT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ONBOARDING DASHBOARD STD BROCHURES BY SEGMENT REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ONBOARDING DASHBOARD STD BROCHURES BY SEGMENT REPORT';

-- STD BROCHURES REPORT BY PRODUCT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ONBOARDING DASHBOARD STD BROCHURES BY PRODUCT REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ONBOARDING DASHBOARD STD BROCHURES BY PRODUCT REPORT';

-- SHIPMENT BY ORDERS REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('SHIPMENT BY ORDERS REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'SHIPMENT BY ORDERS REPORT';

-- SHIPMENT BY ORDERS FOR ADDRESSES REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('SHIPMENT BY ORDERS ADDRESS REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'SHIPMENT BY ORDERS ADDRESS REPORT';

-- WCB REPORT BY FUNDING

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ONBOARDING DASHBOARD WCB BY FUNDING TYPE REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ONBOARDING DASHBOARD WCB BY FUNDING TYPE REPORT';

-- WCB REPORT BY PROGRAM

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ONBOARDING DASHBOARD WCB BY PROGRAM REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ONBOARDING DASHBOARD WCB BY PROGRAM REPORT';

-- WCB REPORT BY MONTH

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ONBOARDING DASHBOARD WCB BY MONTH REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ONBOARDING DASHBOARD WCB BY MONTH REPORT';

-- WCB REPORT BY SEGMENT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ONBOARDING DASHBOARD WCB BY SEGMENT REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ONBOARDING DASHBOARD WCB BY SEGMENT REPORT';

-- WCB REPORT BY ORDERS TRANSLATED

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('ONBOARDING DASHBOARD BY ORDERS TRANSLATED', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'ONBOARDING DASHBOARD BY ORDERS TRANSLATED';

-- OE VP DATA REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('OE VP DATA REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'OE VP DATA REPORT';

-- MPT REPORT PER DAY

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MPT_REPORT_ORDER_COUNTS_PER_DAY', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MPT_REPORT_ORDER_COUNTS_PER_DAY';

-- MPT REPORT BY SEGMENT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MPT__REPORT_ORDER_COUNTS_BY_BUSINESS_SEGMENT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MPT__REPORT_ORDER_COUNTS_BY_BUSINESS_SEGMENT';

-- MPT REPORT BY FLYER COUNT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MPT__REPORT_ORDER_COUNTS_BY_FLYER_COUNTS', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MPT__REPORT_ORDER_COUNTS_BY_FLYER_COUNTS';

-- MPT REPORT BY KIT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MPT__REPORT_ORDER_COUNTS_BY_KIT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MPT__REPORT_ORDER_COUNTS_BY_KIT';

-- MPT REPORT BY STATUS

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MPT__REPORT_ORDER_COUNTS_BY_STATUS', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MPT__REPORT_ORDER_COUNTS_BY_STATUS';

-- MPT REPORT BY USERS

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MPT__REPORT_ORDER_COUNTS_BY_USERS', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MPT__REPORT_ORDER_COUNTS_BY_USERS';

-- MPT REPORT TOTALS

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('MPT__REPORT_ORDER_COUNTS_TOTALS', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'MPT__REPORT_ORDER_COUNTS_TOTALS';

-- INVOICING PRICING ERROR

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('INVOICING PRICING ERROR REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'INVOICING PRICING ERROR REPORT';

-- INVOICING MISSING SKU

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('INVOICING MISSING SKU REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'INVOICING MISSING SKU REPORT';

-- INVOICING ITEM COUNT KIT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('INVOICING ITEM COUNT KIT REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'INVOICING ITEM COUNT KIT REPORT';

-- INVOICING SKU INFORMATION

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('INVOICING SKU INFORMATION REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'INVOICING SKU INFORMATION REPORT';

-- INVOICING FORM FACTOR TOTALS

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('INVOICING FORM FACTOR TOTAL REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'INVOICING FORM FACTOR TOTAL REPORT';

-- INVOICING SHIPPED ORDER REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('INVOICING ORDER LEVEL SHIPPED REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'INVOICING ORDER LEVEL SHIPPED REPORT';

-- INVOICING SHIPPED LINE ITEM REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('INVOICING LINE ITEM LEVEL SHIPPED REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'INVOICING LINE ITEM LEVEL SHIPPED REPORT';

-- INVOICING ORDER REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('INVOICING ORDERS LEVEL REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'INVOICING ORDERS LEVEL REPORT';

-- INVOICING LINE ITEM REPORT

INSERT INTO `reports_details` ( `report_name`, `created_by`, `created_date`, `modified_by`, `modified_date`) VALUES ('INVOICING ORDERS LINE ITEM LEVEL REPORT', 'admin', NOW(), 'admin',NOW());

INSERT INTO `reports_query_details` (`report_id`) SELECT report_id from reports_details where report_name = 'INVOICING ORDERS LINE ITEM LEVEL REPORT';



