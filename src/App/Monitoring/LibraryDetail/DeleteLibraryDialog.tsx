import { observer } from "mobx-react";
import React from "react";
import { ModalDialog, ModalDialogButton } from "../../../Abstract/ModalDialog";
import { ModalDialogModel } from "../../../Abstract/ModalDialogModel";

export class DeleteLibraryDialogModel extends ModalDialogModel {
  constructor() {
    super();
  }
}

interface DeleteLibraryDialogProps {
  model: DeleteLibraryDialogModel;
  onConfirm: () => void;
}

export const DeleteLibraryDialog = observer(
  class DeleteLibraryDialog extends React.Component<DeleteLibraryDialogProps> {
    render() {
      const model = this.props.model;
      const deleteButton: ModalDialogButton = {
        onclick: this.props.onConfirm,
        title: "Delete",
      };
      return (
        <ModalDialog
          title="Are you sure?"
          model={model}
          buttons={[deleteButton]}
          height={300}
        >
          <p
            style={{
              margin: "25px",
              textAlign: "center",
            }}
          >
            Are you sure you want to delete this library?
          </p>
        </ModalDialog>
      );
    }
  }
);
