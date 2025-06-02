//....................Empty arrays created...................

let array1 = [];
if (localStorage.getItem("tasks") == null) {
  array1 = [];
} else {
  array1 = JSON.parse(localStorage.getItem("tasks"));
}

let array2 = [];

if (localStorage.getItem("events") == null) {
  array2 = [];
} else {
  array2 = JSON.parse(localStorage.getItem("events"));
}

// .........................  ON LOAD ............................
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const events = JSON.parse(localStorage.getItem("events")) || [];
  const allData = [...array1, ...array2];
  display(allData);
};
// ............................ TIMER.........................

let result = document.getElementById("time");

setInterval(() => {
  let x = new Date();
  let hrs = x.getHours().toString().padStart(2, "0");
  let min = x.getMinutes().toString().padStart(2, "0");
  let sec = x.getSeconds().toString().padStart(2, "0");

  result.innerText = `${hrs}:${min}:${sec}`;
}, 1000);
// ............... SAVE BUTTON................................
let allData;
let Data;
document.getElementById("save").addEventListener("click", () => {
  let dropdown = document.getElementById("select").value;
  let inputValue = document.getElementById("input").value;
  let sub1 = document.getElementById("sub1").value;
  let sub2 = document.getElementById("sub2").value;
  let sub3 = document.getElementById("sub3").value;
  let email = document.getElementById("email").value;
  let deadline = document.getElementById("date").value;
  let startdate = document.getElementById("start").value;
  let finishdate = document.getElementById("finish").value;

  let obj = {
    id: Date.now(),
    categeory: dropdown,
    taskName: inputValue,
    subTask1: sub1,
    subTask2: sub2,
    subTask3: sub3,
    assigned: email,
    deadLine: deadline,
    start: startdate,
    end: finishdate,
    important: false,
    completed: false,
    createdAt: new Date().toISOString(),
    percentage: 0,
  };

  if (dropdown == "Task") {
    array1.push(obj);
    localStorage.setItem("tasks", JSON.stringify(array1));
    Data = JSON.parse(localStorage.getItem("tasks"));
  } else {
    array2.push(obj);
    localStorage.setItem("events", JSON.stringify(array2));
    Data = JSON.parse(localStorage.getItem("events"));
  }
  allData = [...array1, ...array2];
  display(allData);
  const message = document.getElementById("saveMessage");
  message.classList.add("show");

  setTimeout(() => {
    message.classList.remove("show");
  }, 2500);

  document.getElementById("input").value = "";
  document.getElementById("sub1").value = "";
  document.getElementById("sub2").value = "";
  document.getElementById("sub3").value = "";
  document.getElementById("email").value = "";
  document.getElementById("date").value = "";
  document.getElementById("start").value = "";
  document.getElementById("finish").value = "";
});


  // const offcanvasElement = document.getElementById("offcanvasRight");
  // const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
  // if (offcanvasInstance) {
  //   offcanvasInstance.hide();
  // }
// ............................................seperation of the divs........................

function display(e) {
  document.getElementById("jsBox").innerHTML = "";
  document.getElementById("Events").innerHTML = "";

  e.forEach((i) => {
    const boxid = i.categeory === "Task" ? "jsBox" : "Events";

    document.getElementById(boxid).innerHTML += `
      <div class="singleTask" id="task-${i.id}">
        <div class="flex">
          <div>
            <input type="checkbox" id="check-${i.id}" ${i.completed ? "checked" : ""} onclick='toggleTask(${i.id})'/>
            <label for="check-${i.id}" id="taskName-${
      i.id
    }"style="text-decoration: ${i.completed ? "line-through" : "none"}">${
      i.taskName
    }</label>
          </div>
          <i class="bi bi-plus-circle" onclick="expandTask(this)"></i>
          <i class="bi ${i.important ? "bi-star-fill" : "bi-star"}" id="${
      i.id
    }" onclick="fill(this)"></i>
          <button onclick="editTask(${i.id})" id="editBtn-${
      i.id
    }" class="edit">Edit</button>
          <i class="bi bi-trash3" onclick="dlt(${i.id}, '${boxid}')"></i>
          <div class="emoji">
            <img src="https://images.emojiterra.com/google/noto-emoji/animated-emoji/1f389.gif" alt="emoji" width="40" >

          </div>
        </div>

        <div class="subTasks" style="margin-left: 20px" id="subtasks-${i.id}">
          <label><input type="checkbox" class="subtask-${ i.id}" /> <span id="sub1-${i.id}">${i.subTask1}</span></label>
          <label><input type="checkbox" class="subtask-${i.id}" /> <span id="sub2-${i.id}">${i.subTask2}</span></label>
          <label><input type="checkbox" class="subtask-${i.id}" /> <span id="sub3-${i.id}">${i.subTask3}</span></label>
          
          <div class="my-3"><span style="color: orange;">Start's At:</span> <span id="start-${
            i.id
          }">${i.start}</span></div>
          <div class="my-3"><span style="color: orange;">End's At:</span> <span id="end-${
            i.id
          }">${i.end}</span></div>
          <div class="my-3"><span style="color: orange;">Assigned by:</span> <span id="assigned-${
            i.id
          }">${i.assigned}</span></div>

          <button onclick="submitTask(${i.id})" style="margin-top: 10px; border-radius:5px;  background-color: #28a745;">Submit</button>
          <div id="percent-${i.id}" style="margin-top: 10px; font-weight: bold;"></div>
        </div>
       
        <div><span style="color: red;">Deadline:</span> <span id="deadline-${i.id}">${i.deadLine}</span></div>
      </div>
      
    `;
  });
}

// function completeTaskAndSubtasks(id) {
//   // Check the main task
//   const mainCheckbox = document.getElementById(`check-${id}`);
//   mainCheckbox.checked = true;

//   // document.getElementsByClassName("emoji")[0].style.display = "inline-block"; 
//   let x=document.getElementsByClassName("emoji")[0];
//   x.classList.toggle("show");
 

//   // Call the main toggle handler if needed
//   if (typeof toggleTask === "function") {
//     toggleTask(id);
//   }

//   // Check all subtasks
//   const subtasks = document.querySelectorAll(`.subtask-${id}`);
//   subtasks.forEach((subtask) => {
//     subtask.checked = true;
//     subtask.parentElement.style.textDecoration = "line-through"; 
//   });
// }











function editTask(id) {
  const label = document.getElementById(`taskName-${id}`);
  const start = document.getElementById(`start-${id}`);
  const end = document.getElementById(`end-${id}`);
  const assigned = document.getElementById(`assigned-${id}`);
  const deadline = document.getElementById(`deadline-${id}`);
  const sub1 = document.getElementById(`sub1-${id}`);
  const sub2 = document.getElementById(`sub2-${id}`);
  const sub3 = document.getElementById(`sub3-${id}`);
  const editBtn = document.getElementById(`editBtn-${id}`);

  if (editBtn.textContent === "Edit") {
    label.outerHTML = `<input type="text" id="taskInput-${id}" value="${label.textContent}"/>`;
    start.outerHTML = `<input type="datetime-local" id="startInput-${id}" value="${start.textContent}"/>`;
    end.outerHTML = `<input type="datetime-local" id="endInput-${id}" value="${end.textContent}"/>`;
    assigned.outerHTML = `<input type="email" id="assignedInput-${id}" value="${assigned.textContent}"/>`;
    deadline.outerHTML = `<input type="datetime-local" id="deadlineInput-${id}" value="${deadline.textContent}"/>`;
    sub1.outerHTML = `<input type="text" id="subInput1-${id}" value="${sub1.textContent}"/>`;
    sub2.outerHTML = `<input type="text" id="subInput2-${id}" value="${sub2.textContent}"/>`;
    sub3.outerHTML = `<input type="text" id="subInput3-${id}" value="${sub3.textContent}"/>`;
    editBtn.textContent = "Update";
  } else {
    const updatedName = document.getElementById(`taskInput-${id}`).value;
    const updatedStart = document.getElementById(`startInput-${id}`).value;
    const updatedEnd = document.getElementById(`endInput-${id}`).value;
    const updatedAssigned = document.getElementById(
      `assignedInput-${id}`
    ).value;
    const updatedDeadline = document.getElementById(
      `deadlineInput-${id}`
    ).value;
    const updatedSub1 = document.getElementById(`subInput1-${id}`).value;
    const updatedSub2 = document.getElementById(`subInput2-${id}`).value;
    const updatedSub3 = document.getElementById(`subInput3-${id}`).value;

    let found = false;
    array1 = array1.map((task) => {
      if (task.id === id) {
        found = true;
        return {
          ...task,
          taskName: updatedName,
          start: updatedStart,
          end: updatedEnd,
          assigned: updatedAssigned,
          deadLine: updatedDeadline,
          subTask1: updatedSub1,
          subTask2: updatedSub2,
          subTask3: updatedSub3,
        };
      }
      return task;
    });

    if (!found) {
      array2 = array2.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            taskName: updatedName,
            start: updatedStart,
            end: updatedEnd,
            assigned: updatedAssigned,
            deadLine: updatedDeadline,
            subTask1: updatedSub1,
            subTask2: updatedSub2,
            subTask3: updatedSub3,
          };
        }
        return task;
      });
    }

    localStorage.setItem("tasks", JSON.stringify(array1));
    localStorage.setItem("events", JSON.stringify(array2));
    display([...array1, ...array2]);
  }
}

// ................................ DELETE ....................................

function dlt(id, boxid) {
  if (boxid === "jsBox") {
    array1 = array1.filter((item) => item.id !== id);
    localStorage.setItem("tasks", JSON.stringify(array1));
  } else if (boxid === "Events") {
    array2 = array2.filter((item) => item.id !== id);
    localStorage.setItem("events", JSON.stringify(array2));
  }

  const allData = [...array1, ...array2];
  display(allData);
}

// ........................EXPAND........................

function expandTask(element) {
  const task = element.closest(".singleTask");
  task.classList.toggle("expanded");
}

// ......................STAR..................

function fill(e) {
  e.classList.toggle("bi-star-fill");
  e.classList.toggle("bi-star");
}

function search() {
  let searchedVal = document.getElementById("srhholder").value.toLowerCase();

  const allData = [...array1, ...array2];

  const filteredData = allData.filter((item) =>
    item.taskName.toLowerCase().includes(searchedVal)
  );

  display(filteredData);
}

// .......................completed tasks.....................
function refreshArrays() {
  array1 = JSON.parse(localStorage.getItem("tasks")) || [];
  array2 = JSON.parse(localStorage.getItem("events")) || [];
}

function active() {
  refreshArrays();
  const allData = [...array1, ...array2];
  const notcmplt = allData.filter((i) => i.completed == false);
  console.log("Active items:", notcmplt); // Check output
  display(notcmplt);
}

function completed() {
  refreshArrays();
  const allData = [...array1, ...array2];
  const completedTasks = allData.filter((item) => item.completed === true);
  display(completedTasks);
}

// function toggleTask(id) {
//   let found = false;
//   for (let i = 0; i < array1.length; i++) {
//     if (array1[i].id === id) {
//       array1[i].completed = !array1[i].completed;
//       found = true;
//       break;
//     }
//   }

//   if (!found) {
//     for (let i = 0; i < array2.length; i++) {
//       if (array2[i].id === id) {
//         array2[i].completed = !array2[i].completed;
//         break;
//       }
//     }
//   }

//   localStorage.setItem("tasks", JSON.stringify(array1));
//   localStorage.setItem("events", JSON.stringify(array2));

//   display([...array1, ...array2]);
// }
function toggleTask(id) {
  const mainCheckbox = document.getElementById(`check-${id}`);
  const isChecked = mainCheckbox.checked;
const emoji = document.querySelector(`#task-${id} .emoji`);
  if (emoji) {
    if (isChecked) {
      emoji.style.display = "inline-block";
 
      setTimeout(() => {
        emoji.style.display = "none";
      }, 2000);
    } else {
      emoji.style.display = "none";
    }
  }

  // Toggle main task styling
  const label = document.getElementById(`taskName-${id}`);
  label.style.textDecoration = isChecked ? "line-through" : "none";

  // Get all subtasks of this task
  const subtasks = document.querySelectorAll(`.subtask-${id}`);
  subtasks.forEach((subtask) => {
    subtask.checked = isChecked;
    subtask.parentElement.style.textDecoration = isChecked ? "line-through" : "none";
  });
}


function home() {
  console.log("Home");
  array1 = JSON.parse(localStorage.getItem("tasks")) || [];
  array2 = JSON.parse(localStorage.getItem("events")) || [];
  const allData = [...array1, ...array2];
  display(allData);
}

function callAll() {
  console.log("ALL");
  array1 = JSON.parse(localStorage.getItem("tasks")) || [];
  array2 = JSON.parse(localStorage.getItem("events")) || [];
  const allData = [...array1, ...array2];
  display(allData);
}

function fill(e) {
  const id = Number(e.id);
  let found = false;

  for (let i = 0; i < array1.length; i++) {
    if (array1[i].id === id) {
      array1[i].important = !array1[i].important;
      found = true;
      break;
    }
  }

  if (!found) {
    for (let i = 0; i < array2.length; i++) {
      if (array2[i].id === id) {
        array2[i].important = !array2[i].important;
        break;
      }
    }
  }

  localStorage.setItem("tasks", JSON.stringify(array1));
  localStorage.setItem("events", JSON.stringify(array2));

  display([...array1, ...array2]);
}

function important() {
  const allData = [...array1, ...array2];
  const importantTasks = allData.filter((item) => item.important === true);
  display(importantTasks);
}

function myday() {
  let todaystask = JSON.parse(localStorage.getItem("tasks")) || [];
  let todaysevent = JSON.parse(localStorage.getItem("events")) || [];

  const filtered = todaystask.filter(
    (ele) => new Date(ele.deadLine).toDateString() === new Date().toDateString()
  );

  const filtered2 = todaysevent.filter(
    (elem) =>
      new Date(elem.deadLine).toDateString() === new Date().toDateString()
  );

  document.getElementById("jsBox").innerHTML = "";
  document.getElementById("Events").innerHTML = "";

  display([...filtered, ...filtered2]);
}

function planned() {
  let todaystask = JSON.parse(localStorage.getItem("tasks")) || [];
  let todaysevent = JSON.parse(localStorage.getItem("events")) || [];

  const filtered = todaystask.filter(
    (ele) => new Date(ele.deadLine).toDateString() != new Date().toDateString()
  );

  const filtered2 = todaysevent.filter(
    (elem) =>
      new Date(elem.deadLine).toDateString() != new Date().toDateString()
  );

  document.getElementById("jsBox").innerHTML = "";
  document.getElementById("Events").innerHTML = "";

  display([...filtered, ...filtered2]);
}

function assigned() {
  let assign1 = JSON.parse(localStorage.getItem("tasks")) || [];
  let assign2 = JSON.parse(localStorage.getItem("events")) || [];

  const filtered = assign1.filter(
    (i) => i.assigned == "ramudukurva216@gmail.com"
  );
  const filtered2 = assign2.filter(
    (i) => i.assigned == "ramudukurva216@gmail.com"
  );

  document.getElementById("jsBox").innerHTML = "";
  document.getElementById("Events").innerHTML = "";

  display([...filtered, ...filtered2]);
}

let percentage;
function submitTask(taskId) {
  const checkboxes = document.querySelectorAll(`.subtask-${taskId}`);
  const total = checkboxes.length;
  let checked = 0;

  checkboxes.forEach((box) => {
    if (box.checked) checked++;
  });

  percentage = total === 0 ? 0 : Math.round((checked / total) * 100);
  document.getElementById(
    `percent-${taskId}`
  ).innerText = `Completed: ${percentage}%`;
  for (let i = 0; i < array1.length; i++) {
    if (array1[i].id === taskId) {
      array1[i].percentage = percentage;
      localStorage.setItem("tasks", JSON.stringify(array1));
      return;
    }
  }
}

//.......................... progress bar...................................

document.getElementById("progress").addEventListener("click", () => {
  const progressBar = JSON.parse(localStorage.getItem("tasks")) || [];

  const wrapper = document.getElementById("progressDetailsWrapper");
  const details = document.getElementById("progressDetails");

  details.innerHTML = "";

  progressBar.forEach((task) => {
    const percentage = task.percentage;
    const stars =
      percentage < 50 ? "⭐⭐" : percentage < 75 ? "⭐⭐⭐⭐" : "⭐⭐⭐⭐⭐";
    const color =
      percentage < 50 ? "#f44336" : percentage < 75 ? "#ff9800" : "#4caf50";

    details.innerHTML += `<div >  <div><strong>Taskname:</strong> ${task.taskName}</div>
    <div><strong>Rating:</strong> ${stars}</div>
    <div><strong>Percentage:</strong> ${task.percentage}% 🚀</div>
   
      <input class="progress-bar progress-bar-striped progress-bar-animated"
          type="range" 
          min="0" 
          max="100" 
          value="${percentage}" 
          disabled
          style="
            width: 100%;
            height: 10px;
            -webkit-appearance: none;
            appearance: none;
            background: ${color};
            border-radius: 5px;
            outline: none;
            margin-top: 5px;
          "
          title="${percentage}%"
        /> 

 

</div>`;
  });

  wrapper.style.display = "block";

  setTimeout(() => {
    wrapper.style.display = "none";
  }, 4000);
});

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach((task) => {
  const deadlineTime = new Date(task.deadLine).getTime(); 
  const timeLeft = deadlineTime - Date.now();
  const oneHour = 60 * 60 * 1000;

  if (timeLeft > 0 && timeLeft <= oneHour) {
    alert(`You have 1 hour to complete the task: ${task.taskName}`);
  }
});

let finish = JSON.parse(localStorage.getItem("tasks"));

let num = finish.filter((i) => i.completed == true);
let reqnum = num.length;

let digit2;
function circle() {
  refreshArrays();
  array1 = JSON.parse(localStorage.getItem("tasks")) || [];
  array2 = JSON.parse(localStorage.getItem("events")) || [];
  const taskNum = [...array1];
  let digit = taskNum.filter((i) => i.completed == true);
  digit2 = digit.length;

  document.getElementById("start").innerText = `${digit2} `;
}

let digit4;
function circle2() {
  refreshArrays();
  array1 = JSON.parse(localStorage.getItem("tasks")) || [];
  array2 = JSON.parse(localStorage.getItem("events")) || [];
  const taskNum = [...array1];
  let digit = taskNum.filter((i) => i.completed == false);
  digit4 = digit.length;

  document.getElementById("incomplete").innerText = `${digit4} `;
}
let digit5;
function circle3() {
  refreshArrays();
  array1 = JSON.parse(localStorage.getItem("tasks")) || [];
  array2 = JSON.parse(localStorage.getItem("events")) || [];
  const taskNum = [...array1];
  digit5 = array1.length;

  document.getElementById("total").innerText = `${digit5} `;
}

let digit6;
function circle5() {
  refreshArrays();
  array1 = JSON.parse(localStorage.getItem("tasks")) || [];
  array2 = JSON.parse(localStorage.getItem("events")) || [];
  const taskNum = [...array2];
  let digit = taskNum.filter((i) => i.completed == true);
  digit6 = digit.length;

  document.getElementById("finishEvent").innerText = `${digit6} `;
}

let digit7;
function circle6() {
  refreshArrays();
  array1 = JSON.parse(localStorage.getItem("tasks")) || [];
  array2 = JSON.parse(localStorage.getItem("events")) || [];
  const taskNum = [...array2];
  let digit = taskNum.filter((i) => i.completed == false);
  digit7 = digit.length;

  document.getElementById("incompleteEvent").innerText = `${digit7} `;
}

let digit8;
function circle4() {
  refreshArrays();
  array1 = JSON.parse(localStorage.getItem("tasks")) || [];
  array2 = JSON.parse(localStorage.getItem("events")) || [];
  const taskNum = [...array2];
  digit8 = array2.length;

  document.getElementById("totalEvent").innerText = `${digit8} `;
}


