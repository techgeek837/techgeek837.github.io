document.addEventListener("DOMContentLoaded", () => {
  var elems = document.querySelectorAll(".sidenav");
  var instances = M.Sidenav.init(elems);
  var elems = document.querySelectorAll(".fixed-action-btn");
  var instances = M.FloatingActionButton.init(elems, {
    hoverEnabled: false,
  });
  var elems = document.querySelectorAll(".modal");
  var instances = M.Modal.init(elems);
});


if('serviceWorker' in navigator){
  navigator.serviceWorker.register('/sw.js')
}

function openPage(page,time=2000){
  document.querySelector('.progress').classList.remove('loader')
  setTimeout(()=>window.location.href=`/pages/${page}`,time)
}