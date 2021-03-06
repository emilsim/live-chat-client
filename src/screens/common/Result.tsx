import React, { Component } from 'react';

export default class Result extends Component<{ resultText: React.ReactNode, colorHex: any }, {}> {

    render() {
        const styles = {
            color: this.props.colorHex,
            textAlign: "center",
        } as React.CSSProperties;
        return (
            <p style={styles}>
                {this.props.resultText}
            </p>
        );
    }
}
