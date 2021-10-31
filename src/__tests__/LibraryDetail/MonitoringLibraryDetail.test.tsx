// Write empty/skipped tests on appearance for Monitoring Library Detail

import { screen, waitFor } from "@testing-library/dom";
import React from "react";
import App from "../../App/App";
import { RootStore } from "../../StoreRegistrator";
import userEvents from "@testing-library/user-event";
import { render } from "../../test-utils";
import { AppRoutes } from "../../Routing/AppRoutes";
import { MonLibs } from "../../Dummies/MonLibs.statit";

function renderApp() {
  RootStore.routing.push(AppRoutes.HomeWorkspace.url);
  return (
    <App
      caUiStore={RootStore.caUiStore}
      routing={RootStore.routing}
      stores={RootStore.stores}
    />
  );
}

describe("Library Detail", () => {
  it("click on a library opens library details page", async () => {
    const { container } = render(renderApp());

    const lib = MonLibs[0];

    userEvents.click(await screen.findByText(lib.libraryName));

    expect(RootStore.routing.location.pathname).toMatch(
      `${AppRoutes.MonitoringLibraryDetail.urlWithoutParams}${lib.libraryID}`
    );

    // also checking if delete button is present
    await screen.findByRole("button", { name: /Delete Library/i });
  });

  it("libary name and libary note is displayed", async () => {
    render(renderApp());
    const lib = MonLibs[2];
    userEvents.click(await screen.findByText(lib.libraryName));

    await screen.findByText("Library Name");
    await screen.findByText(lib.libraryName);
    await screen.findByText("Library Note");
    await screen.findByText(lib.note);
  });
  it("details of monitoring questions in the selected library are shown", async () => {
    render(renderApp());
    const lib = MonLibs[2];
    userEvents.click(await screen.findByText(lib.libraryName));

    const heading = await screen.findByText("Monitoring Questions in library");
    expect(heading.nextSibling).toMatchInlineSnapshot(`
<div
  aria-colcount="3"
  aria-rowcount="0"
  class="k-widget k-grid"
  data-keyboardnavscope="true"
  role="grid"
  style="max-height: 800px;"
>
  <div
    class="k-grid-header"
    role="presentation"
  >
    <div
      class="k-grid-header-wrap"
      role="presentation"
      style="border-width: 0px;"
    >
      <table
        role="presentation"
      >
        <colgroup
          role="presentation"
        >
          <col />
          <col />
          <col />
        </colgroup>
        <thead
          data-keyboardnavheader="true"
          role="presentation"
        >
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
                    Is Mandatory
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
                    Answer Type
                  </span>
                </span>
              </span>
            </th>
          </tr>
        </thead>
      </table>
    </div>
  </div>
  <div
    class="k-grid-container"
    role="presentation"
  >
    <div
      class="k-grid-content k-virtual-content"
      role="presentation"
    >
      <div
        role="presentation"
        style="position: relative;"
      >
        <table
          class="k-grid-table"
          role="presentation"
        >
          <colgroup
            role="presentation"
          >
            <col />
            <col />
            <col />
          </colgroup>
          <tbody
            data-keyboardnavbody="true"
            role="presentation"
          >
            <tr
              aria-rowindex="2"
              class="k-grid-norecords"
            >
              <td
                colspan="3"
              >
                No records available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="k-height-container"
        role="presentation"
      >
        <div />
      </div>
    </div>
  </div>
</div>
`);
  });

  it("can delete the library ", async () => {
    render(renderApp());

    const lib = MonLibs[1];

    userEvents.click(await screen.findByText(lib.libraryName));

    userEvents.click(
      await screen.findByRole("button", { name: /Delete Library/i })
    );
    await screen.findByRole("dialog", { name: /Are you sure\?/i });

    userEvents.click(await screen.findByRole("button", { name: /Delete/gi }));

    waitFor(() => expect(screen.queryByText(lib.libraryName)).toBeNull());
  });
});

export {};
