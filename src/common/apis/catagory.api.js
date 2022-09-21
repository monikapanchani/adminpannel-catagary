import { deleteRequest, editRequest, getRequest, postRequest   } from "../request"



export const getAllCatagoryData = () => {
    return getRequest('catagory')
}

export const postAllCatagoryData = (data) => {
    return postRequest('catagory',data)
}

export const deleteAllCatagoryData = (id) => {
    return deleteRequest('catagory/',id)
}

export const editAllCatagoryData = (data,id) => {
    return editRequest('catagory/',data,id)
}

