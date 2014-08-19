var sys = require("sys"),
http = require("http"),
path = require("path"),
url = require("url"),
filesys = require("fs"),
mime = require("./serverModules/mime.js");

var listenOnPort = 8080;

http.createServer(function(request,response){
	var requestedPath = url.parse(request.url).pathname;
  if (requestedPath == "/") {
    requestedPath = "html/item.html";
  }
	var full_path = path.join(process.cwd(),requestedPath);

	path.exists(full_path,function(exists){
		if(!exists){
			response.writeHeader(404, {"Content-Type": "text/plain"});  
			response.write("404 Not Found\n");  
			response.end();
		}
		else{
			filesys.readFile(full_path, "binary", function(err, file) {  
			     if(err) {  
			         response.writeHeader(500, {"Content-Type": "text/plain"});  
			         response.write(err + "\n");  
			         response.end();  
			   
			     }  
				 else{

          var ext = full_path.split('.').pop();
          responseType = mime.mimeType[ext];

          if (responseType === undefined)
              responseType = "text/plain";

					response.writeHeader(200, {"Content-Type": responseType});  
			        response.write(file, 'binary');  
			        response.end();
				}
					 
			});
		}
	});
}).listen(listenOnPort);
sys.puts("Server Running on " + listenOnPort);			

