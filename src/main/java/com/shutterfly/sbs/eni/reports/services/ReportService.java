package com.shutterfly.sbs.eni.reports.services;

import com.shutterfly.sbs.eni.reports.configuration.RepositoryFactory;
import com.shutterfly.sbs.eni.reports.constants.ApplicationConstants;
import com.shutterfly.sbs.eni.reports.exception.RecordsNotFoundException;
import com.shutterfly.sbs.eni.reports.repositories.ExtendedRepository;
import com.shutterfly.sbs.eni.reports.repositories.ReportQueryDetailsRepo;
import com.shutterfly.sbs.eni.reports.repositories.model.ReportsDetails;

import com.shutterfly.sbs.eni.reports.repositories.model.ShipmentOrderAddresses;
import com.shutterfly.sbs.eni.reports.repositories.model.ShipmentOrders;
import java.util.ArrayList;
import java.util.List;

import java.util.Optional;
import java.util.stream.Collectors;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class ReportService {

  private final ReportQueryDetailsRepo reportQueryDetailsRepo;
  private final RepositoryFactory repositoryFactory;

  /**
   * This method is used to fetch query associated with particular report
   * @param reportName
   * @return List<String> queries
   */
  public List<String> getQueriesForReport(String reportName) {
    Optional<ReportsDetails> result = reportQueryDetailsRepo.findByReportName(reportName);
    if(result.isPresent()) {
      List<String> queries = result.get().getQueryDetailsEntities().stream()
          .map(reportsQueryDetailsEntity -> reportsQueryDetailsEntity.getQueryDetail()).collect(
              Collectors.toList());
      return queries;
    }
    else {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, ApplicationConstants.NO_REPORT_FOUND);
    }

  }

  /**
   * This method is used to fetch report result after running native query
   * @param sourceRepository, @param queries
   * @return List<Object> queries
   */
  public List<Object> getAllActiveProducts(List<String> queries, String sourceRepository, String startDate, String endDate) throws RecordsNotFoundException {
    if (!CollectionUtils.isEmpty(queries) && queries.size() == 1) {
      ExtendedRepository extendedRepository = repositoryFactory.getRepository(sourceRepository);
      List<Object> reportResult = null;
      reportResult = extendedRepository.findWithQuery(queries.get(0), startDate, endDate);
      if(!CollectionUtils.isEmpty(reportResult)) {
        return reportResult;
      } else {
        throw new RecordsNotFoundException(ApplicationConstants.NO_REPORT_DATA_FOUND);
      }
    } else {
      throw new RecordsNotFoundException(ApplicationConstants.NO_QUERY_FOR_REPORT);
    }
  }

  /**
   * This method is used to merge addresses in shipment orders list
   * @param shipmentAddresses, shipmentOrders
   * @return List<Object> mergedList
   */
  public List<ShipmentOrders> mergeAddressesIntoShipmentOrders(List<Object> shipmentOrders, List<Object> shipmentAddresses) {
    List<ShipmentOrders> shipmentOrdersList = shipmentOrders.stream()
        .map(shipmentOrder -> (ShipmentOrders) shipmentOrder).collect(Collectors.toList());
    List<ShipmentOrderAddresses> shipmentAddressesList = shipmentAddresses.stream()
        .map(shipmentAddress -> (ShipmentOrderAddresses) shipmentAddress)
        .collect(Collectors.toList());
   // List<ShipmentOrderAddresses> ordersAddressList = new ArrayList<ShipmentOrderAddresses>();
    shipmentOrdersList.forEach(shipmentOrder -> {
      List<ShipmentOrderAddresses> ordersAddressList = new ArrayList<ShipmentOrderAddresses> ();
      shipmentAddressesList.forEach((shipmentAddress) -> {
        if (shipmentAddress.getIdentity().getClientOrderId()
            .equalsIgnoreCase(shipmentOrder.getClientOrderId())) {
          ordersAddressList.add(shipmentAddress);
          shipmentOrder.setAddresses(ordersAddressList);
        }
      });
    });
    return shipmentOrdersList;
  }
}
