const app = require("./app.js")

async function main(){
	// start server 
	try{
		await app.listen( app.get('port') , ()=>{
			console.log('server on port ' + app.get('port') );
		})
	} catch {
		console.log("Error to the start server")
	}

}

main()