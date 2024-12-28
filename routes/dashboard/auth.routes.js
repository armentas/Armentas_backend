const express = require("express");
const { login, register, getAllUsers, getUser, updateUser, deleteUser, getEmail } = require("../../controllers/auth.controller");
const { checkPermission } = require("../../middlewares/checkPermission");
const { checkToken } = require("../../middlewares/checkToken");



const router = express.Router();

/*---------------------- Collections Endpoints -------------------------------------------------*/

router.post("/login", login);

router.post("/register", checkToken, checkPermission('Create'), register);

router.get("/getUsers", getAllUsers)

router.get("/getUser/:id", getUser)

router.get("/getEmail/:email", getEmail)

router.put("/updateUser/:id", checkToken, checkPermission('Update'), updateUser)

router.delete("/deleteUser/:id", checkToken, checkPermission('Delete'), deleteUser)

module.exports = router;