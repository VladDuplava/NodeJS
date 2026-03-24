const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const server = http.createServer((req, res) => {
    // Шлях, куди збережемо розпакований файл
    const outputPath = path.join(__dirname, 'received_file.txt');
    const writeStream = fs.createWriteStream(outputPath);

    // Ланцюжок: Запит -> Розпаковка (Gzip) -> Запис у файл
    req.pipe(zlib.createGunzip()).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('Файл успішно отримано, розпаковано та збережено як received_file.txt');
        res.writeHead(201);
        res.end('Success: File processed');
    });

    writeStream.on('error', (err) => {
        console.error('Помилка запису:', err);
        res.writeHead(500);
        res.end('Server Error');
    });
});

server.listen(4000, () => console.log('Сервер прийому файлів працює на порту 4000'));
