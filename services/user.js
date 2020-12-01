import User from '../model/user.js';

export const createAccount = async(data) => User.create(data); // creating a user

export const lol = () => {
    console.log("lol");
};