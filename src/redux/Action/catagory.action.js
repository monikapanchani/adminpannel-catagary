import {
  deleteAllCatagoryData,
  editAllCatagoryData,
  getAllCatagoryData,
  postAllCatagoryData,
}
 from "../../common/apis/catagory.api";
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

export const getCatagory = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(db, "catagory"));
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
      console.log(`${doc.id} => ${doc.data()}`);
      console.log(data);
    });

    dispatch({ type: Actiontype.GET_CATAGORY, payload: data });
    
  } catch (error) {
    dispatch(ErrorCatagory(error.message));
  }
};

export const EditCatagory = (data) => async (dispatch) => {
  console.log(data);
  try {
    const medRef = doc(db, "catagory", data.id);
    if (typeof data.FIleimage === "string") {
      await updateDoc(medRef, {
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        expiry: data.expiry,
      });
      dispatch({ type: Actiontype.EDIT_CATAGORY, payload: data });
    } else {

      const oldimgRef = ref(storage, "catagory/" + data.UploadFile);
      const newimgRef = ref(storage, "catagory/" + UploadFile);

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
            dispatch({ type: Actiontype.EDIT_CATAGORY, payload: {...data, UploadFile: UploadFile, FIleimage: url} })
          })
        })
      })}
  } catch (error) {
    dispatch(ErrorCatagory(error.message));
  }
};

let UploadFile = Math.floor(Math.random() * 1000).toString();

export const addCatagory = (data) => async (dispatch) => {
  console.log(data);
  try {

    const medRef = ref(storage, "catagory/" + UploadFile);
    uploadBytes(medRef, data.FIleimage).then(async (snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
        console.log(url);
        const medRef = await addDoc(collection(db, "catagory"), {
          ...data,
          FIleimage: url,
          UploadFile: UploadFile,
        });
        dispatch({
          type: Actiontype.ADD_CATAGORY,
          payload: {
            id: medRef.id,
            ...data,
            FIleimage: url,
            UploadFile: UploadFile,
          },
        });
      });
    });
  } catch (error) {
    dispatch(ErrorCatagory(error.message));
  }
};

export const DeleteCatagory = (data) => async (dispatch) => {
  console.log(data);
  try {
    const medRef = ref(storage, "catagory/" + data.UploadFile);
    deleteObject(medRef)
      .then(async () => {
        await deleteDoc(doc(db, "catagory", data.id));
        dispatch({ type: Actiontype.DELETE_CATAGORY, payload: data.id });
      })
      .catch((error) => {
        dispatch(ErrorCatagory(error.message));
      });
  } catch (error) {
    dispatch(ErrorCatagory(error.message));
  }
};

export const lodingCatagory = () => (dispatch) => {
  dispatch({ type: Actiontype.LODING_CATAGORY });
};

export const ErrorCatagory = (error) => (dispatch) => {
  dispatch({ type: Actiontype.ERROR_CATAGORY, payload: error });
};
