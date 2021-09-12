import axiosClient from './axiosClient';
const userApi = {
    register(data){
        const url = '/auth/local/register'
        const result = axiosClient.post(url, data);
        return result;
    },
    login(data){
        const url = '/auth/local'
        const result = axiosClient.post(url, data);
        return result;
    },
};
export default userApi;