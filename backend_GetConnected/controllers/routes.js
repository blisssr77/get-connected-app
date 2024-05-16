const router = require("express").Router()
const userCtrl = require("./userController")
const studentCtrl = require("./studentCtrl")
const freelancerCtrl = require("./freelancerCtrl")
const upload = require("../middleware/upload")
const { verifyToken } = require("../middleware/verifyToken")

// user routes
router.post("/auth/loginsignup", userCtrl.signup)
router.post("/auth/signup", userCtrl.signup)
router.post("/auth/login", userCtrl.login)
router.get("/user", userCtrl.getUser)

// Placed under auth endpoints because we want to protect all other routes
router.use(verifyToken)

// Freelancer Routes below
router.get('/freelancers/', freelancerCtrl.getFreelancers);
router.post('/freelancers', freelancerCtrl.createFreelancer);
router.put('/freelancers/:id', freelancerCtrl.updateFreelancer);
router.delete('/freelancers/:id', freelancerCtrl.deleteFreelancer);

// student routes
router.get('/students', studentCtrl.getStudents);
router.post('/students', studentCtrl.createStudent);
router.post('/students', verifyToken, upload.single('photo'), studentCtrl.createStudent);
router.put('/students/:id', studentCtrl.updateStudent);
router.delete('/students/:id', studentCtrl.deleteStudent);


module.exports = router;