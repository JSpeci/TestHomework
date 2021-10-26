import React from 'react';
import { observer } from 'mobx-react';
import "./TextBlock.css";
import { ReactNode } from 'react';

export interface TextBlockProps {
    value?: string | number | undefined;
    label?: string;
    widht?: number;
    canSelect?: boolean;
    beInline?: boolean;
    className?: string;
    formatAsPrice?: boolean;
    onClick?: () => void;
}

export const TextBlock = observer(class TextBlock extends React.Component<TextBlockProps> {

    formatValue(): string | ReactNode {
        if (this.props.formatAsPrice) {
            const input = (this.props.value as number) || (this.props.children as number) || 0;
            const res = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(input as number);
            return res;
        }
        return this.props.value || this.props.children;
    }

    render() {
        return (
            <div
                className={this.props.className ? this.props.className : "text-block"}
                style={{ width: this.props.widht, display: this.props.beInline ? "inline" : "block", cursor: this.props.onClick ? "pointer" : "inherit" }}
                onClick={this.props.onClick}
            >
                {this.props.label && <span className="text-block-label unselectable">{this.props.label}</span>}
                {this.props.canSelect && <span className="text-block-content">{this.formatValue()}</span>}
                {!this.props.canSelect && <span className="text-block-content unselectable">{this.formatValue()}</span>}
            </div>
        );
    }
});