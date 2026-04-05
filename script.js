// ================================================
// скрипт мини-приложения
// ================================================

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
    motherboard: [
        {id:1, name:"MSI B650M Gaming Plus WiFi", price:9490},
        {id:2, name:"Gigabyte B650 Gaming X AX", price:14490},
        {id:3, name:"ASUS ROG Strix B650-E", price:28990},
    ],
    ram: [
        {id:1, name:"Kingston Fury Beast 32GB DDR5-6000", price:8990},
        {id:2, name:"Corsair Vengeance 32GB DDR5-6400", price:10990},
        {id:3, name:"Kingston Fury Beast 64GB DDR5-6000", price:18990},
    ],
    gpu: [
        {id:1, name:"RTX 5070 12GB", price:67990},
        {id:2, name:"RTX 5070 Ti 16GB", price:89990},
        {id:3, name:"RX 7800 XT 16GB", price:58990},
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

// ====================== ссылки на ozon и dns ======================
const storeLinks = {
    cpu: { ozon: "https://www.ozon.ru/category/protsessory-15726/", dns: "https://www.dns-shop.ru/catalog/17a899cd16404e77/processory/" },
    motherboard: { ozon: "https://www.ozon.ru/category/materinskie-platy-15725/", dns: "https://www.dns-shop.ru/catalog/17a89a0416404e77/materinskie-platy/" },
    ram: { ozon: "https://www.ozon.ru/category/operativnaya-pamyat-15724/", dns: "https://www.dns-shop.ru/catalog/2d514a593baa7fd7/operativnaa-pamat/" },
    gpu: { ozon: "https://www.ozon.ru/category/videokarty-15721/", dns: "https://www.dns-shop.ru/catalog/17a89aab16404e77/videokarty/" },
    ssd: { ozon: "https://www.ozon.ru/category/ssd-nakopiteli-15712/", dns: "https://www.dns-shop.ru/catalog/8a9ddfba20724e77/ssd-nakopiteli/" },
    psu: { ozon: "https://www.ozon.ru/category/bloki-pitaniya-15727/", dns: "https://www.dns-shop.ru/catalog/17a89c2216404e77/bloki-pitania/" },
    case: { ozon: "https://www.ozon.ru/category/korpusa-dlya-kompyuterov-15734/", dns: "https://www.dns-shop.ru/catalog/17a89c5616404e77/korpusa/" }
};

// показываем категорию
function showCategory(category) {
    const container = document.getElementById('items');
    container.innerHTML = '';

    const linkDiv = document.createElement('div');
    linkDiv.style = "grid-column: 1 / -1; text-align: center; margin-bottom: 15px;";
    linkDiv.innerHTML = `
        <a href="${storeLinks[category].ozon}" target="_blank" style="background:#ff6600; color:white; padding:10px 18px; border-radius:10px; margin:0 5px; text-decoration:none;">🛒 ozon</a>
        <a href="${storeLinks[category].dns}" target="_blank" style="background:#ff6600; color:white; padding:10px 18px; border-radius:10px; margin:0 5px; text-decoration:none;">🛒 dns</a>
    `;
    container.appendChild(linkDiv);

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

function addToBuild(category, name, price) {
    currentBuild[category] = {name, price};
    updateBuildSummary();
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

    list.innerHTML = html || 'пока ничего не выбрано';
    document.getElementById('totalPrice').textContent = `итого: ${total.toLocaleString('ru-RU')} ₽`;
}

// ====================== ГОТОВЫЕ СБОРКИ ======================
function showReadyBuilds() {
    const container = document.getElementById('items');
    container.innerHTML = '<h2 style="grid-column:1/-1; text-align:center; margin-bottom:15px;">📦 готовые сборки</h2>';

    const builds = [
        {name:"💼 офисная / учебная", price:58900, items:["Ryzen 5 9600X", "32GB DDR5", "RTX 4060"]},
        {name:"🎮 игровая 1440p", price:148900, items:["Ryzen 7 9700X", "32GB DDR5", "RTX 5070 Ti"]},
        {name:"🚀 максимальная", price:289000, items:["Ryzen 9 9900X", "64GB DDR5", "RTX 5080"]}
    ];

    builds.forEach(build => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <h3>${build.name}</h3>
            <p style="margin:8px 0; font-size:14px;">${build.items.join(" • ")}</p>
            <div class="price">${build.price.toLocaleString('ru-RU')} ₽</div>
            <button class="add-btn" onclick="alert('сборка выбрана!')">выбрать</button>
        `;
        container.appendChild(card);
    });
}

// ====================== ВИДЕО ПОСОБИЕ ======================
function showVideoGuide() {
    const container = document.getElementById('items');
    container.innerHTML = `
        <div style="text-align:center; padding:40px 20px;">
            <h2>🎥 видео пособие по сборке пк</h2>
            <p style="margin:20px 0;">как правильно собрать компьютер в 2026 году</p>
            <a href="https://www.youtube.com/watch?v=0EoZ55otT8I" target="_blank" 
               style="display:inline-block; background:#ff0000; color:white; padding:16px 32px; 
                      border-radius:12px; text-decoration:none; font-size:18px;">
                ▶ смотреть видео (1 час 10 мин)
            </a>
            <p style="margin-top:25px; opacity:0.8;">рекомендуется посмотреть перед первой сборкой</p>
        </div>
    `;
};

// запуск — по умолчанию показываем процессоры
window.onload = () => {
    showCategory('cpu');
};
