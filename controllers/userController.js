const user = require("../models/users");

const createUser = (req, res) => {
    const {name, rut, ocupation} = req.body;
    const newUser = new user({
        name,
        rut,
        ocupation,
    });

    newUser.save((error, person) => {
        if(error) {
            return res.status(400).send({ message: "Error creating user" });
        }
        return res.status(201).send(person);
    });
};

const getUsers = (req, res) => {
    user.find({}, (error, person) => {
        if(error) {
            return res.status(400).send({ message: "Error finding users" });
        }
        if(person.length === 0) {
            return res.status(404).send({ message: "No users found" });
        }
        return res.status(200).send(person);
    });
};

const updateUser = (req, res) => {
    const { id } = req.params;
    user.findByIdAndUpdate(id, req.body, (error, person) => {
        if(error) {
            return res.status(400).send({ message: "Error updating user" });
        }
        if(!person) {
            return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).send({ message: "User updated" });
    });
};

const deleteUser = (req, res) => {
    const { id } = req.params;
    user.findByIdAndDelete(id, (error, person) => {
        if(error) {
            return res.status(400).send({ message: "Error deleting user" });
        }
        if(!person) {
            return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).send({ message: "User deleted" });
    });
};

const getUserById = (req, res) => {
    const { id } = req.params;
    user.findById(id, (error, person) => {
        if(error) {
            return res.status(400).send({ message: "Error" });
        }
        if(!person) {
            return res.status(404).send({ message: "User not found" });
        }
        return res.status(200).send(person);
    });
};

module.exports = {
    createUser,
    getUsers,
    updateUser,
    deleteUser,
    getUserById,
};