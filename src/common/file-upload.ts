import { diskStorage } from 'multer';
const fs = require('fs');
const path = require('path');

const options = {
	storage: diskStorage({
		destination: function (req, file, cb) {
			let filePath = `../../public/uploads/`;
			fs.mkdirSync(filePath, { recursive: true });
			cb(null, filePath);
		},
		filename: function (req, file, cb) {
			const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
			cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
		},
	}),
};

export default options;
