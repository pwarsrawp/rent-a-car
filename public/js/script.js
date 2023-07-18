const menuButton = document.getElementById('menu-button')
const menu = document.getElementById('menu')


const branchesBtn=document.getElementById('branches-admin-button')
const branchContainer=document.getElementById('branches-admin-container')
const allContainer=document.getElementsByClassName('admin-container')


const   BookingBtn=document.getElementById('bookings-admin-button')
const   BookingContainer=document.getElementById('bookings-admin-container')

const   UserBtn=document.getElementById('users-admin-button')
const   UserContainer=document.getElementById('users-admin-container')

const   CarsBtn=document.getElementById('cars-admin-button')
const   CarsContainer=document.getElementById('cars-admin-container')

function closePanel(){
  for (let i = 0; i < allContainer.length; i++) {
    allContainer[i].style.display='none'
  }
}
if(CarsBtn) {

CarsBtn.addEventListener('click', ()=>{
  closePanel()
  CarsContainer.style.display='block'
})
}

if(UserBtn){
UserBtn.addEventListener('click', ()=>{
  closePanel()
  UserContainer.style.display='block'
})
}
if(BookingBtn){
BookingBtn.addEventListener('click', ()=>{
  closePanel()
  BookingContainer.style.display='block'
})
}
if(branchesBtn){
branchesBtn.addEventListener('click', ()=>{
  closePanel()
  branchContainer.style.display='block'
})
}
// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("rent-a-car JS imported successfully!");
});


menuButton.addEventListener("click", () => {
  if (menuButton.classList.contains("fa-bars")) {
    menuButton.classList.remove("fa-bars");
    menuButton.classList.add("fa-xmark");
    menu.style.display = "flex"
 


  } else {
    menuButton.classList.add("fa-bars");
    menuButton.classList.remove("fa-xmark");
    menu.style.display = "none"
   
    
  }  
});


