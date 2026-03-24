const http = require('http');

// Токен, який ми очікуємо від клієнта
const VALID_TOKEN = "Bearer ekV5Rk4wMlgvYVpCbmp5WUh5bHVPMktwMzkty05QeDRjT3FlWlNiUTJhbVpraHc5d3Y5a3YtU2pM";

const server = http.createServer((req, res) => {
    const authHeader = req.headers['authorization'];

    if (authHeader === VALID_TOKEN) {
        res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Доступ дозволено: Статус 200');
    } else {
        res.writeHead(401, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Помилка: Статус 401 (Неавторизовано)');
    }
});

server.listen(3000, () => {
    console.log('Сервер завдання №1 запущено на http://localhost:3000/');
});
