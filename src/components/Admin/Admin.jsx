import React, { useState, useEffect } from 'react';
import './Admin.css';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import Navbar from '../Navbar/Navbar';

const Admin = () => {
    const [addText, setAddText] = useState({
        panel1Add: "",
        panel2Add: "",
        panel3Add: ""
    });

    const [addAlert, setAddAlert] = useState(false);
    const [addError, setAddError] = useState("");
    const [addErrorAlert, setAddErrorAlert] = useState(false);

    const [updateText, setUpdateText] = useState({
        panel1Update: "",
        panel2Update: "",
        panel3Update: ""
    });

    const [updateAlert, setUpdateAlert] = useState(false);
    const [updateError, setUpdateError] = useState("");
    const [updateErrorAlert, setUpdateErrorAlert] = useState(false);


    // Getting count on /admin load
    const [count, setCount] = useState(0);

    async function fetchCount() {
        await axios.get("https://precily-intern-be.herokuapp.com/api/count")
        .then(res => {
            setCount(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchCount();
    }, []);

    // Updating state on input change
    function addChange(e) {
        setAddText({
            ...addText,
            [e.target.name]: e.target.value 
        })
    }
    function addData(e) {
        e.preventDefault();

        axios.post("https://precily-intern-be.herokuapp.com/api/add", {
            panel1: addText.panel1Add,
            panel2: addText.panel2Add,
            panel3: addText.panel3Add
        })
        .then((res) => {
            console.log(res.data);
            setAddAlert(true);

            fetchCount();

            setAddText(() => {
                return {
                    ...addText,
                    panel1Add: "", panel2Add: "", panel3Add: ""
                }
            })
        })
        .catch((err) => {
            setAddError(err.response.data.message);
            setAddErrorAlert(true);
        });
    }

    function updateChange(e) {
        setUpdateText({
            ...updateText,
            [e.target.name]: e.target.value 
        })
    }
    function updateData(e) {
        e.preventDefault();

        axios.patch("https://precily-intern-be.herokuapp.com/api/update", {
            panel1: updateText.panel1Update,
            panel2: updateText.panel2Update,
            panel3: updateText.panel3Update
        })
        .then((res) => {
            console.log(res.data);
            setUpdateAlert(true);

            fetchCount();

            setUpdateText(() => {
                return {
                    ...updateText,
                    panel1Update: "", panel2Update: "", panel3Update: ""
                }
            })
        })
        .catch((err) => {
            setUpdateError(err.response.data.message);
            setUpdateErrorAlert(true);
        });
    }

    
    
    return (
        <div className='admin'>
            <Navbar/>
            <div className="alert-div">
            <Collapse in={addErrorAlert}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setAddErrorAlert(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }>
                        {addError}
                    </Alert>
                </Collapse>
                <Collapse in={addAlert}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setAddAlert(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }>
                        Data added successfully!
                    </Alert>
                </Collapse>

                <Collapse in={updateErrorAlert}>
                    <Alert
                        severity="error"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setUpdateErrorAlert(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }>
                        {updateError}
                    </Alert>
                </Collapse>
                <Collapse in={updateAlert}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setUpdateAlert(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }>
                        Data updated successfully!
                    </Alert>
                </Collapse>
            </div>
            
            <h5>API Call Count: {count}</h5>
            <div className='admin-wrapper'>
                <div className="add">
                    <h2>Add Data</h2>
                    <form method="post" className='add-form' onSubmit={addData}>
                        <div className='form-input'>
                            <h6>Panel 1</h6>
                            <textarea name="panel1Add" value={addText.panel1Add} onChange={addChange}></textarea>
                        </div>
                        <div className='form-input'>
                            <h6>Panel 2</h6>
                            <textarea name="panel2Add" value={addText.panel2Add} onChange={addChange}></textarea>
                        </div>
                        <div className='form-input'>
                            <h6>Panel 3</h6>
                            <textarea name="panel3Add" value={addText.panel3Add} onChange={addChange}></textarea>
                        </div>
                        <div className='form-button'>
                            <button>Add</button>
                        </div>
                    </form>
                </div>

                <div className="update">
                    <h2>Update Data</h2>
                    <form className='update-form' onSubmit={updateData}>
                        <div className='form-input'>
                            <h6>Panel 1</h6>
                            <textarea name="panel1Update" value={updateText.panel1Update} onChange={updateChange}></textarea>
                        </div>
                        <div className='form-input'>
                            <h6>Panel 2</h6>
                            <textarea name="panel2Update" value={updateText.panel2Update} onChange={updateChange}></textarea>
                        </div>
                        <div className='form-input'>
                            <h6>Panel 3</h6>
                            <textarea name="panel3Update" value={updateText.panel3Update} onChange={updateChange}></textarea>
                        </div>
                        <div className='form-button'>
                            <button>Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Admin;