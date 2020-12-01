import Admin from '../model/admin.js';

export const createAdminAccount = async(data) => Admin.create(data); //legge til bruker i db

export const lol = () => {
    console.log("lol");
};