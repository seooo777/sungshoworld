// ===== 密码墙 =====
const SITE_PASSWORD = "3199"; // 想改密码，直接改这里的数字

const gate = document.getElementById('gate');
const main = document.getElementById('main');
const gateInput = document.getElementById('gate-input');
const gateBtn = document.getElementById('gate-btn');
const gateError = document.getElementById('gate-error');

function tryEnter(){
  if(gateInput.value.trim() === SITE_PASSWORD){
    gate.classList.add('hidden');
    main.classList.remove('hidden');
  } else {
    gateError.classList.add('show');
    gateInput.value = '';
    gateInput.focus();
  }
}

gateBtn.addEventListener('click', tryEnter);
gateInput.addEventListener('keydown', (e) => {
  if(e.key === 'Enter') tryEnter();
});

// ===== 心动互动 =====
const orbit = document.querySelector('.orbit');
const sparkBtn = document.getElementById('spark-btn');
const sparkNum = document.getElementById('spark-num');
let count = 0;

sparkBtn.addEventListener('click', () => {
  count++;
  sparkNum.textContent = count;
  orbit.classList.add('close');
  setTimeout(() => orbit.classList.remove('close'), 600);
});

// ===== 直拍记录 =====
const fancamCard = document.getElementById('fancam-card');
const fancamPage = document.getElementById('fancam-page');
const fancamBack = document.getElementById('fancam-back');
const fancamPageTitle = document.getElementById('fancam-page-title');
const yearsView = document.getElementById('fancam-years-view');
const listView = document.getElementById('fancam-list-view');
const yearGrid = document.getElementById('year-grid');
const fancamList = document.getElementById('fancam-list');
const fancamEmptyTip = document.getElementById('fancam-empty-tip');
const tabBtns = document.querySelectorAll('.tab-btn');

const catLabel = { otter: '小獭', deer: '小鹿' };
let currentCat = 'otter';
let currentYear = null;

// 把每条直拍信息填在对应年份的数组里，没有的年份留空数组 []
// cover 填封面图片链接，link 填B站视频链接，title 随便写一句话
const fancamData = {
  otter: {
    2020: [{title:'make a wish',cover:'http://p.q2f.cn/2nW1RA',link:'https://b23.tv/AHXMmXK'}],
    2021: [],
    2022: [],
    2023: [],
    2024: [],
    2025: [],
    2026: []
  },
  deer: {
    2020: [],
    2021: [],
    2022: [],
    2023: [],
    2024: [],
    2025: [],
    2026: []
  }
};

function renderYears(){
  yearGrid.innerHTML = '';
  Object.keys(fancamData[currentCat]).forEach(year => {
    const hasItems = fancamData[currentCat][year].length > 0;
    const btn = document.createElement('button');
    btn.className = 'year-btn' + (hasItems ? '' : ' empty');
    btn.textContent = year;
    btn.addEventListener('click', () => openYear(year));
    yearGrid.appendChild(btn);
  });
}

function openYear(year){
  currentYear = year;
  const items = fancamData[currentCat][year];

  fancamPageTitle.textContent = catLabel[currentCat] + ' · ' + year;
  yearsView.classList.add('hidden');
  listView.classList.remove('hidden');

  fancamList.innerHTML = '';
  if(items.length === 0){
    fancamEmptyTip.style.display = 'block';
  } else {
    fancamEmptyTip.style.display = 'none';
    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'fancam-card';
      card.innerHTML =
        '< img class="fancam-cover" src="' + item.cover + '" alt="">' +
        '<p class="fancam-card-title">' + item.title + '</p >';
      card.addEventListener('click', () => window.open(item.link, '_blank'));
      fancamList.appendChild(card);
    });
  }
}

function backToYears(){
  listView.classList.add('hidden');
  yearsView.classList.remove('hidden');
  fancamPageTitle.textContent = '直拍记录';
  currentYear = null;
}

fancamCard.addEventListener('click', () => {
  fancamPage.classList.remove('hidden');
  window.scrollTo(0, 0);
  backToYears();
});

fancamBack.addEventListener('click', () => {
  if(currentYear !== null){
    backToYears();
  } else {
    fancamPage.classList.add('hidden');
  }
});

tabBtns.forEach(tab => {
  tab.addEventListener('click', () => {
    tabBtns.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentCat = tab.dataset.cat;
    renderYears();
  });
});

renderYears();
