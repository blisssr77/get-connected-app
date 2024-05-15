const router = require("express").Router()
const userCtrl = require("./userController")
const studentCtrl = require("./studentController")
const freelancerCtrl = require("./freelancerController")
const { verifyToken } = require("../middleware/verifyToken")

// user routes
router.post("/auth/loginsignup", userCtrl.signup)
router.post("/auth/signup", userCtrl.signup)
router.post("/auth/login", userCtrl.login)
router.get("/user", userCtrl.getUser)

// Placed under auth endpoints because we want to protect all other routes
router.use(verifyToken)

// Routes below

module.exports = router