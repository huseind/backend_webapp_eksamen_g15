import User from '../model/user.js';

export const createAccount = async(data) => User.create(data); //legge til bruker i db

export const lol = () => {
    console.log("lol");
};