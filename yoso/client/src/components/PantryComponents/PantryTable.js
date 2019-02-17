import React from "react";
import { Card, Icon } from "react-materialize";

import ReactTable from "react-table";
import "react-table/react-table.css";

export default props => {
  // Pantry Model includes these columns:
  // name, decription, stock, replenish, frequency, shelfLife, category, photo

  // purchases column headings: unitSize, sizeQuantity, weightMeasure, quantity, expiration, unitPrice, location,creation data
  const purchaseHeadings = [
    { Header: "Date", accessor: "createdAt" },
    { Header: "Quantity", accessor: "quantity" },
    { Header: "Type", accessor: "unitSize" },
    { Header: "Unit Type", accessor: "weightMeasure" },
    {
      Header: "Unit Size",
      accessor: "sizeQuantity"
    },
    { Header: "Expiration Date", accessor: "expiration" },
    { Header: "Price", accessor: "unitPrice" },
    { Header: "Location", accessor: "location" }
  ];
  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Description", accessor: "description" },
    {
      Header: "Current On-Hand",
      accessor: "stock"
    },
    {
      Header: "Average Days Between Purchases",
      accessor: "frequency"
    },
    {
      Header: "Average Days to Expiration",
      accessor: "shelfLife"
    },
    { Header: "Category", accessor: "category", Cell: props.renderEditable },
    { Header: <Icon>delete_forever</Icon> }
  ];

  return (
    <Card className="rounded z-depth-5">
      <ReactTable
        data={props.pantry}
        columns={columns}
        showPagination={true}
        getTdProps={(state, rowInfo, column, instance) => {
          return {
            onClick: (e, handleOriginal) => {
              console.log("A Td Element was clicked!");
              console.log("it produced this event:", e);
              console.log("It was in this column:", column);
              console.log("It was in this row:", rowInfo);
              console.log("It was in this table instance:", instance);

              // IMPORTANT! React-Table uses onClick internally to trigger
              // events like expanding SubComponents and pivots.
              // By default a custom 'onClick' handler will override this functionality.
              // If you want to fire the original onClick handler, call the
              // 'handleOriginal' function.
              if (handleOriginal) {
                handleOriginal();
              }
              if (!column.expander) {
                if (column.Header.type) {
                  props.handleDelete(e, rowInfo.original.id, props.getPantry);
                } else if (rowInfo) {
                  console.log(
                    `column name is ${column.id}, name is ${
                      rowInfo.original.name
                    }`
                  );
                  props.handlePantryUpdate(e, column.id, rowInfo.original);
                }
              } else if (column.expander) {
                handleOriginal();
              } else {
                console.log(
                  `column name is ${column.id}, name is ${
                    rowInfo.original.name
                  }`
                );
                props.handlePantryUpdate(e, column.id, rowInfo.original);
              }
            }
          };
        }}
        SubComponent={row => (
          <ReactTable
            data={props.purchases.data}
            columns={purchaseHeadings}
            defaultPageSize={props.purchases.length}
            showPagination={false}
            className="-striped -highlight"
          />
        )}
      />
    </Card>
  );
};
