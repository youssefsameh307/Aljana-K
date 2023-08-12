import axiosInstance from "./axios/axiosInstance";

export const getPatients = async () => {
    try {
        const { data } = await axiosInstance({
            method: 'get',
            url: '/user/getPatients',
        });
        console.log(data);
        return data.users;
    } catch (e) {
        console.log(e)
    }
}

export const getDoctors = async () => {
    try {
        const { data } = await axiosInstance({
            method: 'get',
            url: '/user/getDoctors',
        });
        return data.users;
    } catch (e) {
        console.log(e)
    }
}

export const saveAppointment = async (appointment) => {
    try {
        const { data } = await axiosInstance({
            method: 'post',
            url: 'appointment/create',
            data: { ...appointment }
        });
        return data.users;
    } catch (e) {
        console.log(e)
    }
}