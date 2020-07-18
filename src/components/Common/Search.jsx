import React, { Component } from "react";
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';


export default class Search extends Component {
    constructor(props){
        super(props);
    }

    onSearch = (data) => {
        this.props.history.push({
            pathname: `/Search`,
            state: { serachKey: data }
        })
    }

    render() {
        return (
            <SearchBox
                placeholder="Search"
                // onEscape={ev => {
                    
                //     console.log('Custom onEscape Called');
                // }}
                // onClear={ev => {
                //     console.log('Custom onClear Called');
                // }}
                // onChange={(_, newValue) => console.log('SearchBox onChange fired: ' + newValue)}
                onSearch={(newValue) => { this.onSearch(newValue) }}
            />

        )
    }
}