const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

const options = {
    hostname: 'localhost',
    port: 4000,
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'gzip'
    }
};

const req = http.request(options, (res) => {
    console.log(`Статус відповіді сервера: ${res.statusCode}`);
    res.on('data', (chunk) => console.log('Відповідь:', chunk.toString()));
});

// Перевірка чи існує файл перед відправкою
if (fs.existsSync('test.txt')) {
    const readStream = fs.createReadStream('test.txt');
    // Ланцюжок: Читання -> Стиснення -> Відправка через HTTP
    readStream.pipe(zlib.createGzip()).pipe(req);
} else {
    console.error('Помилка: Створіть файл test.txt для відправки!');
    req.end();
}
