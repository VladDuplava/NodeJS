/**
 * Отримайте дані від найшвидшого сервера
 * * @returns {Promise<{server: string, data: string, responseTime: number}>}
 */
function fetchFromFastestServer() {
    // 1. Створюємо масив промісів (запитів до серверів)
    const requests = [
        fetchFromServer('Server A', 1000),
        fetchFromServer('Server B', 500),
        fetchFromServer('Server C', 800)
    ];

    // 2. Використовуємо Promise.race, щоб отримати перший успішний результат
    return Promise.race(requests);
}

// Допоміжна функція (вже надана у вашому коді)
function fetchFromServer(serverName, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                server: serverName,
                data: `Data from ${serverName}`,
                responseTime: delay
            });
        }, delay);
    });
}

// Перевірка:
fetchFromFastestServer()
    .then(result => console.log('✅ Тест 10.3 (найшвидший сервер):', result));
// Очікується: { server: 'Server B', data: 'Data from Server B', responseTime: 500 }