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

export const getAppointment = async (id) => {
    try {
        console.log("id client req");
        console.log(id);
        const { data } = await axiosInstance({
            method: 'get',
            url: `/appointment/${id}`,
        });
        return data.patientAppointment;
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

export const updateAppointment = async (appointment, id) => {
    try {
        const { data } = await axiosInstance({
            method: 'patch',
            url: `appointment/${id}`,
            data: { ...appointment }
        });
        return data.users;
    } catch (e) {
        console.log(e)
    }
}