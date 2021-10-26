import React from "react";
import { observer } from "mobx-react";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { ModalDialogModel } from "./ModalDialogModel";

interface ModalDialogProps {
    model: ModalDialogModel;
    title: string;

    width?: number;
    height?: number;
    buttons?: ModalDialogButton[];
}

export interface ModalDialogButton {
    title: string;
    disabled?: boolean;
    onclick: (obj?: any) => void;
}

export const ModalDialog = observer(class ModalDialog extends React.Component<ModalDialogProps> {

    render() {
        const model = this.props.model;
        return (
            model.Visible &&
            <Dialog
                width={this.props.width || 800}
                height={this.props.height || 600}
                title={this.props.title}
                key={this.props.title}
                onClose={() => { model.hide() }}>
                <div key={this.props.title + "dialog"} style={{ margin: "25px" }} className="dialog">
                    {this.props.children}
                </div>
                {
                    this.props.buttons && this.props.buttons.length > 0 &&
                    <DialogActionsBar>
                        {
                            this.props.buttons.map(b =>
                                <button
                                    disabled={b.disabled}
                                    key={b.title + "modalbutton"}
                                    className="k-button k-primary" onClick={() => { b.onclick(); }} >
                                    {b.title}
                                </button>)
                        }
                    </DialogActionsBar>
                }
            </Dialog>
        );
    }
});