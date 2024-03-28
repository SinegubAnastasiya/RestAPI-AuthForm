const {
  createUserDB,
  getAllUsersDB,
  updateUserByIdDB,
  updateUserPathDB,
  getUserByIdDB,
  deleteUserByIdDB,
  getUserByEmailDB,
} = require('../repository/repository');

async function createUser(username, email, phone, pwd) {
  const foundEmail = await getUserByEmailDB(email);
  if (foundEmail.length) throw new Error('Such user has already existed');
  const user = await createUserDB(username, email, phone, pwd);
  return user;
}

async function authUser(email, pwd) {
  const foundEmail = await getUserByEmailDB(email);
  if (!foundEmail.length) throw new Error('Such user does not exist');
  if (foundEmail[0]?.pwd != pwd) throw new Error('Invalid password');
  return foundEmail;
}

async function getAllUsers() {
  const data = await getAllUsersDB();
  if (!data.length) throw new Error('Array is empty');
  return data;
}

async function getUserById(id) {
  const data = await getUserByIdDB(id);
  if (!data.length) throw new Error('Array is empty');
  return data;
}

async function updateUserPath(id, body) {
  const user = await updateUserPathDB(id, body);
  if (id < 0) throw new Error('id is not valid');
  if (!user.length) throw new Error('data does not create');
  return user;
}

async function updateUserById(id, username, email, phone, pwd) {
  const user = await updateUserByIdDB(id, username, email, phone, pwd);
  return user;
}

async function deleteUserById(id) {
  const data = await deleteUserByIdDB(id);
  if (!data.length) throw new Error('Array is empty');
  return data;
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  updateUserPath,
  authUser,
};
