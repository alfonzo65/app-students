const students = require("../controllers/students.controllers.js")
const { Router } = require("express")

const router = Router()

router.post("/api/students", students.registerNewUser )
router.post("/api/students/newUser", students.newUser )
router.get("/api/students/login", students.singIn )
// router.patch("/students/:id", students.updateStudent )
// router.put("/students" , students.updateStudents )

module.exports = router;