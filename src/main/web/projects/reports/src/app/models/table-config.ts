import { SelectionType } from '@swimlane/ngx-datatable';
import { Observable, Subject } from 'rxjs';

export interface TableConfig {
  /**
   * For changing the header's height
   * ByDefault: 30
   */
  headerHeight?: number;

  /**
   * Use horizontal scrollbar.
   * Default value: false
   */
  scrollbarH?: boolean;
  /**
   * For intimating the table that filter is applied or removed.
   * <true> Passing true will filter the data and apply queries.
   * <false> Passing false will remove all the applied filters.
   */
  filters?: Subject<boolean>;

  /**
   * For Highlighting the rows on click.
   * <true> Passing true will apply toggle Class on rowElement based on click/declick.
   */
  rowHighlightOnClick?: boolean;

  /**
   * Method to call while fetching the data.
   * It will only get called once during the initialization of the dataTable.
   * Method should return the data as Array. And all the sorting/Filtering will be applied on this array.
   */
  api(): Observable<any[]>;

  /**
   * Optional method will be used while appling the filters.
   * Method call back will allow user to add their constraints.
   * @param row Row object will be passed to see for the condition.
   * @returns Boolean, True will display the record and False will ignore the record.
   */
  query?(row: any): boolean;


  /**
   * Method to help identify click/declick.
   */
  rowHighlightQuery?(row: any): boolean;

}
