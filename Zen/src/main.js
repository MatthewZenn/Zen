const { invoke } = window.__TAURI__.core;
const editor = document.getElementById('editor');
const input = document.getElementById('input');
const numbers = document.getElementById("numbers");
const consol = document.getElementById('consol');

var check = 0;
var errs = [];

console.log = function(message) {
  consol.value = message+"\n";
};

document.getElementById('send').addEventListener('click', () => {
  if (input.value != '') {
    if (input.value == "cls" | input.value == "Cls") {
      document.getElementById("status").style.color = "#30363d";
      editor.value = '';
      input.value = '';
      consol.value = '';
    }
    else {
      editor.value += input.value+'\n';
      input.value = '';
      input.focus();
    }
  }
  else {
    return
  }
});

input.addEventListener("keydown", (ev) => {
  if (ev.key === "Enter") {
    if (input.value != '') {
      if (input.value == "cls" | input.value == "Cls") {
        document.getElementById("status").style.color = "#30363d";
        editor.value = '';
        input.value = '';
        consol.value = '';
      }
      else {
        editor.value += input.value+'\n';
        input.value = '';
      }
    }
    else {
      return
    }
  }
});

editor.addEventListener("change", (e) => {
  const num = e.target.value.split("\n").length;
  numbers.innerHTML = Array(num).fill("<span></span>").join("");
});

editor.addEventListener("keydown", (event) => {
  if (event.key === "Tab") {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;
    editor.value =
      editor.value.substring(0, start) +
      "\t" +
      editor.value.substring(end);
    event.preventDefault();
  }
});

document.getElementById('run').addEventListener('click', function() {
  consol.value = '';
  errs = [];
  document.getElementById("status").style.color = "#30363d";
  window.addEventListener("error", errorlog);
  eval(editor.value);

  if(consol.value != '') {
    document.getElementById("status").style.color = "#28ff82";

  }

  function errorlog(Error) {
    if (Error) {
      errs.push(Error);
      document.getElementById("consol").value += Error.message + '\n';
      document.getElementById("status").style.color = "#FF5A5A";
    }
    else {
      return;
    }
  }
});

document.getElementById('dbg').addEventListener('click', () => {
  if (check == 0) {
    consol.style.display = 'block';
    document.getElementById('dbg').style.color = "#9e74ff";
    check = 1;
  }
  else {
    consol.style.display = 'none';
    document.getElementById('dbg').style.color = "#848d97";
    check = 0;
  }
});