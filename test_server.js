const http = require("http");
const fs = require("fs");
const path = require("path");

let server = http.createServer((request, response) => {
	const file_path = path.join(
		__dirname,
		request.url === "/" ? "index.html" : request.url,
	);

	if (!fs.existsSync(file_path)) {
		console.log(`${file_path} does not exist.`);
		response.writeHeader(404);
		response.write("Page not found.");
		response.end();
		return;
	}

	let content_type = "text/plain";
	switch(path.extname(file_path)) {
		case ".html":
			content_type = "text/html";
			break;
		case ".css":
			content_type = "text/css";
			break;
		case ".js":
			content_type = "text/javascript";
			break;
	}

	response.writeHeader(200, {"Content-Type": content_type});

	let readStream = fs.createReadStream(file_path);
	readStream.pipe(response);
});

server.listen(8080, "localhost", (err) => {
	if (err) throw err;
	console.log("Listening...");
});
