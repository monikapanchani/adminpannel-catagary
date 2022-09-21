import { deleteRequest, editRequest, getRequest, postRequest   } from "../request"



export const getAllMedicineData = () => {
    return getRequest('medicine')
}

export const postAllMedicineData = (data) => {
    return postRequest('medicine',data)
}

export const deleteAllMedicineData = (id) => {
    return deleteRequest('medicine/',id)
}

export const editAllMedicineData = (data,id) => {
    return editRequest('medicine/',data,id)
}

