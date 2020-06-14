import React, { Component } from "react";
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';


export default class Search extends Component {
    render() {
        return (

            <SearchBox
                placeholder="Search"
                onEscape={ev => {
                    console.log('Custom onEscape Called');
                }}
                onClear={ev => {
                    console.log('Custom onClear Called');
                }}
                onChange={(_, newValue) => console.log('SearchBox onChange fired: ' + newValue)}
                onSearch={newValue => console.log('SearchBox onSearch fired: ' + newValue)}

            />

        )
    }
}