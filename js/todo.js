let tasks = document.querySelector(".tasks");
let tasks_map = new Map();
let nav = null

document.addEventListener("DOMContentLoaded", () => {
  var taskadder = document.querySelector(".sidenav");
  nav= M.Sidenav.init(taskadder, {
    edge: "right",
  });
});

function addTask(tit, des, store,taskStatus,targetDate) {
  const title = tit || document.querySelector("#title").value;
  const description = des || document.querySelector("#des").value;
  const date = targetDate ||  document.querySelector("#targetDate").value
  if (title == "" || description == "") return;
  let a = new Date(date)
  const cardHTML = `
            <p class=" task-title flow-text">${title}</p>
            <p class="task-description">${description}</p>
            <p class="dueDate flow-text">Due :${a.getDate()}-${a.getMonth()+1}-${a.getFullYear()}</p>
            <div class="card-panel z-depth-3 swipe-actions ">
              <p onclick="taskCompleted(event)" class="flow-text green-text">Done</p>
              <p onclick="taskDelete(event)" class="flow-text red-text">Delete</p>
            </div>
    `;
  let div = document.createElement("div");
  div.className = "task card-panel z-depth-2";
  div.innerHTML = cardHTML;
  div.addEventListener("touchstart", handleStart); 

  let c = document.createElement("a");
  c.className = "completed";
  c.innerHTML = `<i class="material-icons green-text">done</i>`;
  div.append(c);
  c.onclick = taskCompleted;

  let d = document.createElement("a");
  d.className = "delete";
  d.innerHTML = `<i class="material-icons red-text">delete</i>`;
  div.append(d);
  d.onclick = taskDelete;

      
  tasks.append(div);
  if (!store) {
    tasks_map.set(title, {desc:description,status:"pending",date:a})
    M.toast({html: 'Task added',displayLength:1200})
    updatedb()    
    nav.close()
  }
  if(taskStatus == "done" )
  {
      div.classList.toggle("task-done")
  }
  document.querySelector("#title").value =""
  document.querySelector("#des").value =""
}

function taskDelete(e) {
  if("vibrate" in navigator) navigator.vibrate(30)
  tasks_map.delete(e.target.closest(".task").firstElementChild.innerHTML)
  e.target.closest(".task").classList.add("deleting");
  e.target.closest(".task").addEventListener("transitionend", () => {
    e.target.closest(".task").remove()
    updatedb() 
  });
  
}

function taskCompleted(e) {
  if("vibrate" in navigator) navigator.vibrate(30)
  e.target.closest(".task").classList.toggle("task-done")
  const stat = e.target.closest(".task").classList.contains("task-done")
  tasks_map.get(e.target.closest(".task").firstElementChild.innerHTML).status = stat ? "done" : "pending" 
  updatedb()
}

function updatedb(){
  countTasks()
  localStorage.setItem("tasks", JSON.stringify(Object.fromEntries(tasks_map)))
}

function all_done() {
  if ("vibrate" in navigator) {
    navigator.vibrate(40);
  }
  for (const task of tasks.children) {
    task.classList.add("task-done");
    tasks_map.get(task.firstElementChild.innerHTML).status = "done";
  }
  M.toast({ html: "All tasks are marked as DONE", displayLength: 1200 });
  updatedb();
}

function delete_all() {
  if ("vibrate" in navigator) {
    navigator.vibrate(40);
  }
  for (const task of tasks.children) {
    task.classList.add("deleting");
    task.addEventListener("transitionend", () => {
      task.remove();
      updatedb();
    });
  }
  tasks_map = new Map();
  M.toast({ html: "All tasks  deleted", displayLength: 1200 });
}


function countTasks() {
  let countAll = tasks.children.length
  countC=0
  for (const task of tasks.children) {
    if(tasks_map.get(task.firstElementChild.innerHTML).status == "done")
      countC += 1
  }
  filter_c.innerHTML = `${countC}`
  filter_nc.innerHTML =`${countAll-countC}`
}

//Retriving inofrmation from localStorage
if (localStorage.getItem("tasks") == null) 
{
  localStorage.setItem("tasks", JSON.stringify(tasks_map));
  addTask("Sample Title", "Description",false,"pending");
  updatedb()
} 
else 
{
  tasks_map = new Map(
    Object.entries(JSON.parse(localStorage.getItem("tasks")))
  );
  tasks_map.forEach((des,title, tasks_map) => {
    addTask(title, des.desc, true,des.status,des.date);
  });
  countTasks()
}

let intialPos , finalPos

    

function handleStart(e){
  intialPos = e.touches[0].clientX;
  e.target.closest(".task").children[3].style.display = 'none';
  e.target.closest('.task').addEventListener("touchmove", handleSwipe);
  e.target.closest('.task').addEventListener("touchend", handleEnd);
}

function handleSwipe(e){
  e.preventDefault()
  finalPos = e.touches[0].clientX
  let changeInX = finalPos -intialPos
  e.target.closest('.task').style.transform = `translateX(${finalPos-intialPos}px)`
  e.target.closest('.task').children[3].style.transform = `translate(${intialPos-finalPos}px,-50%)`
}

function handleEnd(e){
  console.log(Math.abs(finalPos - intialPos))
  if (Math.abs(finalPos - intialPos) < 100) { 
    e.target.closest(".task").children[3].style.transform = `translate(0,-50%)`;
    e.target.closest(".task").children[3].style.display = 'none';
  }
  else{
    e.target.closest(".task").children[3].style.display = 'flex';
    
  }
  setTimeout(() => {
    e.target.closest(".task").style.transform = `translateX(0px)`
    e.target.closest(".task").children[3].style.transform = `translate(0,-50%)`
  e.target.closest(".task").children[3].style.display = 'none'
  }, 1800);
  tasks.firstElementChild.removeEventListener("touchmove", handleSwipe);
}

