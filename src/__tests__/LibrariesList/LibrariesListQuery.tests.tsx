import { MonitoringFetches } from "../../Fetches/MonitoringFetches";
import { RootStore } from "../../StoreRegistrator";
import { render } from "../../test-utils";
import React from "react";
import { MonitoringLibrariesList } from "../../App/Monitoring/MonitoringLibrariesList";
import { screen } from "@testing-library/dom";

describe("Libraries list", () => {
  it("loads List", async () => {
    const monitoringQueries = new MonitoringFetches.Queries();

    await RootStore.MonitoringQueryHandlers.MonitoringLibrariesQueryHandler.getMonitoringLibraries();
    expect(
      RootStore.stores.MonitoringStore.MonitoringLibrariesListModel.Libraries
    ).toMatchInlineSnapshot(`
Array [
  Object {
    "libraryID": "123",
    "libraryName": "Library123",
    "note": "Some note some note",
    "poolCount": 7,
    "questionCount": 2,
  },
  Object {
    "libraryID": "456",
    "libraryName": "Library456",
    "note": "Some note some note",
    "poolCount": 7,
    "questionCount": 1,
  },
  Object {
    "libraryID": "789",
    "libraryName": "Library789",
    "note": "Some note some note",
    "poolCount": 7,
    "questionCount": 0,
  },
]
`);
  });

  it("loads list to Table", async () => {
    render(
      <MonitoringLibrariesList
        MonitoringLibrariesListModel={
          RootStore.stores.MonitoringStore.MonitoringLibrariesListModel
        }
        MonitoringLibrariesQueryHandler={
          RootStore.MonitoringQueryHandlers.MonitoringLibrariesQueryHandler
        }
        NewMonitoringLibraryDialogModel={
          RootStore.dialogsStore.NewMonitoringLibraryDialogModel
        }
      />
    );
    expect(screen.getAllByRole("row")).toMatchInlineSnapshot(`
Array [
  <tr
    aria-rowindex="1"
    role="row"
  >
    <th
      aria-colindex="1"
      aria-selected="false"
      aria-sort="none"
      class="k-header"
      colspan="1"
      role="columnheader"
      rowspan="1"
    >
      <span
        class="k-cell-inner"
      >
        <span
          class="k-link"
        >
          <span
            class="k-column-title"
          >
            Name
          </span>
        </span>
      </span>
    </th>
    <th
      aria-colindex="2"
      aria-selected="false"
      aria-sort="none"
      class="k-header"
      colspan="1"
      role="columnheader"
      rowspan="1"
    >
      <span
        class="k-cell-inner"
      >
        <span
          class="k-link"
        >
          <span
            class="k-column-title"
          >
            CountOfPools
          </span>
        </span>
      </span>
    </th>
    <th
      aria-colindex="3"
      aria-selected="false"
      aria-sort="none"
      class="k-header"
      colspan="1"
      role="columnheader"
      rowspan="1"
    >
      <span
        class="k-cell-inner"
      >
        <span
          class="k-link"
        >
          <span
            class="k-column-title"
          >
            # Questions
          </span>
        </span>
      </span>
    </th>
  </tr>,
  <tr
    aria-rowindex="2"
    class="k-master-row"
    data-grid-row-index="0"
    role="row"
  >
    <td
      aria-colindex="1"
      aria-selected="false"
      class=""
      colspan="1"
      data-grid-col-index="0"
      role="gridcell"
    >
      Library123
    </td>
    <td
      aria-colindex="2"
      aria-selected="false"
      class=""
      colspan="1"
      data-grid-col-index="1"
      role="gridcell"
    >
      7
    </td>
    <td
      aria-colindex="3"
      aria-selected="false"
      class=""
      colspan="1"
      data-grid-col-index="2"
      role="gridcell"
    >
      2
    </td>
  </tr>,
  <tr
    aria-rowindex="3"
    class="k-master-row k-alt"
    data-grid-row-index="1"
    role="row"
  >
    <td
      aria-colindex="1"
      aria-selected="false"
      class=""
      colspan="1"
      data-grid-col-index="0"
      role="gridcell"
    >
      Library456
    </td>
    <td
      aria-colindex="2"
      aria-selected="false"
      class=""
      colspan="1"
      data-grid-col-index="1"
      role="gridcell"
    >
      7
    </td>
    <td
      aria-colindex="3"
      aria-selected="false"
      class=""
      colspan="1"
      data-grid-col-index="2"
      role="gridcell"
    >
      1
    </td>
  </tr>,
  <tr
    aria-rowindex="4"
    class="k-master-row"
    data-grid-row-index="2"
    role="row"
  >
    <td
      aria-colindex="1"
      aria-selected="false"
      class=""
      colspan="1"
      data-grid-col-index="0"
      role="gridcell"
    >
      Library789
    </td>
    <td
      aria-colindex="2"
      aria-selected="false"
      class=""
      colspan="1"
      data-grid-col-index="1"
      role="gridcell"
    >
      7
    </td>
    <td
      aria-colindex="3"
      aria-selected="false"
      class=""
      colspan="1"
      data-grid-col-index="2"
      role="gridcell"
    >
      0
    </td>
  </tr>,
]
`);
  });
});

export {};
