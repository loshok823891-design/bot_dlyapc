let currentBuild = {};

const componentsDB = {
    cpu: [
        {id:1, name:"AMD Ryzen 5 9600X", price:24990},
        {id:2, name:"AMD Ryzen 7 9700X", price:32990},
        {id:3, name:"AMD Ryzen 7 9800X3D", price:45990},
        {id:4, name:"Intel Core i7-14700K", price:44990},
    ],
    gpu: [
        {id:1, name:"RTX 5070 12GB", price:67990},
        {id:2, name:"RTX 5070 Ti 16GB", price:89990},
        {id:3, name:"RX 7800 XT", price:58990},
    ],
    ram: [
        {id:1, name:"32 ГБ DDR5-6000", price:8990},
        {id:2, name:"64 ГБ DDR5-6000", price:18990},
    ],
    motherboard: [
        {id:1, name:"MSI B650M Gaming Plus", price:9490},
        {id:2, name:"Gigabyte B650 Gaming X", price:14490},
    ],
    ssd: [
        {id:1, name:"1 ТБ NVMe Gen4", price:6990},
        {id:2, name:"2 ТБ NVMe Gen4", price:12990},
    ],
    psu: [
        {id:1, name:"750W 80+ Gold", price:8990},
        {id:2, name:"850W 80+ Gold", price:11990},
    ],
    case: [
        {id:1, name:"Lian Li Lancool 216", price:9490},
    ]
};

function showCategory(category) {
    const container = document.getElementById('items');
    container.innerHTML = '';

    componentsDB[category].forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <h3>${item.name}</h3>
            <div class="price">${item.price.toLocaleString('ru-RU')} ₽</div>
            <button class="add-btn" onclick="addToBuild('${category}', ${item.id}, '${item.name}', ${item.price})">
                Добавить
            </button>
        `;
        container.appendChild(card);
    });
}

function addToBuild(category, id, name, price) {
    currentBuild[category] = {id, name, price};
    updateBuildSummary();
    
    // Лёгкая анимация
    const summary = document.getElementById('buildSummary');
    summary.style.transition = 'all 0.3s';
    summary.style.transform = 'scale(1.03)';
    setTimeout(() => summary.style.transform = 'scale(1)', 200);
}

function updateBuildSummary() {
    const list = document.getElementById('componentsList');
    let html = '';
    let total = 0;

    for (let cat in currentBuild) {
        const item = currentBuild[cat];
        html += `<div>• ${item.name} — <b>${item.price.toLocaleString('ru-RU')} ₽</b></div>`;
        total += item.price;
    }

    list.innerHTML = html || 'Пока ничего не выбрано';
    document.getElementById('totalPrice').textContent = `Итого: ${total.toLocaleString('ru-RU')} ₽`;
}

// Инициализация
window.onload = () => {
    showCategory('cpu'); // по умолчанию показываем процессоры
};