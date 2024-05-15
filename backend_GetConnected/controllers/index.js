const router = require("express").Router()
const userCtrl = require("./userController")
const studentCtrl = require("./studentCtrl")
const freelancerCtrl = require("./freelancerCtrl")
const { verifyToken } = require("../middleware/verifyToken")

// user routes
router.post("/auth/loginsignup", userCtrl.signup)
router.post("/auth/signup", userCtrl.signup)
router.post("/auth/login", userCtrl.login)
router.get("/user", userCtrl.getUser)

// Placed under auth endpoints because we want to protect all other routes
router.use(verifyToken)

// Freelancer Routes below
router.get('/', freelancerCtrl.getFreelancers);
router.post('/', freelancerCtrl.createFreelancer);
router.put('/:id', freelancerCtrl.updateFreelancer);
router.delete('/:id', freelancerCtrl.deleteFreelancer);

// student routes
router.get('/', studentCtrl.getStudents);
router.post('/', studentCtrl.createStudent);
router.put('/:id', studentCtrl.updateStudent);
router.delete('/:id', studentCtrl.deleteStudent);


module.exports = router