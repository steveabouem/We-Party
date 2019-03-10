import React from "react";
import Navigation from "./navigation/Navigation";

export default class PageNotFound extends React.Component {
    render() {
        return (
            <div className="page-not-found">
                <Navigation />
                <h1>This page does not exist. Please stick to the links in the menu</h1>
            </div>
        );
    }
}