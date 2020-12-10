import React, { Component } from "react";


export default class Search extends Component {
    constructor(props) {
        super(props);
    }

    onSearch = (e) => {
        if (e.key === 'Enter') {
            this.props.history.push({
                pathname: `/Search`,
                state: { serachKey: e.target.value }
            })
        }
    }

    render() {
        return (
            <input
                style={{ width: "90%" }}
                type="search"
                placeholder="Search"
                className="form-control"
                onKeyDown={(event) => { this.onSearch(event) }}
            />
        )
    }
}