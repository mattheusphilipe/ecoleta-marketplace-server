const multer = require('multer');
const path = require('path');
// hash para criar o nome do arquivo único
const crypto = require('crypto');

module.exports = 
{
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..','userUploads'),
        filename(request, file, callback) 
        {
            const hash =  crypto.randomBytes(6).toString('hex');

            const fileName = `${hash}-${file.originalname}`;

            // priemri parametro é uma função de erro, ams é quase impossivel as 2 linhas de cima darem erro.
            callback(null, fileName);
        }
    })
};