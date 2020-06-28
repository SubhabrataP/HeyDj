import React, { useState, useEffect } from "react";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

function AdditionalDjFields(props) {
    const [inputList, setInputList] = useState([
        {
            jobTitle: "",
            company: "",
            city: "",
            description: "",
        }
    ]);

    useEffect(() =>{
        setInputList(props.defaultData)
    } , [props.defaultData])

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        list[index][name] = value;
        setInputList(list);
    };

    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...inputList];
        list.splice(index, 1);
        setInputList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setInputList([...inputList,
        {
            jobTitle: "",
            company: "",
            city: "",
            description: "",
        }]);
    };

    return (
        <div>
            <div className="row">
                <Label className="col-md-9" style={{ paddingLeft: "5%", paddingRight: "0%", textAlign: "left", color: "#fff", fontSize: '22px' }}>Enter Work Experience</Label>
                <i className="fa fa-plus upload-button" onClick={handleAddClick}></i>
            </div>
            {inputList.map((x, i) => {
                return (
                    <React.Fragment>
                        <div style={{ marginTop: "3%" }}>

                            {inputList.length !== 1 &&
                                <React.Fragment>
                                    <br></br>
                                    <hr style={{ background: "#fff", color: "#fff" }}></hr>
                                    <i className="col-md-2 fa fa-minus upload-button"
                                        onClick={() => handleRemoveClick(i)}></i>
                                </React.Fragment>
                            }

                            <div className="row" style={{ marginBottom: "5%" }}>
                                <Label className="col-md-5" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color: "#fff", fontSize: '18px' }}>Job Title:</Label>
                                <TextField
                                    className="col-md-6"
                                    name="jobTitle"
                                    value={x.jobTitle}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </div>

                            <div className="row" style={{ marginBottom: "5%" }}>
                                <Label className="col-md-5" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color: "#fff", fontSize: '18px' }}>Company:</Label>
                                <TextField
                                    className="col-md-6"
                                    name="company"
                                    value={x.company}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </div>

                            <div className="row" style={{ marginBottom: "5%" }}>
                                <Label className="col-md-5" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color: "#fff", fontSize: '18px' }}>City:</Label>
                                <TextField
                                    className="col-md-6"
                                    name="city"
                                    value={x.city}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </div>

                            <div className="row" style={{ marginBottom: "5%" }}>
                                <Label className="col-md-5" style={{ paddingLeft: "0%", paddingRight: "0%", textAlign: "center", color: "#fff", fontSize: '18px' }}>Career Highlights:</Label>
                                <TextField
                                    className="col-md-6"
                                    name="description"
                                    value={x.description}
                                    onChange={e => handleInputChange(e, i)}
                                    multiline={true}
                                />
                            </div>
                        </div>
                    </React.Fragment>
                );
            })}
            <div style={{ textAlign: "center", margin: "15px 0" }}>
                <button type="button" className="customBtn" onClick={() => { props.onUpdate(inputList) }}>
                    Update
                </button>
                <button type="button" className="customBtnWhite ml-4" onClick={() => { props.onDismiss() }}>Cancel</button>
            </div>
        </div>
    );
}

export default AdditionalDjFields;