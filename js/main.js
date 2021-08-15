const hr = document.getElementById(`hr`);
const min = document.getElementById(`min`);
const sec = document.getElementById(`sec`);
const bar = document.getElementsByClassName(`bar`);
const dot = document.getElementsByClassName(`dot`);
const digital = document.getElementById(`digital`);
// 宣告一個setDate 的函數來取#clock 的時間
const setDate = () => {
  let now = new Date();
  // hr: 360/12= 30度，min、sec: 360/60= 6度
  // 後面的 + ((30 / 60) * now.getMinutes()) 這是讓時針一格的30度，再細分為60等分，然後乘以分鐘，這樣時針就會按照分鐘的值等比例微調，後面以此類推
  hr.style.transform = `rotate(${
    now.getHours() * 30 + (30 / 60) * now.getMinutes()
  }deg)`;
  min.style.transform = `rotate(${
    now.getMinutes() * 6 + (6 / 60) * now.getSeconds()
  }deg)`;
  sec.style.transform = `rotate(${
    now.getSeconds() * 6 + (6 / 1000) * now.getMilliseconds()
  }deg)`;
};
setDate();
// 上兩行的效果是做成秒針持續移動(乘以毫秒的比例)，因此setInterval 的時距縮短為10毫秒，效果才會出來
setInterval(setDate, 10);

// 這是印bar 的迴圈
for (let i = 1; i < 12; i++) {
  if (i == 3 || i == 6 || i == 9) {
    continue;
  }
  // 每個bar 的translateY 距離都是 500%
  bar[i].style.transform = `rotate(${i * 30}deg) translateY(475%)`;
  bar[i].style.background = `#000`;
}

// 這是印dot 的迴圈
for (let i = 1; i < dot.length; i++) {
  dot[i].style.transform = `rotate(${i * 6}deg) translateY(500%)`;
  dot[i].style.color = `#000`;
}

// 這邊是digitTime 的函數
const digitTime = () => {
  let now = new Date();
  let yr = now.getFullYear(); // 西元年
  let mon = now.getMonth(); // 0~11
  let date = now.getDate(); // 1~31
  switch (mon) {
    case 0:
      mon = `Jan`;
      break;
    case 1:
      mon = `Feb`;
      break;
    case 2:
      mon = `Mar`;
      break;
    case 3:
      mon = `Apr`;
      break;
    case 4:
      mon = `May`;
      break;
    case 5:
      mon = `Jun`;
      break;
    case 6:
      mon = `Jul`;
      break;
    case 7:
      mon = `Aug`;
      break;
    case 8:
      mon = `Sep`;
      break;
    case 9:
      mon = `Oct`;
      break;
    case 10:
      mon = `Nov`;
      break;
    case 11:
      mon = `Dec`;
      break;
  }
  let h = now.getHours(); // 0~23
  let m = now.getMinutes(); // 0~59
  let s = now.getSeconds(); // 0~59
  let session = `AM`;
  if (h == 0) {
    h = 12;
  } else if (h > 12) {
    h = h - 12;
    session = `PM`;
  }
  h = h < 10 ? `0` + h : h;
  m = m < 10 ? `0` + m : m;
  s = s < 10 ? `0` + s : s;

  let showTime = `${h}:${m}:${s} ${session}`;
  let showDate = `${mon} ${date}, ${yr}`;
  digital.innerHTML = `${showDate}<br>${showTime}`;
};
digitTime();
setInterval(digitTime, 1000);
