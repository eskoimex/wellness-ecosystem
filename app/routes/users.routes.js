const express = require('express');
const { checkIfUserAuthenticated } = require('../middleware/auth.middleware');
const { viewAllUsers, viewUserById, updateUser, changePassword, activityLog, userPhotoUpdate, assignUserRole, userRole, deleteUser} = require('../controllers/backend/user.backend.controller');

const Multer = require('multer');

const multer = Multer({
    storage: Multer.MemoryStorage,
    fileSize: 5 * 1024 * 1024
});




const router = express.Router();




///BACKEND////////
router.get('/all_users', checkIfUserAuthenticated, viewAllUsers);
     // .get('/users', checkIfUserAuthenticated, users);
router.get('/user', checkIfUserAuthenticated, viewUserById);
router.put('/update_user', checkIfUserAuthenticated, updateUser);
router.post('/change_password', checkIfUserAuthenticated, changePassword);
router.get('/activity_log', checkIfUserAuthenticated, activityLog);
router.put('/change_user_photo', multer.single('file'), userPhotoUpdate);
router.get('/assign_role', checkIfUserAuthenticated, assignUserRole);
router.get('/user_role', checkIfUserAuthenticated, userRole);
router.post('/delete_user', checkIfUserAuthenticated, deleteUser);




module.exports = {
    routes: router
}