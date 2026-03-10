/**
 * @returns {Promise<{healthy: object[], unhealthy: object[], totalServers: number}>}
 */
async function monitorServers() {
    const servers = [
        { name: 'Server A', delay: 100, shouldFail: false },
        { name: 'Server B', delay: 300, shouldFail: true },
        { name: 'Server C', delay: 150, shouldFail: false },
        { name: 'Server D', delay: 500, shouldFail: true },
        { name: 'Server E', delay: 200, shouldFail: false }
    ];

    // 1. Створюємо масив промісів для кожного сервера
    const monitoringTasks = servers.map(s =>
        checkServerHealth(s.name, s.delay, s.shouldFail)
    );

    // 2. Чекаємо на завершення всіх перевірок
    const results = await Promise.allSettled(monitoringTasks);

    // 3. Формуємо масиви для звіту
    const healthy = results
        .filter(res => res.status === 'fulfilled')
        .map(res => res.value);

    const unhealthy = results
        .filter(res => res.status === 'rejected')
        .map(res => ({
            server: res.reason.message.split(' ')[0], // Дістаємо ім'я з помилки
            error: res.reason.message,
            status: 'down'
        }));

    return {
        healthy,
        unhealthy,
        totalServers: servers.length
    };
}

// Допоміжна функція (надана в умові)
function checkServerHealth(serverName, delay, shouldFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error(`${serverName} is down`));
            } else {
                resolve({
                    server: serverName,
                    status: 'healthy',
                    responseTime: delay
                });
            }
        }, delay);
    });
}

// Перевірка:
monitorServers()
    .then(report => {
        console.log('✅ Тест 11.4: Server Health Report');
        console.log('  Healthy:', report.healthy.length);   // Очікується: 3
        console.log('  Unhealthy:', report.unhealthy.length); // Очікується: 2
        console.log('  Total:', report.totalServers);      // Очікується: 5

        if (report.unhealthy.length > 0) {
            console.log('  Список непрацюючих:', report.unhealthy.map(s => s.server).join(', '));
        }
    });