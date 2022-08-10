const express = require('express');
const { checkIfAuthenticated } = require('../middleware/auth.middleware');
const { viewAllUsers, viewUserById, updateUser, changePassword, activityLog, userPhotoUpdate, assignUserRole, userRole, deleteUser} = require('../controllers/backend/user.backend.controller');

const Multer = require('multer');

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
});




const router = express.Router();




///BACKEND////////
router.get('/users', checkIfAuthenticated, viewAllUsers);
     // .get('/users', checkIfAuthenticated, users);
router.get('/user/:id', checkIfAuthenticated, viewUserById);
router.put('/update_user', checkIfAuthenticated, updateUser);
router.post('/change_password', checkIfAuthenticated, changePassword);
router.get('/activity_log', checkIfAuthenticated, activityLog);
router.put('/change_user_photo', multer.single('file'), userPhotoUpdate);
router.get('/assign_role', checkIfAuthenticated, assignUserRole);
router.get('/user_role', checkIfAuthenticated, userRole);
router.post('/delete_user', checkIfAuthenticated, deleteUser);




module.exports = {
    routes: router
}