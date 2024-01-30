const express = require('express');
const route = express.Router();
const { createUser, getAllUsers, getUserById, updateUserById, updateUserPath, deleteUserById, authUser } = require('../service/service');
const { buildResponse } = require('../helper/buildResponse');
const { createToken } = require('../helper/jwt');

route.post('/reg', async (req, res) => {
  try {
    const { username, email, phone, pwd } = req.body;
    const data = await createUser(username, email, phone, pwd);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.post('/auth', async (req, res) => {
  try {
    const { email, pwd } = req.body;
    const data = await authUser(email, pwd);
    const token = createToken();
    res.setHeader('access_token', token);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.get('/', async (req, res) => {
  try {
    const data = await getAllUsers();
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getUserById(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, phone, pwd } = req.body;
    const data = await updateUserById(id, username, email, phone, pwd);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await deleteUserById(id);
    buildResponse(res, 200, data);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

route.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await updateUserPath(id, body);
    buildResponse(res, 200, user);
  } catch (error) {
    buildResponse(res, 404, error.message);
  }
});

module.exports = route;
