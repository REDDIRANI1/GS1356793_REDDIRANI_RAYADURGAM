import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";

import {
  AllCommunityModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
  provideGlobalGridOptions,
} from "ag-grid-community";

import Header from "../components/Header";
import "../css/StoreTable.css";

// Register all community features
ModuleRegistry.registerModules([AllCommunityModule]);

// Optional: Mark all grids as using legacy themes (you can skip this if using ag-theme-alpine)
provideGlobalGridOptions({ theme: "legacy" });

const PlanTable = () => {
  // Get skus and stores from Redux store
  const skus = useSelector((state: RootState) => state.skus);
  const stores = useSelector((state: RootState) => state.stores.stores);
  // 🔥 Generate Plan Data based on skus and stores
  // 👉 Helper: Random integer generator
  const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generatePlanData = () => {
    const planData: { store: string; sku: any; salesUnitsW1: number; salesDollarsW1: number; gmDollarsW1: number; gmPercentW1: string; salesUnitsW2: number; salesDollarsW2: number; gmDollarsW2: number; gmPercentW2: string; }[] = [];

    stores.forEach((store) => {
      skus.forEach((sku: { price: string; cost: string; name: any; }) => {
        const salesUnitsW1 = getRandomInt(50, 200);
        const salesUnitsW2 = getRandomInt(50, 200);

        const salesDollarsW1 = salesUnitsW1 * parseFloat(sku.price);
        const salesDollarsW2 = salesUnitsW2 * parseFloat(sku.price);

        const gmDollarsW1 = salesDollarsW1 - salesUnitsW1 * parseFloat(sku.cost);
        const gmDollarsW2 = salesDollarsW2 - salesUnitsW2 * parseFloat(sku.cost);

        const gmPercentW1 = salesDollarsW1 > 0 ? (gmDollarsW1 / salesDollarsW1) * 100 : 0;
        const gmPercentW2 = salesDollarsW2 > 0 ? (gmDollarsW2 / salesDollarsW2) * 100 : 0;

        planData.push({
          store: store.name,
          sku: sku.name,
          salesUnitsW1,
          salesDollarsW1,
          gmDollarsW1,
          gmPercentW1: gmPercentW1.toFixed(2),
          salesUnitsW2,
          salesDollarsW2,
          gmDollarsW2,
          gmPercentW2: gmPercentW2.toFixed(2),
        });
      });
    });

    return planData;
  };

  const plans = generatePlanData();

  const columnDefs: (ColDef | ColGroupDef)[] = [
    { headerName: "Store", field: "store" },
    { headerName: "SKU", field: "sku" },
    {
      headerName: "Feb",
      headerClass: "right-align-header",
      children: [
        {
          headerName: "Week 01",
          children: [
            { headerName: "Sales Units", field: "salesUnitsW1", type: "numericColumn" },
            {
              headerName: "Sales Dollars",
              field: "salesDollarsW1",
              valueFormatter: (params) => `$${params.value.toLocaleString()}`,
            },
            {
              headerName: "GM Dollars",
              field: "gmDollarsW1",
              valueFormatter: (params) => `$${params.value.toLocaleString()}`,
            },
            {
              headerName: "GM Percent",
              field: "gmPercentW1",
              valueFormatter: (params) => `${params.value}%`,
              cellStyle: (params) => gmPercentCellStyle(params.value),
            },
          ],
        },
        {
          headerName: "Week 02",
          children: [
            { headerName: "Sales Units", field: "salesUnitsW2", type: "numericColumn" },
            {
              headerName: "Sales Dollars",
              field: "salesDollarsW2",
              valueFormatter: (params) => `$${params.value.toLocaleString()}`,
            },
            {
              headerName: "GM Dollars",
              field: "gmDollarsW2",
              valueFormatter: (params) => `$${params.value.toLocaleString()}`,
            },
            {
              headerName: "GM Percent",
              field: "gmPercentW2",
              valueFormatter: (params) => `${params.value}%`,
              cellStyle: (params) => gmPercentCellStyle(params.value),
            },
          ],
        },
      ],
    },
  ];


  // 👉 Helper: Cell color logic for GM Percent
  const gmPercentCellStyle = (value: string | number) => {
    const percent = parseFloat(value.toString());
    if (percent >= 50) {
      return { backgroundColor: "green", color: "white" };
    } else if (percent >= 20) {
      return { backgroundColor: "orange", color: "black" };
    } else {
      return { backgroundColor: "red", color: "white" };
    }
  };

  return (
    <div style={{ width: "100%", overflow: "hidden" }}>
      <Header />
      <div
        className="ag-theme-alpine"
        style={{
          width: "100%",
          height: "600px", // Required for AG Grid display
        }}
      >
        <AgGridReact
          rowData={plans}
          columnDefs={columnDefs}
          defaultColDef={{ flex: 1, resizable: true }}
          domLayout="autoHeight"
          modules={[AllCommunityModule]} // Already registered, optional
        />
      </div>
    </div>
  );
};

export default PlanTable;
