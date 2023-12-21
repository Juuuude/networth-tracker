import axios from 'axios';
import type { UserData } from '../types';

// const config = useRuntimeConfig();
// const url = config.public.firebaseUrl;
const url = 'https://networth-tracker-2bfc0-default-rtdb.firebaseio.com/'

export default {
    async addNewUser(formData: UserData) {
        try {
            const response = await axios.post(url + 'users.json/', formData);
            return response;
        } catch (error) {
            throw error;
        }
    },

    async fetchUsers() {
        try {
            const response = await axios.get(url + 'users.json/');
            return response;
        } catch (error) {
            throw error;
        }
    },

    async updateUser(notes: string, id: string) {
        try {
            const response = await axios.patch(url + '/users/' + id + '.json', { notes })
            return response;
        } catch (error) {
            throw error;
        }
    },

    async deleteContact(id: string) {
        try {
            const response = await axios.delete(url + '/users/' + id + '.json')
            return response
        } catch (error) {
            throw error;
        }
    }

};
