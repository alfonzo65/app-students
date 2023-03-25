const courses = require("../controllers/courses.controllers.js")
const verifyToken = require("../controllers/verifyToken.js")
const { Router } = require("express");

const router = Router()


router.get("/api/students/courses", verifyToken, courses.getCourses )
router.post("/api/students/courses", verifyToken, courses.addCourses )
router.delete("/api/students/courses", verifyToken, courses.deleteCourses )
router.put("/api/students/courses", verifyToken, courses.updateCourses )


module.exports = router