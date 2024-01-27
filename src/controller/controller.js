const express = require('express');
const { createUser, getAllUsers, getUserById, updateUserById, updateUserPath, deleteUserById, authUser } = require('../service/service');
const route = express.Router();

route.post('/reg', async (req, res) => {
  try {
    const { username, email, phone, pwd } = req.body;
    const data = await createUser(username, email, phone, pwd);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.post('/auth', async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const data = await authUser(email, pwd);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.get('/', async (req, res) => {
  try {
    const data = await getAllUsers();
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUserById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, phone, pwd } = req.body;
    const data = await updateUserById(id, username, email, phone, pwd);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteUserById(id);
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

route.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await updateUserPath(id, body);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = route;
