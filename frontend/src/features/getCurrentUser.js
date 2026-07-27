import api from "../../utils/axios"

const getCurrentUser =async ()=>{
    try {
        const {data}=await api.get("/api/me")
        return data
    } catch (error) {
        console.log(error)
        console.log("error in doing the api call")
        return null
    }
}
export default getCurrentUser