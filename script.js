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
// 把B站链接填进对应年份的引号里就行，没有的先留空字符串 ''
const fancamLinks = {
  otter: {
    2020: '',
    2021: '',
    2022: '',
    2023: '',
    2024: '',
    2025: '',
    2026: ''
  },
  deer: {
    2020: '',
    2021: '',
    2022: '',
    2023: '',
    2024: '',
    2025: '',
    2026: ''
  }
};

const yearGrid = document.getElementById('year-grid');
const fancamTip = document.getElementById('fancam-tip');
const tabBtns = document.querySelectorAll('.tab-btn');
let currentCat = 'otter';

function renderYears(){
  yearGrid.innerHTML = '';
  const years = Object.keys(fancamLinks[currentCat]);
  years.forEach(year => {
    const link = fancamLinks[currentCat][year];
    const btn = document.createElement('button');
    btn.className = 'year-btn' + (link ? '' : ' empty');
    btn.textContent = year;
    btn.addEventListener('click', () => {
      if(link){
        window.open(link, '_blank');
      } else {
        fancamTip.textContent = year + ' 年暂时还没有链接哦~';
      }
    });
    yearGrid.appendChild(btn);
  });
}

tabBtns.forEach(tab => {
  tab.addEventListener('click', () => {
    tabBtns.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentCat = tab.dataset.cat;
    fancamTip.textContent = '暂无链接，稍后更新~';
    renderYears();
  });
});

renderYears();
