import axios from 'axios'

export const http = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER_URL}`,
  // headers: {
  //   Accept: 'application/json'
  // }
})

// http.interceptors.request.use(
//   async (config) => {
//     const accessToken = await getAccessToken()
//     config.headers.Authorization = `Bearer ${accessToken}`
//     return config
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error)
//   }
// )
export default http
