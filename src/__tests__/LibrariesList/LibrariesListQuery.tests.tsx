import { RootStore } from "../../StoreRegistrator";
import { render } from "../../test-utils";
import React from "react";
import { MonitoringLibrariesList } from "../../App/Monitoring/MonitoringLibrariesList";
import { screen, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

const renderMonitoringList = () => {
  return (
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
};

describe("Libraries list", () => {
  it("loads List", async () => {
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
    render(renderMonitoringList());
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

  it("clicking new monitoring library opens the dialog", async () => {
    render(renderMonitoringList());

    userEvent.click(
      screen.getByRole("button", { name: /New monitoring library/i })
    );

    const libName = "TestLibrary123";

    await screen.findByRole("dialog", { name: /New Monitoring Library/i });

    userEvent.type(screen.getByLabelText(/library name/i), libName);

    userEvent.click(screen.getByRole("button", { name: /Create/i }));

    await screen.findByRole("gridcell", { name: libName });
  });

  it("table exists and has columns Name, CountOfPools, Questions", async () => {
    render(renderMonitoringList());

    const table = screen.getByRole("grid");
    expect(table).toBeDefined();
    within(table).getByRole("columnheader", { name: /Name/i });
    within(table).getByRole("columnheader", { name: /CountOfPools/i });
    within(table).getByRole("columnheader", { name: /# Questions/i });
  });
});

export {};
