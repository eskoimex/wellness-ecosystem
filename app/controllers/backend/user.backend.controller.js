'use strict';
const { handleResError } = require("../../utils/err.util");
const { usersViewAll, userViewById, userUpdate, passwordChange, userActivityLog, updateUserPhoto, assignRole, getUserRole, userDelete } = require("../../functions/user.function");
//const { validateAdsData } = require('../../validators/ads.validator');


const viewAllUsers = async (req, res, next) => {
  try {
    await usersViewAll(req, res);
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
};

const viewUserById = async (req, res, next) => {
  try {
    await userViewById(req, res);
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
};

const updateUser = async (req, res, next) => {
  try {
    await userUpdate(req, res);
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
};


const changePassword = async (req, res, next) => {
  try {
    await passwordChange(req, res);
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
};


const activityLog = async (req, res, next) => {
  try {
    await userActivityLog(req, res);
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
};

const userPhotoUpdate = async (req, res, next) => {
  try {
    await updateUserPhoto(req, res);
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
};



const assignUserRole = async (req, res, next) => {
  try {
    await assignRole(req, res);
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
};

const userRole = async (req, res, next) => {
  try {
    await getUserRole(req, res);
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
};


const deleteUser = async (req, res, next) => {
  try {
    await userDelete(req, res);
  } catch (e) {
    handleResError(res, e, res.statusCode);
  }
};

module.exports = { viewAllUsers, viewUserById, updateUser, changePassword, activityLog, userPhotoUpdate, assignUserRole, userRole, deleteUser }