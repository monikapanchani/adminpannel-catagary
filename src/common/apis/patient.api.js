import { patientdeleteRequest, patienteditRequest, patientgetRequest, patientpostRequest } from "../request"

export const getAllPatientData =()=>{
    return patientgetRequest('patient')
}

export const postAllPatientData = (data) => {
    return patientpostRequest('patient',data)
}

export const deleteAllPatientData = (id) => {
    return patientdeleteRequest('patient/',id)
}

export const editAllPatientData = (data,id) => {
    return patienteditRequest('patient/',data,id)
}


