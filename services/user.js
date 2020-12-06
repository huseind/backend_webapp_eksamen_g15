import User from '../model/user.js';


export const register = async(data) => User.create(data); // creating a user

// getting user by email, the model spesifies that password should not be returned to a query
export const getUserByEmail = async(email, usePassword) =>{
    if(usePassword){ // return password if requested
        return User.findOne(email).select('+password');
    } // else, don't
    return User.findOne(email);
}

export const getUserById = async (id) => User.findById(id); // getting user by id