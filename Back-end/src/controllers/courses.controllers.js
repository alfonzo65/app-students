
const courses = {}

courses.getCourses = async (req,res) =>{
	
	return res.send("courses");
}

courses.addCourses = async (req,res) =>{

	return res.send("add courses");
}

courses.deleteCourses = async (req,res) =>{

	return res.send("delete courses");
}

courses.updateCourses = async (req,res) =>{

	return res.send("Update Courses")
}


module.exports = courses;