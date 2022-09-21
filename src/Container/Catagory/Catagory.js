import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import * as yup from "yup";
import { Form, Formik, useFormik } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import {
  addCatagory,
  DeleteCatagory,
  EditCatagory,
  getCatagory,
} from "../../redux/Action/catagory.action";
import { render } from "@testing-library/react";

function Catagory(props) {
  const [open, setOpen] = React.useState(false);
  const [dopen, setDOpen] = React.useState(false);
  const [data, setdata] = useState([]);
  const [did, setDid] = useState(0);
  const [update, setUpdate] = useState(false);
  const [FilterData, setFilterData] = useState([]);

  const dispatch = useDispatch();
  const catagory = useSelector((state) => state.catagory);

  const handleDClickOpen = () => {
    setDOpen(true);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDOpen(false);
  };

  const handleInsert = (values) => {
    dispatch(addCatagory(values));

    loadData();
    handleClose();
    formikobj.resetForm();
  };

  let schema = yup.object().shape({
    name: yup.string().required("Please enter catagory name"),
    price: yup.number().required("please enter catagory price").positive().integer(),
    FIleimage: yup.mixed().required("please enter image"),
  });

  let handleUpdateData = (values) => {


    dispatch(EditCatagory(values));

    handleClose();
    setUpdate(false);
    loadData();
    formikobj.resetForm();
  };

  const formikobj = useFormik({
    initialValues: {
      name: "",
      price: "",
      FIleimage: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (update) {
        handleUpdateData(values);
      } else {
        handleInsert(values);
      }
    },
  });

  const handleDelete = (params) => {

    dispatch(DeleteCatagory(did));
    loadData();
    handleClose();
  };

  const handleEdit = (params) => {
    console.log(params);
    handleClickOpen();

    setUpdate(true);
    formikobj.setValues(params.row);
  };
  const columns = [
    { field: "name", headerName: "catagory Name", width: 130 },
    { field: "price", headerName: " catagory price", width: 130 },
    { field: "FIleimage",
     headerName: "Profile Image", 
     width: 130 ,
    renderCell : (params) => (
      <img src={params.row.FIleimage} width={50} height={50}/>
    )
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="delete"
            size="large"
            onClick={() => {
              handleDClickOpen();
              setDid(params.row);
            }}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="large"
            onClick={() => handleEdit(params)}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
        </>
      ),
    },
  ];

  const loadData = () => {
    let localData = JSON.parse(localStorage.getItem("Catagory"));
    if (localData !== null) {
      setdata(localData);
    }
  };

  useEffect(() => {
    // loadData();
    dispatch(getCatagory());
  }, []);

  const { handleChange, handleSubmit, handleBlur, errors, touched, values, setFieldValue } =
    formikobj;

  console.log(data);

  let handleSearch = (val) => {
    //console.log(val);

    let localData = JSON.parse(localStorage.getItem("Catagory"));

    let FData = localData.filter(
      (l) =>
        l.name.toLowerCase().includes(val.toLowerCase()) ||
        l.price.toString().includes(val) ||
        l.quantity.toString().includes(val) ||
        l.expiry.toString().includes(val)
    );
    //console.log(FData);
    setFilterData(FData);
  };

  const finalData = FilterData.length > 0 ? FilterData : data;

  return catagory.isLoding ? (
    <p>Loading ...</p>
  ) : catagory.error != "" ? (
    <p>{catagory.error}</p>
  ) : (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>

      <TextField
        margin="dense"
        name="search"
        label="Search Catagory"
        type="text"
        fullWidth
        variant="standard"
        onChange={(e) => handleSearch(e.target.value)}
      />

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={catagory.catagory}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <Dialog
        fullWidth
        open={dopen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to Delete?"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Catagory Detail</DialogTitle>
        <Formik values={formikobj}>
          <Form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                value={values.name}
                margin="dense"
                name="name"
                label="Catagory Name"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p>{errors.name && touched.name ? errors.name : ""}</p>
              <TextField
                value={values.price}
                margin="dense"
                name="price"
                label="Catagory Price"
                type="text"
                fullWidth
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p>{errors.price && touched.price ? errors.price : ""}</p>
          
              <p>Profile image</p>
              <input
                type={"file"}
                name="FIleimage"
                onChange={(e) => {
                  setFieldValue("FIleimage", e.target.files[0]);
                }}
              />
               <p>{errors.FIleimage && touched.FIleimage ? errors.FIleimage : ""}</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              {update === true ? (
                <Button type="submit">Update</Button>
              ) : (
                <Button type="submit">Submit</Button>
              )}
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>
    </div>
  );
}

export default Catagory;
