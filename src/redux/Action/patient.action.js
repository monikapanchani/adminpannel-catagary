import { deleteAllPatientData, editAllPatientData, getAllPatientData, postAllPatientData } from '../../common/apis/patient.api';
import { BASE_URL } from '../../Share/baseurl';
import * as Actiontype from '../actiontype'


export const getPatient = () => (dispatch) => {
  try {
    dispatch(lodingPatient())

    setTimeout(function () {

      getAllPatientData()
      .then(data => dispatch(({ type: Actiontype.GET_PATIENT, payload: data.data })))
     .catch(error => dispatch(ErrorPatient(error.message)));

      // fetch(BASE_URL + 'patient')
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
      //   .then(data => dispatch(({ type: Actiontype.GET_PATIENT, payload: data })))
      //   .catch(error => dispatch(ErrorPatient(error.message)));
    }, 2000)
  } catch (error) {
    dispatch(ErrorPatient(error.message))
  }

}

export const lodingPatient = () => (dispatch) => {
  dispatch({ type: Actiontype.LODING_PATIENT })
}

export const DeletePatient = (id) => (dispatch) => {
  dispatch({ type: Actiontype.DELETE_PATIENT })
  try {
    dispatch(lodingPatient())
    setTimeout(function () {
    deleteAllPatientData(id)
    .then(dispatch(({ type: Actiontype.DELETE_PATIENT, payload: id })))
    .catch(error => dispatch(ErrorPatient(error.message)));
      // fetch(BASE_URL + 'patient/' + id, {
      //   method: 'DELETE', // or 'PUT'
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // })
      //   .then(dispatch(({ type: Actiontype.DELETE_PATIENT, payload: id })))
      //   .catch(error => dispatch(ErrorPatient(error.message)));
    }, 2000)

  } catch (error) {
    dispatch(ErrorPatient(error.message))
  }
}

export const EditPatient = (data) => (dispatch) => {
  try {
    editAllPatientData(data)
    .then(data => dispatch({ type: Actiontype.EDIT_PATIENT, payload: data.data }))
    .catch((error) => dispatch(ErrorPatient(error.message)))
    // fetch(BASE_URL + 'patient/' + data.id, {
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
    //   .then(data => dispatch({ type: Actiontype.EDIT_PATIENT, payload: data }))
    //   .catch((error) => dispatch(ErrorPatient(error.message)))

  } catch (error) {
    dispatch(ErrorPatient(error.message))
  }
}

export const ErrorPatient = (error) => (dispatch) => {
  dispatch({ type: Actiontype.ERROR_PATIENT, payload: error })
}

export const AddPatient = (data) => (dispatch) => {
  try {
    dispatch(lodingPatient())
    
    setTimeout(function () {
      postAllPatientData(data)
      .then((response) => response.json())
      .then(data => dispatch(({ type: Actiontype.ADD_PATIENT, payload: data.data })))

    // //   fetch(BASE_URL + 'patient', {
    // //     method: 'POST', // or 'PUT'
    // //     headers: {
    // //       'Content-Type': 'application/json',
    // //     },
    // //     body: JSON.stringify(data),
    // //   })
    //     .then((response) => response.json())
    //     .then(data => dispatch(({ type: Actiontype.ADD_PATIENT, payload: data })))
    }, 2000)
  } catch (error) {

  }
}