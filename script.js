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
