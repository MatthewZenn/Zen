const { invoke } = window.__TAURI__.core;
const editor = document.getElementById('editor');
const input = document.getElementById('input');
const numbers = document.getElementById("numbers");


document.getElementById('send').addEventListener('click', () => {
  if (input.value != '') {
    if (input.value == "cls" | input.value == "Cls") {
      editor.value = '';
      input.value = '';
    }
    else {
      editor.value += input.value+'\n';
      input.value = '';
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
        editor.value = '';
        input.value = '';
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
  document.getElementById("status").style.color = "#30363d";
  window.addEventListener("error", errorlog);
  eval(editor.value);

  function errorlog(Error) {
    if (Error) {
      errs.push(Error);
      //document.getElementById("logger").value += Error.message + '\n';
      //document.getElementById("error").innerHTML = '<span id="status"></span> ' + errs.length + ' Errors';
      document.getElementById("status").style.color = "#FF5A5A";
    }
    else {
      return;
    }
  }
});