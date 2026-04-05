// ================================================
// скрипт мини-приложения
// ================================================

// здесь хранится всё, что выбрал пользователь
let currentBuild = {};

// ====================== большая база комплектующих ======================
const componentsDB = {
    cpu: [
        {id:1, name:"AMD Ryzen 5 9600X", price:24990},
        {id:2, name:"AMD Ryzen 7 9700X", price:32990},
        {id:3, name:"AMD Ryzen 7 9800X3D", price:45990},
        {id:4, name:"Intel Core i5-14600K", price:32990},
        {id:5, name:"Intel Core i7-14700K", price:44990},
    ],
    gpu: [
        {id:1, name:"RTX 5070 12GB", price:67990},
        {id:2, name:"RTX 5070 Ti 16GB", price:89990},
        {id:3, name:"RX 7800 XT 16GB", price:58990},
    ],
    ram: [
        {id:1, name:"Kingston Fury Beast 32GB DDR5-6000", price:8990},
        {id:2, name:"Corsair Vengeance 32GB DDR5-6400", price:10990},
        {id:3, name:"Kingston Fury Beast 64GB DDR5-6000", price:18990},
    ],
    motherboard: [
        {id:1, name:"MSI B650M Gaming Plus WiFi", price:9490},
        {id:2, name:"Gigabyte B650 Gaming X AX", price:14490},
    ],
    ssd: [
        {id:1, name:"Samsung 990 EVO 1 ТБ", price:7990},
        {id:2, name:"Kingston NV2 1 ТБ", price:6990},
    ],
    psu: [
        {id:1, name:"Deepcool PF750 750W", price:8990},
        {id:2, name:"Corsair RM850x 850W", price:11990},
    ],
    case: [
        {id:1, name:"Lian Li Lancool 216", price:9490},
        {id:2, name:"Deepcool CC560 ARGB", price:4990},
    ]
};

// ====================== готовые сборки ======================
const readyBuilds = [
    {
        name: "💼 офисная / учебная",
        price: 58900,
        items: {
            cpu: {name: "AMD Ryzen 5 9600X", price: 24990},
            ram: {name: "Kingston Fury Beast 32GB DDR5-6000", price: 8990},
            gpu: {name: "RTX 4060 8GB", price: 32990},
            ssd: {name: "Samsung 990 EVO 1 ТБ", price: 7990}
        }
    },
    {
        name: "🎮 игровая 1440p",
        price: 148900,
        items: {
            cpu: {name: "AMD Ryzen 7 9700X", price: 32990},
            ram: {name: "Corsair Vengeance 32GB DDR5-6400", price: 10990},
            gpu: {name: "RTX 5070 Ti 16GB", price: 89990},
            ssd: {name: "Kingston NV2 2 ТБ", price: 12990}
        }
    }
];

// показываем товары выбранной категории
function showCategory(category) {
    const container = document.getElementById('items');
    container.innerHTML = '';

    // показываем кнопки ozon и dns
    const linkDiv = document.createElement('div');
    linkDiv.style = "grid-column: 1 / -1; text-align: center; margin-bottom: 15px;";
    linkDiv.innerHTML = `
        <a href="https://www.ozon.ru/category/protsessory-15726/" target="_blank" style="background:#ff6600; color:white; padding:10px 18px; border-radius:10px; margin:0 5px; text-decoration:none;">🛒 ozon</a>
        <a href="https://www.dns-shop.ru/catalog/17a899cd16404e77/processory/" target="_blank" style="background:#ff6600; color:white; padding:10px 18px; border-radius:10px; margin:0 5px; text-decoration:none;">🛒 dns</a>
    `;
    container.appendChild(linkDiv);

    // показываем карточки товаров
    componentsDB[category].forEach(item => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <h3>${item.name}</h3>
            <div class="price">${item.price.toLocaleString('ru-RU')} ₽</div>
            <button class="add-btn" onclick="addToBuild('${category}', '${item.name}', ${item.price})">
                добавить
            </button>
        `;
        container.appendChild(card);
    });
}

// добавляем выбранный товар в сборку
function addToBuild(category, name, price) {
    currentBuild[category] = {name, price};
    updateBuildSummary();
}

// обновляем список выбранных комплектующих
function updateBuildSummary() {
    const list = document.getElementById('componentsList');
    let html = '';
    let total = 0;

    for (let cat in currentBuild) {
        const item = currentBuild[cat];
        html += `<div>• ${item.name} — <b>${item.price.toLocaleString('ru-RU')} ₽</b></div>`;
        total += item.price;
    }

    list.innerHTML = html || 'пока ничего не выбрано';
    document.getElementById('totalPrice').textContent = `итого: ${total.toLocaleString('ru-RU')} ₽`;
}

// показываем готовые сборки
function showReadyBuilds() {
    const container = document.getElementById('items');
    container.innerHTML = '<h2 style="grid-column:1/-1; text-align:center; margin-bottom:15px;">📦 готовые сборки</h2>';

    readyBuilds.forEach((build, index) => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <h3>${build.name}</h3>
            <p style="margin:8px 0; font-size:14px;">${Object.values(build.items).map(i => i.name).join(" • ")}</p>
            <div class="price">${build.price.toLocaleString('ru-RU')} ₽</div>
            <button class="add-btn" onclick="loadReadyBuild(${index})">
                выбрать эту сборку
            </button>
        `;
        container.appendChild(card);
    });
}

// автоматически добавляем все комплектующие из готовой сборки
function loadReadyBuild(index) {
    const build = readyBuilds[index];
    currentBuild = {...build.items};   // копируем все комплектующие
    updateBuildSummary();
    alert(`✅ сборка "${build.name}" загружена!`);
}

// показываем видео пособие
function showVideoGuide() {
    const container = document.getElementById('items');
    container.innerHTML = `
        <div style="text-align:center; padding:40px 20px;">
            <h2>🎥 видео пособие</h2>
            <p style="margin:20px 0;">как правильно собрать пк в 2026 году</p>
            <a href="https://www.youtube.com/watch?v=0EoZ55otT8I" target="_blank" 
               style="display:inline-block; background:#ff0000; color:white; padding:16px 32px; 
                      border-radius:12px; text-decoration:none; font-size:18px;">
                ▶ смотреть видео
            </a>
        </div>
    `;
};

// при открытии страницы сразу показываем процессоры
window.onload = () => {
    showCategory('cpu');
};
