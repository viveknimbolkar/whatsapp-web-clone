import axios from 'axios'

const url = 'http://localhost:8000'

export const addUser = async (data) => {
    try {
        const ENDPOINT = "/add"
        const response = await axios.post(url + ENDPOINT, { data: data });
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const getAllUsers = async () => {
    try {
        const ENDPOINT = "/users"
        const res = await axios.get(url + ENDPOINT);
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const setConversation = async (data) => {
    try {
        const endpoint = '/conversation/add';
        await axios.post(url + endpoint, data)
    } catch (error) {
        console.log(error.message);
    }
}

export const getConversation = async (data) => {
    try {
        const endpoint = '/conversation/get';
        let response = await axios.post(url + endpoint, data)
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const newMessage = async (data) => {
    try {
        const endpoint = '/message/add';
        await axios.post(url + endpoint, data)
    } catch (error) {
        console.log(error.message);
    }
}
export const getMessages = async (id) => {
    try {
        const endpoint = `/message/get/${id}`;
        let response = await axios.get(url + endpoint)
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const uploadFileToServer = async (data) => {
    try {
        const endpoint = `/file/upload`;
        let response = await axios.post(url + endpoint, data)
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const updateBio = async (data) => {
    try {
        const endpoint = `/users/update/bio`;
        let response = await axios.post(url + endpoint, data)
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}


export const getChatWallpaper = async (userid) => {
    try {
        const endpoint = `/users/get/chatwallpaper`;
        let response = await axios.post(url + endpoint, userid)
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}

export const updateChatWallpaper = async (data) => {
    try {
        const endpoint = `/users/update/chatwallpaper`;
        let response = await axios.post(url + endpoint, data)
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
}