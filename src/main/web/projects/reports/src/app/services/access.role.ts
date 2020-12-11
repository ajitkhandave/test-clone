import { ReportEnum } from './report.constant';

export enum RoleName {
  ENI_UHC_ENI_REPORTS = 'eni_UHC_ENI_REPORTS',
  ENI_SFLY_REPORTS = 'eni_SFLY_REPORTS',
  ENI_UHC_POP_REPORTS = 'eni_UHC_POP_REPORTS',
  ENI_UHC_ME_REPORTS = 'eni_UHC_ME_REPORTS',
  ENI_UHC_OE_REPORTS = 'eni_UHC_OE_REPORTS',
  ENI_UHC_ONBOARDING_REPORTS = 'eni_UHC_ONBOARDING_REPORTS',
  ENI_UHC_VP_REPORTS = 'eni_UHC_VP_REPORTS'
}

export class AccessRole {
  public static [ReportEnum.AllSaversReport]: string[] = [
    RoleName.ENI_SFLY_REPORTS,
    RoleName.ENI_UHC_ENI_REPORTS
  ];
  public static [ReportEnum.InvoicingReport]: string[] = [
    RoleName.ENI_SFLY_REPORTS
  ];
  public static [ReportEnum.MonthlyVolumeReport]: string[] = [
    RoleName.ENI_SFLY_REPORTS,
    RoleName.ENI_UHC_ENI_REPORTS
  ];
  public static [ReportEnum.OrderDetailsReport]: string[] = [
    RoleName.ENI_SFLY_REPORTS,
    RoleName.ENI_UHC_ENI_REPORTS
  ];
  public static [ReportEnum.OrderStatusReport]: string[] = [
    RoleName.ENI_SFLY_REPORTS
  ];
  public static [ReportEnum.PopActiveProducts]: string[] = [
    RoleName.ENI_SFLY_REPORTS,
    RoleName.ENI_UHC_ENI_REPORTS,
    RoleName.ENI_UHC_POP_REPORTS
  ];
  public static [ReportEnum.StatusAlertReport]: string[] = [
    RoleName.ENI_SFLY_REPORTS
  ];
  public static [ReportEnum.MemberEngagementDashboardReport]: string[] = [
    RoleName.ENI_SFLY_REPORTS,
    RoleName.ENI_UHC_ENI_REPORTS,
    RoleName.ENI_UHC_ME_REPORTS
  ];
  public static [ReportEnum.MptReport]: string[] = [
    RoleName.ENI_SFLY_REPORTS,
    RoleName.ENI_UHC_ENI_REPORTS
  ];
  public static [ReportEnum.OeReport]: string[] = [
    RoleName.ENI_SFLY_REPORTS,
    RoleName.ENI_UHC_ENI_REPORTS,
    RoleName.ENI_UHC_OE_REPORTS,
    RoleName.ENI_UHC_POP_REPORTS
  ];
  public static [ReportEnum.OnboardingDashboardReport]: string[] = [
    RoleName.ENI_SFLY_REPORTS,
    RoleName.ENI_UHC_ENI_REPORTS,
    RoleName.ENI_UHC_ONBOARDING_REPORTS
  ];
  public static [ReportEnum.OeVpReport]: string[] = [
    RoleName.ENI_SFLY_REPORTS,
    RoleName.ENI_UHC_ENI_REPORTS,
    RoleName.ENI_UHC_OE_REPORTS,
    RoleName.ENI_UHC_POP_REPORTS,
    RoleName.ENI_UHC_VP_REPORTS
  ];
  public static [ReportEnum.ShipmentsOrderReport]: string[] = [
    RoleName.ENI_SFLY_REPORTS,
    RoleName.ENI_UHC_ENI_REPORTS
  ];

  // Survey Report => [RoleName.ENI_SFLY_REPORTS, RoleName.ENI_UHC_ENI_REPORTS];

  /** Order Details Submenu */
  public static [ReportEnum.OrderDetailsLineItemReport]: string[] = [
    ...AccessRole[ReportEnum.OrderDetailsReport]
  ];
  public static [ReportEnum.OrderDetailsOrderReport]: string[] = [
    ...AccessRole[ReportEnum.OrderDetailsReport]
  ];
  /**************************/

  /** Onboarding Dashboard Submenu */
  public static [ReportEnum.WcbsReport]: string[] = [
    ...AccessRole[ReportEnum.OnboardingDashboardReport]
  ];
  public static [ReportEnum.StandardBrochuresReport]: string[] = [
    ...AccessRole[ReportEnum.OnboardingDashboardReport]
  ];
  /**************************/

  /** Invoicing Report Submenu */
  public static [ReportEnum.InvoicingOrderReportLineItemLevel]: string[] = [
    ...AccessRole[ReportEnum.InvoicingReport]
  ];
  public static [ReportEnum.InvoicingOrderReportOrderLevel]: string[] = [
    ...AccessRole[ReportEnum.InvoicingReport]
  ];
  public static [ReportEnum.InvoicingInvoiceReportLineItemLevel]: string[] = [
    ...AccessRole[ReportEnum.InvoicingReport]
  ];
  public static [ReportEnum.InvoicingInvoiceReportOrderLevel]: string[] = [
    ...AccessRole[ReportEnum.InvoicingReport]
  ];
  public static [ReportEnum.InvoicingItemCountInKitReport]: string[] = [
    ...AccessRole[ReportEnum.InvoicingReport]
  ];
  public static [ReportEnum.InvoicingSkuInformationReport]: string[] = [
    ...AccessRole[ReportEnum.InvoicingReport]
  ];
  public static [ReportEnum.InvoicingSkusToAddReport]: string[] = [
    ...AccessRole[ReportEnum.InvoicingReport]
  ];
  public static [ReportEnum.InvoicingPricingErrorReport]: string[] = [
    ...AccessRole[ReportEnum.InvoicingReport]
  ];
  /**************************/

  public static isAllowed(roles: string[], url: string): boolean {
    const isAllowed = (AccessRole[url] || []).some(authority => roles.some(role => role === authority));
    return isAllowed;
  }
}

