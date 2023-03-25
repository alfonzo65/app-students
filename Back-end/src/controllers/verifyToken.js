const jwt = require('jsonwebtoken');

async function verifyToken( req, res, next){
	try {
		const [ , token ] = req.headers.authorization.split(" ");

		const access = await jwt.verify( token , process.env.SECRET )
	
		if( access.username )
			next()

	} catch(e) {
		// statements
		return res.status(401).json({message:"Token - signature Invalid or " + e.message , success: 0 })
	}
	
}

module.exports = verifyToken;