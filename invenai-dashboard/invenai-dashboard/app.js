// =============================================
// INVENAI – AI Inventory Management Dashboard
// app.js – Mock Data + All Logic
// =============================================

// =============================================
// MOCK DATA
// =============================================
const products = [
  { id: 1,  name: "Umbrella (Black)", category: "Accessories", region: "Chennai",   stock: 42,  sold: 310, price: 349, reorder: 60 },
  { id: 2,  name: "Umbrella (Foldable)", category: "Accessories", region: "Mumbai",  stock: 28,  sold: 275, price: 399, reorder: 50 },
  { id: 3,  name: "Raincoat (Men)", category: "Clothing",    region: "Chennai",   stock: 15,  sold: 198, price: 699, reorder: 40 },
  { id: 4,  name: "Raincoat (Women)", category: "Clothing",  region: "Bangalore", stock: 60,  sold: 145, price: 749, reorder: 30 },
  { id: 5,  name: "Sunscreen SPF 50", category: "Accessories", region: "Delhi",    stock: 320, sold: 540, price: 199, reorder: 100 },
  { id: 6,  name: "Sunglasses (UV400)", category: "Accessories", region: "Mumbai", stock: 180, sold: 420, price: 499, reorder: 80 },
  { id: 7,  name: "Portable Fan", category: "Electronics", region: "Delhi",    stock: 95,  sold: 360, price: 799, reorder: 50 },
  { id: 8,  name: "Water Bottle (Steel)", category: "Home & Kitchen", region: "Bangalore", stock: 220, sold: 290, price: 349, reorder: 60 },
  { id: 9,  name: "Sports Shoes", category: "Footwear",   region: "Chennai",   stock: 75,  sold: 180, price: 1299, reorder: 40 },
  { id: 10, name: "Running Shoes", category: "Footwear",   region: "Mumbai",   stock: 110, sold: 230, price: 1499, reorder: 50 },
  { id: 11, name: "Cotton T-Shirt", category: "Clothing",  region: "Delhi",    stock: 450, sold: 620, price: 299, reorder: 100 },
  { id: 12, name: "Wireless Earbuds", category: "Electronics", region: "Bangalore", stock: 58,  sold: 310, price: 1799, reorder: 40 },
  { id: 13, name: "Yoga Mat", category: "Accessories", region: "Chennai",   stock: 12,  sold: 88,  price: 549, reorder: 30 },
  { id: 14, name: "Denim Jacket", category: "Clothing", region: "Delhi",    stock: 36,  sold: 95,  price: 1599, reorder: 25 },
  { id: 15, name: "Smart Watch", category: "Electronics", region: "Mumbai",  stock: 22,  sold: 145, price: 3499, reorder: 20 },
  { id: 16, name: "Hand Sanitizer", category: "Accessories", region: "Bangalore", stock: 6,   sold: 512, price: 99,  reorder: 100 },
];

const salesHistory = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  sales: [42000, 55000, 48000, 70000, 65000, 88000, 72000],
};

const monthlyRevenue = {
  labels: ["Mar", "Apr", "May", "Jun", "Jul", "Aug"],
  data: [320000, 295000, 410000, 380000, 450000, 520000],
};

const productTrends = {
  umbrella:  { labels: ["W1","W2","W3","W4","W5","W6","W7","W8"], data: [80, 95, 130, 175, 220, 268, 310, 342] },
  raincoat:  { labels: ["W1","W2","W3","W4","W5","W6","W7","W8"], data: [40, 55, 80,  110, 145, 170, 190, 198] },
  sunscreen: { labels: ["W1","W2","W3","W4","W5","W6","W7","W8"], data: [120,140,200, 280, 360, 430, 490, 540] },
  sunglasses:{ labels: ["W1","W2","W3","W4","W5","W6","W7","W8"], data: [90, 120,160, 210, 270, 330, 380, 420] },
};

const forecastData = {
  Umbrella:   { current: 70, hist: [200,240,275,310], pred: [380,430,490,540,610], rec: 600, stockout: "3 days", priority: "critical" },
  Raincoat:   { current: 75, hist: [120,145,170,198], pred: [220,255,280,310,340], rec: 300, stockout: "6 days", priority: "high" },
  Sunscreen:  { current: 320, hist: [350,420,480,540], pred:[600,680,750,820,900], rec: 500, stockout: "18 days", priority: "medium" },
  Fan:        { current: 95, hist: [260,310,340,360], pred: [400,440,480,510,550], rec: 450, stockout: "10 days", priority: "high" },
  Sunglasses: { current: 180, hist: [300,350,390,420], pred:[460,500,540,580,620], rec: 400, stockout: "22 days", priority: "low" },
};

const regionData = [
  { name: "Chennai",   flag: "🌧️", stock: 544,  revenue: 428000, demand: 92, topProduct: "Umbrella (Black)",    unitsSold: 596 },
  { name: "Mumbai",    flag: "🌆", stock: 398,  revenue: 389000, demand: 85, topProduct: "Sunglasses (UV400)", unitsSold: 1070 },
  { name: "Delhi",     flag: "☀️", stock: 901,  revenue: 512000, demand: 78, topProduct: "Cotton T-Shirt",     unitsSold: 1520 },
  { name: "Bangalore", flag: "🌿", stock: 690,  revenue: 356000, demand: 70, topProduct: "Water Bottle (Steel)",unitsSold: 745 },
];

// =============================================
// NAVIGATION
// =============================================
function activatePage(sectionId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + sectionId)?.classList.add('active');
  document.getElementById('nav-' + sectionId)?.classList.add('active');

  if (sectionId === 'dashboard') initDashboard();
  if (sectionId === 'inventory') renderInventoryTable();
  if (sectionId === 'sales') initSalesCharts();
  if (sectionId === 'ai-agent') renderAIAgent();
  if (sectionId === 'alerts') renderAlerts();
  if (sectionId === 'forecast') initForecast();
  if (sectionId === 'regional') initRegional();
  if (sectionId === 'simulator') { initSimulator(); updateSimResults(); }
}

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', e => {
    e.preventDefault();
    const section = item.dataset.section;
    activatePage(section);
    if (window.innerWidth < 768) {
      document.getElementById('sidebar').classList.remove('open');
    }
  });
});

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// =============================================
// HELPERS
// =============================================
function getStatus(product) {
  if (product.stock === 0) return { label: 'Stock-out', cls: 'critical' };
  if (product.stock <= product.reorder * 0.4) return { label: 'Critical', cls: 'critical' };
  if (product.stock <= product.reorder) return { label: 'Low Stock', cls: 'low' };
  if (product.sold > 400) return { label: 'High Demand', cls: 'hot' };
  return { label: 'In Stock', cls: 'ok' };
}

function formatINR(n) {
  return '₹' + n.toLocaleString('en-IN');
}

function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  setTimeout(() => t.className = 'toast', 3000);
}

// =============================================
// DASHBOARD
// =============================================
function initDashboard() {
  renderKPIs();
  renderInventoryChart();
  renderSalesTrendChart();
  renderHighDemandList();
  renderLowStockList();
}

function renderKPIs() {
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const totalSold  = products.reduce((s, p) => s + p.sold, 0);
  const todaySales = 88000;
  const lowStockCount = products.filter(p => p.stock <= p.reorder).length;
  const highDemand = products.filter(p => p.sold > 300).length;
  const revenue = products.reduce((s, p) => s + p.sold * p.price, 0);

  const kpis = [
    { icon: '📦', label: 'Total Products',   value: products.length, change: '+2 this week', dir: 'up', color: 'var(--accent)' },
    { icon: '🏬', label: 'Current Stock',    value: totalStock.toLocaleString(), change: '-3.2% vs last week', dir: 'down', color: 'var(--accent2)' },
    { icon: '💰', label: 'Sales Today',      value: formatINR(todaySales), change: '+18.4% vs yesterday', dir: 'up', color: 'var(--accent3)' },
    { icon: '⚠️', label: 'Low Stock Items',  value: lowStockCount, change: '3 critical', dir: 'neutral', color: 'var(--warn)' },
    { icon: '🔥', label: 'High Demand',      value: highDemand, change: '+5 products', dir: 'up', color: 'var(--accent)' },
    { icon: '📊', label: 'Total Revenue',    value: formatINR(revenue), change: '+22.1% this month', dir: 'up', color: 'var(--accent)' },
  ];

  const grid = document.getElementById('kpiGrid');
  grid.innerHTML = kpis.map(k => `
    <div class="kpi-card" style="--kpi-color:${k.color}">
      <div class="kpi-icon">${k.icon}</div>
      <div class="kpi-label">${k.label}</div>
      <div class="kpi-value">${k.value}</div>
      <div class="kpi-change ${k.dir}">${k.dir === 'up' ? '▲' : k.dir === 'down' ? '▼' : '●'} ${k.change}</div>
    </div>
  `).join('');
}

let invChart, stChart;
function renderInventoryChart() {
  const ctx = document.getElementById('inventoryChart').getContext('2d');
  if (invChart) invChart.destroy();
  const cats = [...new Set(products.map(p => p.category))];
  const stockByCategory = cats.map(c => products.filter(p => p.category === c).reduce((s, p) => s + p.stock, 0));
  invChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: cats,
      datasets: [{
        label: 'Stock',
        data: stockByCategory,
        backgroundColor: ['#7252D6','#9A7AE5','#B29AEF','#C78932','#D45C7B'],
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: { ...darkChartOptions(), plugins: { legend: { display: false } } }
  });
}

function renderSalesTrendChart() {
  const ctx = document.getElementById('salesTrendChart').getContext('2d');
  if (stChart) stChart.destroy();
  stChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: salesHistory.labels,
      datasets: [{
        label: 'Sales (₹)',
        data: salesHistory.sales,
        borderColor: '#7252D6',
        backgroundColor: 'rgba(114,82,214,0.12)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#7252D6',
        pointRadius: 4,
      }]
    },
    options: { ...darkChartOptions() }
  });
}

function renderHighDemandList() {
  const high = [...products].sort((a, b) => b.sold - a.sold).slice(0, 5);
  document.getElementById('highDemandList').innerHTML = high.map(p => `
    <div class="demand-item">
      <div>
        <div class="demand-name">${p.name}</div>
        <div class="demand-region">${p.region} · ${p.category}</div>
      </div>
      <div class="demand-pct">${p.sold} units</div>
    </div>
  `).join('');
}

function renderLowStockList() {
  const low = products.filter(p => p.stock <= p.reorder).sort((a,b) => a.stock - b.stock);
  document.getElementById('lowStockList').innerHTML = low.map(p => {
    const s = getStatus(p);
    return `
      <div class="low-stock-item">
        <div>
          <div class="demand-name">${p.name}</div>
          <div class="demand-region">${p.region} · Reorder at ${p.reorder}</div>
        </div>
        <span class="badge-status ${s.cls}">${p.stock} left</span>
      </div>
    `;
  }).join('');
}

// =============================================
// INVENTORY TABLE
// =============================================
let filteredProducts = [...products];

function renderInventoryTable(list) {
  const data = list || filteredProducts;
  const tbody = document.getElementById('inventoryBody');
  tbody.innerHTML = data.map(p => {
    const s = getStatus(p);
    return `
      <tr>
        <td><strong style="color:var(--text-primary)">${p.name}</strong></td>
        <td>${p.category}</td>
        <td>${p.region}</td>
        <td>${p.stock}</td>
        <td>${p.sold}</td>
        <td><span class="badge-status ${s.cls}">${s.label}</span></td>
        <td>
          <button class="btn btn-secondary" style="padding:0.3rem 0.7rem;font-size:0.75rem" onclick="quickEdit(${p.id})">Edit</button>
        </td>
      </tr>
    `;
  }).join('');

  // Populate update dropdown
  document.getElementById('updateProductSelect').innerHTML = products.map(p =>
    `<option value="${p.id}">${p.name} (${p.region})</option>`
  ).join('');
}

document.getElementById('inventorySearch').addEventListener('input', applyInventoryFilters);
document.getElementById('categoryFilter').addEventListener('change', applyInventoryFilters);
document.getElementById('regionFilter').addEventListener('change', applyInventoryFilters);

function applyInventoryFilters() {
  const search = document.getElementById('inventorySearch').value.toLowerCase();
  const cat = document.getElementById('categoryFilter').value;
  const region = document.getElementById('regionFilter').value;

  filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search) &&
    (cat === '' || p.category === cat) &&
    (region === '' || p.region === region)
  );
  renderInventoryTable();
}

function quickEdit(id) {
  openModal('updateStockModal');
  document.getElementById('updateProductSelect').value = id;
}

// =============================================
// SALES CHARTS
// =============================================
let monthChart, catPieChart, prodTrendChart;

function initSalesCharts() {
  renderMonthlyRevenue();
  renderCategorySales();
  renderProductTrend('umbrella');
  renderTopSalesTable();
}

function renderMonthlyRevenue() {
  const ctx = document.getElementById('monthlyRevenueChart').getContext('2d');
  if (monthChart) monthChart.destroy();
  monthChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: monthlyRevenue.labels,
      datasets: [{
        label: 'Revenue (₹)',
        data: monthlyRevenue.data,
        backgroundColor: 'rgba(114,82,214,0.78)',
        borderRadius: 6,
        borderSkipped: false,
      }]
    },
    options: { ...darkChartOptions() }
  });
}

function renderCategorySales() {
  const ctx = document.getElementById('categorySalesChart').getContext('2d');
  if (catPieChart) catPieChart.destroy();
  const cats = [...new Set(products.map(p => p.category))];
  const soldByCat = cats.map(c => products.filter(p => p.category === c).reduce((s, p) => s + p.sold, 0));
  catPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: cats,
      datasets: [{
        data: soldByCat,
        backgroundColor: ['#7252D6','#9A7AE5','#B29AEF','#C78932','#D45C7B'],
        borderColor: '#FFFFFF',
        borderWidth: 3,
      }]
    },
    options: {
      ...darkChartOptions(),
      plugins: { legend: { position: 'right', labels: { color: '#64748B', font: { size: 11 } } } }
    }
  });
}

function renderProductTrend(key) {
  const ctx = document.getElementById('productTrendChart').getContext('2d');
  if (prodTrendChart) prodTrendChart.destroy();
  const d = productTrends[key];
  prodTrendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: d.labels,
      datasets: [{
        label: 'Units Sold',
        data: d.data,
        borderColor: '#4A9D7B',
        backgroundColor: 'rgba(74,157,123,0.12)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#4A9D7B',
        pointRadius: 5,
      }]
    },
    options: { ...darkChartOptions() }
  });
}

function updateProductTrendChart() {
  const val = document.getElementById('productTrendFilter').value;
  renderProductTrend(val);
}

function renderTopSalesTable() {
  const top = [...products].sort((a,b) => b.sold - a.sold).slice(0, 8);
  document.getElementById('topSalesBody').innerHTML = top.map((p, i) => `
    <tr>
      <td><strong style="color:var(--text-primary)">${p.name}</strong></td>
      <td>${p.category}</td>
      <td>${p.sold}</td>
      <td>${formatINR(p.sold * p.price)}</td>
      <td><span class="trend ${i < 4 ? 'up' : 'down'}">${i < 4 ? '+' + (Math.floor(Math.random()*30)+10) : '-' + (Math.floor(Math.random()*15)+3)}%</span></td>
    </tr>
  `).join('');
}

// =============================================
// AI AGENT
// =============================================
const aiInsights = [
  { type: 'warning', icon: '📈', title: 'Umbrella demand increased by 58%', desc: 'Umbrella sales in Chennai surged 58% over the past week due to monsoon onset. Current stock may deplete within 3 days.', meta: 'Confidence: 97% · Source: Sales velocity + weather API', action: 'Restock' },
  { type: 'danger',  icon: '⏰', title: 'Umbrella stock may run out in 3 days', desc: 'At current sales velocity of 44 units/day, the 42-unit stock in Chennai will be exhausted in under 3 days.', meta: 'Urgency: CRITICAL · Region: Chennai', action: 'Order Now' },
  { type: 'info',    icon: '🌧️', title: 'Rainy-season products in high demand – Chennai', desc: 'Chennai is experiencing peak rainy season. Umbrellas, raincoats, and waterproof bags are all trending upward.', meta: 'Demand Index: 9.2/10 · Season: Monsoon', action: 'View Report' },
  { type: 'success', icon: '💡', title: 'Increase umbrella stock in Chennai by 250 units', desc: 'AI recommends ordering 250+ units within 24 hours to avoid stock-out and capture peak seasonal demand.', meta: 'Estimated Revenue Gain: ₹87,250 · ROI: 94%', action: 'Place Order' },
  { type: 'warning', icon: '🌡️', title: 'Delhi heatwave driving sunscreen demand', desc: 'SPF 50 sunscreen sales in Delhi up 42% this week. Consider bundling with sunglasses for a summer combo deal.', meta: 'Confidence: 91% · Trending Region: Delhi', action: 'Create Bundle' },
  { type: 'info',    icon: '📦', title: 'Wireless Earbuds slow-moving in Bangalore', desc: 'Earbuds stock has not moved for 12 days in Bangalore. Consider a price promotion or transfer to Mumbai.', meta: 'Days Without Sale: 12 · Suggested Action: Discount 15%', action: 'Run Promo' },
  { type: 'success', icon: '🚀', title: 'Cotton T-Shirt hitting record sales in Delhi', desc: 'Cotton T-Shirts crossed 620 units sold this month—highest in 6 months. Pre-order next batch to sustain momentum.', meta: 'Growth: +36% MoM · Stock Health: Good', action: 'Reorder' },
];

const actionQueue = [
  { icon: '🚨', title: 'Restock Umbrella – Chennai', sub: 'Order 250 units from Supplier A', priority: 'urgent' },
  { icon: '⚡', title: 'Restock Raincoat – Chennai', sub: 'Order 100 units · 6 days remaining', priority: 'urgent' },
  { icon: '🔄', title: 'Transfer Earbuds to Mumbai', sub: '58 units idle in Bangalore for 12 days', priority: 'medium' },
  { icon: '💰', title: 'Bundle Sunscreen + Sunglasses', sub: 'Delhi summer promo – est. ₹48K gain', priority: 'medium' },
  { icon: '📊', title: 'Review Q3 slow-movers', sub: '4 products below sell-through threshold', priority: 'low' },
];

const marketSignals = [
  { icon: '🌧️', title: 'Monsoon season – South India', sub: 'Chennai, Bangalore: peak rainy season (Aug–Sep)' },
  { icon: '☀️', title: 'Heatwave – Delhi-NCR', sub: 'Temperature 41°C+ driving FMCG demand surge' },
  { icon: '🛒', title: 'Festive pre-shopping begins', sub: 'Diwali prep: electronics & fashion trending up 22%' },
  { icon: '🏭', title: 'Supplier A lead time extended', sub: '7→12 days due to port congestion (Mumbai)' },
  { icon: '📉', title: 'Cotton prices down 8%', sub: 'Opportunity to stock up on Clothing category' },
];

function renderAIAgent() {
  document.getElementById('aiInsightCards').innerHTML = `
    <div class="ai-insights-grid">
      ${aiInsights.map(i => `
        <div class="insight-card ${i.type}">
          <div class="insight-icon">${i.icon}</div>
          <div>
            <div class="insight-title">${i.title}</div>
            <div class="insight-desc">${i.desc}</div>
            <div class="insight-meta">${i.meta}</div>
          </div>
        </div>
      `).join('')}
    </div>`;

  document.getElementById('actionQueue').innerHTML = actionQueue.map(a => `
    <div class="action-item">
      <div class="action-icon">${a.icon}</div>
      <div class="action-text">
        <div class="action-title">${a.title}</div>
        <div class="action-sub">${a.sub}</div>
      </div>
      <span class="action-pill ${a.priority}">${a.priority}</span>
    </div>
  `).join('');

  document.getElementById('marketSignals').innerHTML = marketSignals.map(s => `
    <div class="signal-item">
      <div class="action-icon">${s.icon}</div>
      <div class="action-text">
        <div class="action-title">${s.title}</div>
        <div class="action-sub">${s.sub}</div>
      </div>
    </div>
  `).join('');
}

// =============================================
// ALERTS
// =============================================
const allAlerts = [
  { type: 'danger',  cat: 'stock-out',  icon: '🚨', title: 'CRITICAL: Hand Sanitizer nearly out of stock', detail: 'Only 6 units left in Bangalore. At current demand rate, stock-out in < 12 hours.', time: '2m ago' },
  { type: 'danger',  cat: 'low-stock',  icon: '⚠️', title: 'Low Stock: Umbrella (Black) – Chennai', detail: '42 units remaining. Reorder point is 60. Order immediately.', time: '15m ago' },
  { type: 'danger',  cat: 'low-stock',  icon: '⚠️', title: 'Low Stock: Raincoat (Men) – Chennai', detail: '15 units remaining. Reorder point is 40. 6 days estimated until stock-out.', time: '22m ago' },
  { type: 'warning', cat: 'high-demand',icon: '🔥', title: 'High Demand: Sunscreen SPF50 – Delhi', detail: '540 units sold this month—42% above forecast. Increase reorder quantity.', time: '1h ago' },
  { type: 'warning', cat: 'high-demand',icon: '🔥', title: 'High Demand: Portable Fan – Delhi', detail: 'Fan sales spiking due to Delhi heatwave. 360 units sold, 95 remaining.', time: '2h ago' },
  { type: 'warning', cat: 'seasonal',   icon: '🌧️', title: 'Seasonal Alert: Monsoon peak in Chennai & Bangalore', detail: 'Weather data shows heavy rainfall expected. Prep rain-gear inventory urgently.', time: '3h ago' },
  { type: 'danger',  cat: 'stock-out',  icon: '🚨', title: 'Stock-Out Risk: Yoga Mat – Chennai', detail: 'Only 12 units left. Reorder point at 30. Estimated stock-out in 4 days.', time: '4h ago' },
  { type: 'warning', cat: 'slow-moving',icon: '🐢', title: 'Slow Moving: Denim Jacket – Delhi', detail: 'Only 95 units sold in 30 days. 36 units still in stock. Consider markdown.', time: '6h ago' },
  { type: 'warning', cat: 'slow-moving',icon: '🐢', title: 'Slow Moving: Wireless Earbuds – Bangalore', detail: 'No sales in past 12 days despite 58 units in stock. Price reduction recommended.', time: '1d ago' },
];

function renderAlerts() {
  const cats = [
    { key: 'stock-out',  label: '🚨 Stock-Out Risk',     color: '#D45C7B' },
    { key: 'low-stock',  label: '⚠️ Low Stock',          color: '#C78932' },
    { key: 'high-demand',label: '🔥 High Demand',         color: '#7252D6' },
    { key: 'seasonal',   label: '🌧️ Seasonal Demand',     color: '#4A9D7B' },
    { key: 'slow-moving',label: '🐢 Slow-Moving Products',color: '#64748b' },
  ];

  const counts = { danger: 0, warning: 0, info: 0 };
  allAlerts.forEach(a => counts[a.type] = (counts[a.type] || 0) + 1);

  document.getElementById('alertSummaryBar').innerHTML = `
    <div class="alert-count-card"><div class="count" style="color:#D45C7B">${allAlerts.filter(a=>a.type==='danger').length}</div><div class="label">Critical</div></div>
    <div class="alert-count-card"><div class="count" style="color:#C78932">${allAlerts.filter(a=>a.type==='warning').length}</div><div class="label">Warnings</div></div>
    <div class="alert-count-card"><div class="count" style="color:#4A9D7B">${allAlerts.length}</div><div class="label">Total Alerts</div></div>
    <div class="alert-count-card"><div class="count" style="color:#7252D6">4</div><div class="label">Regions Affected</div></div>
  `;

  document.getElementById('alertsContainer').innerHTML = cats.map(cat => {
    const catAlerts = allAlerts.filter(a => a.cat === cat.key);
    if (!catAlerts.length) return '';
    return `
      <div class="alert-group">
        <div class="alert-group-title" style="color:${cat.color}">${cat.label} <span style="font-size:0.7rem;background:${cat.color}22;color:${cat.color};padding:2px 8px;border-radius:12px">${catAlerts.length}</span></div>
        ${catAlerts.map(a => `
          <div class="alert-item ${a.type}">
            <div class="alert-icon">${a.icon}</div>
            <div class="alert-body">
              <div class="alert-title">${a.title}</div>
              <div class="alert-detail">${a.detail}</div>
            </div>
            <div class="alert-time">${a.time}</div>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');
}

// =============================================
// FORECAST
// =============================================
let forecastChart, recStockChart;

function initForecast() {
  updateForecastChart();
  renderRecommendedStockChart();
  renderForecastTable();
}

function updateForecastChart() {
  const product = document.getElementById('forecastProductFilter').value;
  const fd = forecastData[product];

  const ctx = document.getElementById('forecastChart').getContext('2d');
  if (forecastChart) forecastChart.destroy();

  const histLabels = ['Week -4', 'Week -3', 'Week -2', 'Week -1'];
  const predLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'];

  forecastChart = new Chart(ctx, {
    data: {
      labels: [...histLabels, ...predLabels],
      datasets: [
        {
          type: 'bar',
          label: 'Historical Sales',
          data: [...fd.hist, null, null, null, null, null],
          backgroundColor: 'rgba(114,82,214,0.58)',
          borderRadius: 4,
        },
        {
          type: 'line',
          label: 'Predicted Demand',
          data: [null, null, null, fd.hist[3], ...fd.pred],
          borderColor: '#9A7AE5',
          backgroundColor: 'rgba(154,122,229,0.12)',
          fill: true,
          tension: 0.4,
          borderDash: [5, 4],
          pointRadius: 4,
          pointBackgroundColor: '#9A7AE5',
        }
      ]
    },
    options: { ...darkChartOptions() }
  });
}

function renderRecommendedStockChart() {
  const ctx = document.getElementById('recommendedStockChart').getContext('2d');
  if (recStockChart) recStockChart.destroy();
  const products_list = Object.keys(forecastData);
  recStockChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: products_list,
      datasets: [
        {
          label: 'Current Stock',
          data: products_list.map(p => forecastData[p].current),
          backgroundColor: 'rgba(114,82,214,0.65)',
          borderRadius: 4,
        },
        {
          label: 'Recommended Stock',
          data: products_list.map(p => forecastData[p].rec),
          backgroundColor: 'rgba(74,157,123,0.65)',
          borderRadius: 4,
        }
      ]
    },
    options: { ...darkChartOptions() }
  });
}

function renderForecastTable() {
  const priorityColor = { critical: '#D45C7B', high: '#C78932', medium: '#7252D6', low: '#4A9D7B' };
  document.getElementById('forecastTableBody').innerHTML = Object.entries(forecastData).map(([name, d]) => `
    <tr>
      <td><strong style="color:var(--text-primary)">${name}</strong></td>
      <td>${d.current}</td>
      <td>${d.pred.reduce((s,v) => s+v, 0)}</td>
      <td>${Math.max(0, d.rec - d.current)}</td>
      <td style="color:${d.priority === 'critical' ? '#D45C7B' : d.priority === 'high' ? '#C78932' : 'var(--text-secondary)'}">
        ${d.stockout}
      </td>
      <td><span class="badge-status ${d.priority === 'critical' ? 'critical' : d.priority === 'high' ? 'low' : d.priority === 'medium' ? 'hot' : 'ok'}">${d.priority}</span></td>
    </tr>
  `).join('');
}

// =============================================
// REGIONAL ANALYSIS
// =============================================
let regStockChart, regRevChart;

function initRegional() {
  renderRegionCards();
  renderRegionalStockChart();
  renderRegionalRevenueChart();
  renderRegionalTable();
}

function renderRegionCards() {
  document.getElementById('regionCards').innerHTML = regionData.map(r => `
    <div class="region-card">
      <div class="region-flag">${r.flag}</div>
      <div class="region-name">${r.name}</div>
      <div class="region-city">India</div>
      <div class="region-stat"><span>Stock</span><span>${r.stock}</span></div>
      <div class="region-stat"><span>Revenue</span><span>${formatINR(r.revenue)}</span></div>
      <div class="region-stat"><span>Demand Index</span><span style="color:${r.demand > 85 ? '#4A9D7B' : r.demand > 70 ? '#C78932' : '#D45C7B'}">${r.demand}/100</span></div>
    </div>
  `).join('');
}

function renderRegionalStockChart() {
  const ctx = document.getElementById('regionalStockChart').getContext('2d');
  if (regStockChart) regStockChart.destroy();
  regStockChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: regionData.map(r => r.name),
      datasets: [{
        label: 'Stock Units',
        data: regionData.map(r => r.stock),
        borderColor: '#7252D6',
        backgroundColor: 'rgba(114,82,214,0.15)',
        pointBackgroundColor: '#7252D6',
      }, {
        label: 'Units Sold',
        data: regionData.map(r => r.unitsSold),
        borderColor: '#9A7AE5',
        backgroundColor: 'rgba(154,122,229,0.12)',
        pointBackgroundColor: '#9A7AE5',
      }]
    },
    options: {
      ...darkChartOptions(),
      scales: {
        r: {
          ticks: { color: '#64748B', backdropColor: 'transparent' },
          grid: { color: '#E2E8F0' },
          pointLabels: { color: '#64748B', font: { size: 12 } },
        }
      }
    }
  });
}

function renderRegionalRevenueChart() {
  const ctx = document.getElementById('regionalRevenueChart').getContext('2d');
  if (regRevChart) regRevChart.destroy();
  regRevChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: regionData.map(r => r.name),
      datasets: [{
        data: regionData.map(r => r.revenue),
        backgroundColor: ['#7252D6','#9A7AE5','#4A9D7B','#C78932'],
        borderColor: '#FFFFFF',
        borderWidth: 3,
      }]
    },
    options: { ...darkChartOptions(), plugins: { legend: { position: 'bottom', labels: { color: '#64748B', font: { size: 11 } } } } }
  });
}

function renderRegionalTable() {
  document.getElementById('regionalTableBody').innerHTML = regionData.map(r => `
    <tr>
      <td>${r.flag} <strong style="color:var(--text-primary)">${r.name}</strong></td>
      <td>${r.topProduct}</td>
      <td>${r.stock}</td>
      <td>${r.unitsSold}</td>
      <td>${formatINR(r.revenue)}</td>
      <td>
        <div style="display:flex;align-items:center;gap:0.5rem">
          <div style="flex:1;height:6px;background:#E2E8F0;border-radius:3px">
            <div style="width:${r.demand}%;height:100%;border-radius:3px;background:${r.demand > 85 ? '#4A9D7B' : r.demand > 70 ? '#C78932' : '#D45C7B'}"></div>
          </div>
          <span style="font-size:0.8rem;font-weight:600">${r.demand}</span>
        </div>
      </td>
    </tr>
  `).join('');
}

// =============================================
// SIMULATOR
// =============================================
let simChart;

const simBaseData = {
  Umbrella:   { stock: 42,  daily: 14, price: 374 },
  Raincoat:   { stock: 75,  daily: 10, price: 724 },
  Sunscreen:  { stock: 320, daily: 18, price: 199 },
  Fan:        { stock: 95,  daily: 12, price: 799 },
  Sunglasses: { stock: 180, daily: 14, price: 499 },
  'Water Bottle': { stock: 220, daily: 10, price: 349 },
};

function initSimulator() {
  document.getElementById('simMetricCards').innerHTML = '';
  document.getElementById('simRecList').innerHTML = '';
}

function updateSimResults() {
  const val = parseInt(document.getElementById('salesChangeSlider').value);
  document.getElementById('sliderVal').textContent = (val >= 0 ? '+' : '') + val + '%';
}

function runSimulation() {
  const product = document.getElementById('simProduct').value;
  const region  = document.getElementById('simRegion').value;
  const change  = parseInt(document.getElementById('salesChangeSlider').value);
  const days    = parseInt(document.getElementById('simDays').value) || 30;
  const lead    = parseInt(document.getElementById('simLeadTime').value) || 5;

  const base = simBaseData[product];
  const newDaily = base.daily * (1 + change / 100);
  const totalDemand = Math.round(newDaily * days);
  const shortage = Math.max(0, totalDemand - base.stock);
  const stockoutDay = Math.floor(base.stock / newDaily);
  const revenue = Math.round(Math.min(totalDemand, base.stock) * base.price);
  const lostRevenue = Math.round(shortage * base.price);

  document.getElementById('simMetricCards').innerHTML = [
    { label: 'Predicted Demand', val: totalDemand + ' units', sub: `${days}-day period`, color: '#7252D6' },
    { label: 'Stock Shortage', val: shortage > 0 ? shortage + ' units' : 'None', sub: shortage > 0 ? 'Order immediately' : 'Stock sufficient', color: shortage > 0 ? '#D45C7B' : '#4A9D7B' },
    { label: 'Est. Stock-out Day', val: stockoutDay <= days ? 'Day ' + stockoutDay : 'None', sub: stockoutDay <= days ? 'Before period ends' : 'No stock-out risk', color: stockoutDay <= days ? '#C78932' : '#4A9D7B' },
    { label: 'Revenue at Risk', val: formatINR(lostRevenue), sub: shortage > 0 ? 'Lost due to shortage' : 'No revenue at risk', color: lostRevenue > 0 ? '#D45C7B' : '#4A9D7B' },
    { label: 'Captured Revenue', val: formatINR(revenue), sub: 'From available stock', color: '#4A9D7B' },
    { label: 'Reorder Needed', val: Math.max(0, shortage + lead * Math.round(newDaily)) + ' units', sub: `Incl. ${lead}d lead time`, color: '#7252D6' },
  ].map(m => `
    <div class="sim-metric">
      <div class="sim-metric-label">${m.label}</div>
      <div class="sim-metric-val" style="color:${m.color}">${m.val}</div>
      <div class="sim-metric-sub">${m.sub}</div>
    </div>
  `).join('');

  // Simulator chart
  const labels = Array.from({ length: days }, (_, i) => `Day ${i + 1}`);
  const stockLevels = [];
  let cur = base.stock;
  for (let i = 0; i < days; i++) {
    cur = Math.max(0, cur - newDaily);
    stockLevels.push(Math.round(cur));
  }
  const reorderLine = Array(days).fill(Math.round(base.daily * 7));

  const ctx = document.getElementById('simChart').getContext('2d');
  if (simChart) simChart.destroy();
  simChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels.filter((_, i) => i % 3 === 0),
      datasets: [
        {
          label: 'Projected Stock',
          data: stockLevels.filter((_, i) => i % 3 === 0),
          borderColor: '#7252D6',
          backgroundColor: 'rgba(114,82,214,0.12)',
          fill: true,
          tension: 0.3,
          pointRadius: 3,
        },
        {
          label: 'Reorder Point',
          data: reorderLine.filter((_, i) => i % 3 === 0),
          borderColor: '#C78932',
          borderDash: [5, 4],
          pointRadius: 0,
          fill: false,
        }
      ]
    },
    options: { ...darkChartOptions() }
  });

  // Recommendations
  const recs = [];
  if (shortage > 0) recs.push({ icon: '🚨', text: `Order ${shortage + Math.round(lead * newDaily)} units immediately to cover demand + lead time.` });
  if (stockoutDay <= days) recs.push({ icon: '⏰', text: `Estimated stock-out on Day ${stockoutDay}. Place order at least ${lead} days before.` });
  if (change > 30) recs.push({ icon: '🔥', text: `Sales surge of ${change}% detected. Consider negotiating priority delivery with supplier.` });
  if (lostRevenue > 50000) recs.push({ icon: '💰', text: `Revenue at risk: ${formatINR(lostRevenue)}. Immediate restocking is financially critical.` });
  recs.push({ icon: '💡', text: `For ${region}, set safety stock to ${Math.round(newDaily * (lead + 3))} units to buffer lead time + 3-day buffer.` });

  document.getElementById('simRecList').innerHTML = recs.map(r => `
    <div class="sim-rec-item">
      <div class="sim-rec-icon">${r.icon}</div>
      <div class="sim-rec-text">${r.text}</div>
    </div>
  `).join('');

  showToast(`✅ Simulation complete for ${product} – ${region}`, 'success');
}

// =============================================
// MODALS
// =============================================
function openModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) overlay.classList.remove('open');
  });
});

function addProduct() {
  const name    = document.getElementById('newProductName').value.trim();
  const cat     = document.getElementById('newCategory').value;
  const region  = document.getElementById('newRegion').value;
  const stock   = parseInt(document.getElementById('newStock').value) || 0;
  const price   = parseInt(document.getElementById('newPrice').value) || 0;
  const reorder = parseInt(document.getElementById('newReorder').value) || 50;

  if (!name) { showToast('Please enter a product name', 'error'); return; }

  const newId = products.length + 1;
  products.push({ id: newId, name, category: cat, region, stock, sold: 0, price, reorder });
  filteredProducts = [...products];
  closeModal('addProductModal');
  renderInventoryTable();
  showToast(`✅ "${name}" added to inventory!`, 'success');
}

function updateStock() {
  const id  = parseInt(document.getElementById('updateProductSelect').value);
  const qty = parseInt(document.getElementById('updateQty').value) || 0;
  const type = document.querySelector('input[name="adjType"]:checked').value;
  const product = products.find(p => p.id === id);
  if (!product) return;

  if (type === 'add') product.stock += qty;
  else if (type === 'remove') product.stock = Math.max(0, product.stock - qty);
  else product.stock = qty;

  filteredProducts = [...products];
  closeModal('updateStockModal');
  renderInventoryTable();
  showToast(`✅ Stock updated for "${product.name}"`, 'success');
}

// =============================================
// CHART DEFAULTS
// =============================================
function darkChartOptions() {
  return {
    responsive: true,
    maintainAspectRatio: true,
    animation: { duration: 600, easing: 'easeOutQuart' },
    plugins: {
      legend: {
        labels: { color: '#847b96', font: { size: 11, family: 'Inter' } }
      },
      tooltip: {
        backgroundColor: '#FFFFFF',
         titleColor: '#332a47',
         bodyColor: '#847b96',
         borderColor: '#e8e2f2',
        borderWidth: 1,
      }
    },
    scales: {
      x: {
         ticks: { color: '#968da4', font: { size: 11 } },
         grid: { color: '#f0edf5' },
      },
      y: {
         ticks: { color: '#968da4', font: { size: 11 } },
         grid: { color: '#f0edf5' },
      }
    }
  };
}

// =============================================
// INIT
// =============================================
activatePage('dashboard');
