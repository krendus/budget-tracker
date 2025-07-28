import axios from "./axios";
interface IGetSubject {
    category_id: string,
    search: string,
}

export const bookSearch = (params: any) => {
    return axios.get("/books", { params })
}

export const getSingleBook = (id: string) => {
    return axios.get(`/books/${id}`)
}


export const getBookCategories = () => {
    return axios.get("/books/categories")
}

export const getSingleCategory = (id: string) => {
    return axios.get(`/books/categories/${id}`)
}

export const getSubjects = (params: IGetSubject) => {
    return axios.get("/books/subjects", { params })
}

