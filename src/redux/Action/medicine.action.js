import {
  deleteAllMedicineData,
  editAllMedicineData,
  getAllMedicineData,
  postAllMedicineData,
} from "../../common/apis/medicine.api";
import { getAllPatientData } from "../../common/apis/patient.api";
import { BASE_URL } from "../../Share/baseurl";
import * as Actiontype from "../actiontype";
import { db, storage } from "../../Firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

export const getMedicine = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "medicine"));
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
      console.log(`${doc.id} => ${doc.data()}`);
      console.log(data);
    });

    dispatch({ type: Actiontype.GET_MEDICINE, payload: data });
    //dispatch(lodingMedicine())

    // setTimeout(function () {

    // getAllMedicineData()
    //   .then(data => dispatch(({ type: Actiontype.GET_MEDICINE, payload: data.data })))
    //   .catch(error => dispatch(ErrorMedicine(error.message)));

    // fetch(BASE_URL + 'medicine')
    //   .then(response => {
    //     if (response.ok) {
    //       return response;
    //     } else {
    //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //       error.response = response;
    //       throw error;
    //     }
    //   },
    //     error => {
    //       var errmess = new Error(error.message);
    //       throw errmess;
    //     })
    //   .then(response => response.json())
    //   .then(data => dispatch(({ type: Actiontype.GET_MEDICINE, payload: data })))
    //   .catch(error => dispatch(ErrorMedicine(error.message)));
    // }, 2000)
  } catch (error) {
    dispatch(ErrorMedicine(error.message));
  }
};

export const EditMedicine = (data) => async (dispatch) => {
  console.log(data);
  try {
    const medRef = doc(db, "medicine", data.id);
    if (typeof data.FIleimage === "string") {
      await updateDoc(medRef, {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        expiry: data.expiry,
      });
      dispatch({ type: Actiontype.EDIT_MEDICINE, payload: data });
    } else {

      const oldimgRef = ref(storage, "medicine/" + data.UploadFile);
      const newimgRef = ref(storage, "medicine/" + UploadFile);

      deleteObject(oldimgRef)
      .then(async () => {
        uploadBytes(newimgRef, data.FIleimage)
        .then(async (snapshot) => {
          getDownloadURL(snapshot.ref)
          .then(async (url) => {
            await updateDoc(medRef, {
              name: data.name,
              price: data.price,
              quantity: data.quantity,
              expiry: data.expiry,
              UploadFile: UploadFile,
              FIleimage: url,
            });
            dispatch({ type: Actiontype.EDIT_MEDICINE, payload: {...data, UploadFile: UploadFile, FIleimage: url} })
          })
        })
      })}
    // const MedicineRef = doc(db, "medicine", data.id);

    // editAllMedicineData(data)
    //   .then(data => dispatch({ type: Actiontype.EDIT_MEDICINE, payload: data.data}))
    //   .catch((error) => dispatch(ErrorMedicine(error.message)))

    // fetch(BASE_URL + 'medicine/' + data.id, {
    //   method: 'PUT', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(response => {
    //     if (response.ok) {
    //       return response;
    //     } else {
    //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
    //       error.response = response;
    //       throw error;
    //     }
    //   },
    //     error => {
    //       var errmess = new Error(error.message);
    //       throw errmess;
    //     })
    //   .then(response => response.json())
    //   .then(data => dispatch({ type: Actiontype.EDIT_MEDICINE, payload: data }))
    //   .catch((error) => dispatch(ErrorMedicine(error.message)))
  } catch (error) {
    dispatch(ErrorMedicine(error.message));
  }
};

let UploadFile = Math.floor(Math.random() * 1000).toString();

export const addMedicine = (data) => async (dispatch) => {
  console.log(data);
  try {

    const medRef = ref(storage, "medicine/" + UploadFile);
    uploadBytes(medRef, data.FIleimage).then(async (snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        console.log(url);
        const medRef = await addDoc(collection(db, "medicine"), {
          ...data,
          FIleimage: url,
          UploadFile: UploadFile,
        });
        dispatch({
          type: Actiontype.ADD_MEDICINE,
          payload: {
            id: medRef.id,
            ...data,
            FIleimage: url,
            UploadFile: UploadFile,
          },
        });
      });
    });

    // dispatch(lodingMedicine())

    // setTimeout(function () {
    //   postAllMedicineData(data)
    //     .then(data => dispatch(({ type: Actiontype.ADD_MEDICINE, payload: data.data })))
    //     .catch(error => dispatch(ErrorMedicine(error.message)));

    // fetch(BASE_URL + 'medicine', {
    //   method: 'POST', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then(response => response.json())
    //   .then(data => dispatch(({ type: Actiontype.ADD_MEDICINE, payload: data })))
    //   .catch(error => dispatch(ErrorMedicine(error.message)));
    // }, 2000)
  } catch (error) {
    dispatch(ErrorMedicine(error.message));
  }
};

export const DeleteMedicine = (data) => async (dispatch) => {
  console.log(data);
  try {
    const medRef = ref(storage, "medicine/" + data.UploadFile);
    deleteObject(medRef)
      .then(async () => {
        await deleteDoc(doc(db, "medicine", data.id));
        dispatch({ type: Actiontype.DELETE_MEDICINE, payload: data.id });
      })
      .catch((error) => {
        dispatch(ErrorMedicine(error.message));
      });

    // dispatch(lodingMedicine())

    // setTimeout(function () {

    //   deleteAllMedicineData(id)
    //     .then(dispatch(({ type: Actiontype.DELETE_MEDICINE, payload: id })))
    //     .catch(error => dispatch(ErrorMedicine(error.message)));

    // fetch(BASE_URL + 'medicine/' + id, {
    //   method: 'DELETE', // or 'PUT'
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then(dispatch(({ type: Actiontype.DELETE_MEDICINE, payload: id })))
    //   .catch(error => dispatch(ErrorMedicine(error.message)));
    // }, 2000)
  } catch (error) {
    dispatch(ErrorMedicine(error.message));
  }
};

export const lodingMedicine = () => (dispatch) => {
  dispatch({ type: Actiontype.LODING_MEDICINE });
};

export const ErrorMedicine = (error) => (dispatch) => {
  dispatch({ type: Actiontype.ERROR_MEDICINE, payload: error });
};
