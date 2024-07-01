const editor = document.getElementById('editor');
const input = document.getElementById('input');
const numbers = document.getElementById("numbers");
const consol = document.getElementById('consol');

var check = 0;
var z = 0;
var powermode = 0;
var coin = 0;
var errs = [];

console.log = function(message) {
  consol.value += message+"\n";
};

document.getElementById('send').addEventListener('click', () => {
  if (input.value != '') {
    if (input.value == "cls" | input.value == "Cls") {
      document.getElementById("status").style.color = "var(--status)";
      input.value = '';
      consol.value = '';
    }
    else {
      editor.innerHTML += input.value+'\n';
      input.value = '';
      input.focus();
    }
  }
  else return;
});

document.getElementById("refresh").addEventListener('click', () => {
  if (powermode == 0) {
    editor.removeAttribute('readonly');
    document.getElementById('refresh').style.color = "var(--accent)";
    powermode = 1;
  }
  else {
    editor.setAttribute('readonly', '');
    document.getElementById('refresh').style.color = "var(--alt-text)";
    powermode = 0;
  }
});

document.getElementById('reload').addEventListener('click', () => {
  window.location.reload();
});

input.addEventListener('focus', function() {
  document.getElementById('command').style.bottom = "310px";
});

input.addEventListener('blur', function() {
  document.getElementById('command').style.bottom = "0px";
});

input.addEventListener('keyup', (e) => {
  if (e.key === '(') {
    input.value = input.value.substring(0, input.selectionStart) + ')' + input.value.substring(input.selectionEnd);
  }
  else if (e.key === '{') {
    input.value = input.value.substring(0, input.selectionStart) + '}' + input.value.substring(input.selectionEnd);
  }
  else if (e.key === '[') {
    input.value = input.value.substring(0, input.selectionStart) + ']' + input.value.substring(input.selectionEnd);
  }
  else if (e.key === '"') {
    input.value = input.value.substring(0, input.selectionStart) + '"' + input.value.substring(input.selectionEnd);
  }
  else return;
});

input.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    if (input.value != '') {
      if (input.value == "cls" | input.value == "Cls") {
        document.getElementById("status").style.color = "var(--status)";
        input.value = '';
        consol.value = '';
      }
      else {
        editor.innerHTML += input.value+'\n';
        input.value = '';
      }
    }
    else return;
  }
});

document.getElementById('run').addEventListener('click', function() {
  consol.value = '';
  errs = [];
  document.getElementById("status").style.color = "var(--status)";
  window.addEventListener("error", errorlog);
  eval(editor.innerHTML);

  if(consol.value != '') {
    document.getElementById("status").style.color = "#28ff82";
  }

  function errorlog(Error) {
    if (Error) {
      errs.push(Error);
      document.getElementById("consol").value += Error.message + '\n';
      document.getElementById("status").style.color = "#FF5A5A";
    }
    else return;
  }
});

document.getElementById('dbg').addEventListener('click', () => {
  if (check == 0) {
    consol.style.display = 'block';
    document.getElementById('dbg').style.color = "var(--accent)";
    check = 1;
  }
  else {
    consol.style.display = 'none';
    document.getElementById('dbg').style.color = "var(--alt-text)";
    check = 0;
  }
});

input.addEventListener("keyup", () => {
  const num = editor.innerHTML.split("\n").length;
  numbers.innerHTML = Array(num).fill("<span></span>").join("");
});

editor.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.innerHTML =
      editor.innerHTML.substring(0, start) +
      "\t" +
      editor.innerHTML.substring(end);
    event.preventDefault();
  }
});

document.getElementById("logo").addEventListener('click', function() {
  if (z == 0) {
    document.getElementById("panel").style.display = "block";
    z = 1;
  }
  else {
    document.getElementById("panel").style.display = "none";
    z = 0;
  }
});

document.getElementById('theme').addEventListener('click', function() {
  if (coin == 0) {
    coin = 1;
    document.documentElement.setAttribute('data-theme', coin);
  }
  else {
    coin = 0;
    document.documentElement.setAttribute('data-theme', coin);
  }
});