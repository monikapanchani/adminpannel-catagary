import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import * as yup from 'yup';
import { Form, Formik, useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOffIcon from '@mui/icons-material/EditOff';


function Doctor(props) {
    const [open, setOpen] = React.useState(false);
    const [Dopen, setDOpen] = React.useState(false);
    const [data, setData] = useState([]);
    const [Did, setDid] = useState(0);
    const [update, setUpdate] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleDClickOpen = () => {
        setDOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setDOpen(false);
    };

    const handleInsert = (values) => {
        let id = Math.floor(Math.random() * 1000);
        let data = {
            id: id,
            ...values
        }


        let localData = JSON.parse(localStorage.getItem('dr'));
        if (localData === null) {
            localStorage.setItem('dr', JSON.stringify([data]))
        } else {
            localData.push(data)
            localStorage.setItem('dr', JSON.stringify(localData))
        }

    }

    let schema = yup.object().shape({
        name: yup.string().required("Please enter name"),
        specialist: yup.string().required("please enter specialist"),
        experience: yup.number().required("please enter experience").positive().integer(),

    });
    const formik = useFormik({
        initialValues: {
            name: '',
            specialist: '',
            experience: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            handleInsert(values)
        },
    });

    let handleDelete = (params) => {
        console.log(params);
        let localData = JSON.parse(localStorage.getItem('dr'))
        let fData = localData.filter((l) => l.id !== Did)
        console.log(fData);
        localStorage.setItem('dr', JSON.stringify(fData))
        loadData();
        handleClose();
    }

    let handleEdit = (params)=>{
        console.log(params);
        handleClickOpen();

        
    }

    const columns = [
        { field: 'name', headerName: 'Dr.Name', width: 70 },
        { field: 'specialist', headerName: 'specialist', width: 130 },
        { field: 'experience', headerName: 'experience', width: 130 },
        {
            field: 'action',
            headerName: 'Action',
            width: 130,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" size="large" onClick={() => {handleDClickOpen(); setDid(params.id)}}>
                        <DeleteIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="edit" size="large" onClick={()=> handleEdit(params)}>
                        <EditOffIcon fontSize="inherit" />
                    </IconButton>
                </>

            )
        },

    ];


    const loadData = () => {
        let localData = JSON.parse(localStorage.getItem('dr'))
        if (localData !== null) {
            setData(localData)

        }
    }

    useEffect(
        () => {
            loadData()
        }, [])

    const { errors, handleChange, handleSubmit, handleBlur, touched } = formik
    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button>

            
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            <div>
                <Dialog
                    open={Dopen}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are you Sure About Delete?"}
                    </DialogTitle>
                    <DialogContent>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleDelete} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <Dialog fullWidth open={open} onClose={handleClose}>
                <Formik values={formik}>
                    <Form onSubmit={handleSubmit}>
                        <DialogTitle>Subscribe</DialogTitle>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                name="name"
                                label="Dr.Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p>{errors.name && touched.name ? errors.name : ''}</p>
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                name="specialist"
                                label="Specialist"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p>{errors.specialist && touched.specialist ? errors.specialist : ''}</p>
                        </DialogContent>
                        <DialogContent>
                            <TextField
                                margin="dense"
                                name="experience"
                                label="Experience"
                                type="text"
                                fullWidth
                                variant="standard"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <p>{errors.experience && touched.experience ? errors.experience : ''}</p>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            {
                                update === true ?

                                <Button type='submit'>Update</Button>
                                :
                                <Button type='submit'>Submit</Button>

                            }
                        </DialogActions>
                    </Form>
                </Formik>
            </Dialog>
        </div>
    );
}

export default Doctor;