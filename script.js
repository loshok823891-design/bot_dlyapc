
let currentBuild = {};

const componentsDB = {
    cpu: [
        {id:1, name:"AMD Ryzen 5 5600", price:12490, level:"mid"},
        {id:2, name:"AMD Ryzen 5 7600", price:18990, level:"mid"},
        {id:3, name:"AMD Ryzen 5 9600X", price:24990, level:"mid"},
        {id:4, name:"AMD Ryzen 7 7700", price:26990, level:"high"},
        {id:5, name:"AMD Ryzen 7 9700X", price:32990, level:"high"},
        {id:6, name:"AMD Ryzen 7 9800X3D", price:45990, level:"gaming"},
        {id:7, name:"AMD Ryzen 9 9900X", price:58990, level:"gaming"},
        {id:8, name:"Intel Core i5-14600K", price:32990, level:"mid"},
        {id:9, name:"Intel Core i7-14700K", price:44990, level:"high"},
        {id:10, name:"Intel Core i9-14900K", price:67990, level:"gaming"},
    ],
    gpu: [
        {id:1, name:"RTX 4060 8GB", price:32990, level:"mid"},
        {id:2, name:"RTX 4060 Ti 8GB", price:42990, level:"mid"},
        {id:3, name:"RTX 5060 8GB", price:37990, level:"mid"},
        {id:4, name:"RTX 5070 12GB", price:67990, level:"high"},
        {id:5, name:"RTX 5070 Ti 16GB", price:89990, level:"high"},
        {id:6, name:"RTX 5080 16GB", price:129990, level:"gaming"},
        {id:7, name:"RX 7600 8GB", price:28990, level:"mid"},
        {id:8, name:"RX 7800 XT 16GB", price:58990, level:"high"},
        {id:9, name:"RX 9070 XT 16GB", price:74990, level:"high"},
    ],
    ram: [
        {id:1, name:"16 ГБ DDR5-6000", price:4290, capacity:16},
        {id:2, name:"32 ГБ DDR5-6000 (2x16)", price:8990, capacity:32},
        {id:3, name:"32 ГБ DDR5-6400", price:10990, capacity:32},
        {id:4, name:"64 ГБ DDR5-6000 (2x32)", price:18990, capacity:64},
        {id:5, name:"64 ГБ DDR5-6400", price:21990, capacity:64},
        {id:6, name:"128 ГБ DDR5-6000", price:42990, capacity:128},
    ],
    motherboard: [
        {id:1, name:"MSI B650M Gaming Plus WiFi", price:9490},
        {id:2, name:"Gigabyte B650 Gaming X AX", price:14490},
        {id:3, name:"ASUS ROG Strix B650-E", price:28990},
        {id:4, name:"MSI MAG B760 Tomahawk WiFi", price:16990},
        {id:5, name:"Gigabyte Z790 Gaming X AX", price:24990},
    ],
    ssd: [
        {id:1, name:"512 ГБ NVMe Gen4", price:3290},
        {id:2, name:"1 ТБ NVMe Gen4", price:6990},
        {id:3, name:"2 ТБ NVMe Gen4", price:12990},
        {id:4, name:"4 ТБ NVMe Gen4", price:25990},
        {id:5, name:"1 ТБ NVMe Gen5", price:11990},
        {id:6, name:"2 ТБ NVMe Gen5", price:22990},
    ],
    psu: [
        {id:1, name:"500W 80+ Bronze", price:4490, watt:500},
        {id:2, name:"650W 80+ Gold", price:6990, watt:650},
        {id:3, name:"750W 80+ Gold", price:8990, watt:750},
        {id:4, name:"850W 80+ Gold Modular", price:11990, watt:850},
        {id:5, name:"1000W 80+ Platinum", price:17990, watt:1000},
        {id:6, name:"1200W 80+ Platinum", price:22990, watt:1200},
    ],
    case: [
        {id:1, name:"Deepcool CC560 ARGB", price:4990},
        {id:2, name:"Lian Li Lancool 216", price:9490},
        {id:3, name:"NZXT H6 Flow", price:12990},
        {id:4, name:"Fractal Design Meshify 2", price:15990},
        {id:5, name:"Corsair 4000D Airflow", price:13990},
        {id:6, name:"be quiet! Pure Base 500DX", price:10990},
    ]
};

// ==================== ПРОВЕРКА BOTTLENECK ====================
function checkBottleneck() {
    let warnings = [];
    const cpu = currentBuild.cpu;
    const gpu = currentBuild.gpu;
    const ram = currentBuild.ram;
    const psu = currentBuild.psu;

    if (cpu && gpu) {
        if (cpu.level === "mid" && gpu.level === "high") {
            warnings.push("⚠️ Слабый процессор под мощную видеокарту — будет bottleneck");
        }
        if (cpu.level === "gaming" && gpu.level === "mid") {
            warnings.push("⚠️ Видеокарта слабее процессора — можно взять мощнее");
        }
    }

    if (ram && ram.capacity < 32) {
        warnings.push("⚠️ Мало оперативной памяти (рекомендуется минимум 32 ГБ)");
    }

    if (gpu && psu) {
        let needed = gpu.level === "gaming" ? 850 : gpu.level === "high" ? 750 : 550;
        if (psu.watt < needed) {
            warnings.push(`⚠️ Слабый блок питания (${psu.watt}W). Нужно минимум ${needed}W`);
        }
    }

    return warnings;
}

// Обновляем отображение сборки
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

    // Показываем предупреждения
    const warnings = checkBottleneck();
    if (warnings.length > 0) {
        let warningHTML = '<div style="margin-top:12px; padding:10px; background:#3a2a00; border-radius:10px; color:#ffdd88; font-size:14px;">';
        warningHTML += warnings.join('<br>');
        warningHTML += '</div>';
        list.innerHTML += warningHTML;
    }
}

// Показываем товары выбранной категории
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
                Добавить в сборку
            </button>
        `;
        container.appendChild(card);
    });
}

// Добавляем комплектующее
function addToBuild(category, id, name, price) {
    currentBuild[category] = {id, name, price};
    updateBuildSummary();
}

// Инициализация
window.onload = () => {
    showCategory('cpu'); // По умолчанию открываем процессоры
};
