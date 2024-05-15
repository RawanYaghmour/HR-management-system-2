'use strict';
//declaring an array
//const allEmployees = [];
var employeeArray = [];
//creating a constructor
function Employeeinfo(employeeId, fullName, departement, level, imageUrl) {
    this.employeeId = employeeId
    this.fullName = fullName;
    this.departement = departement;
    this.level = level;
    this.imageUrl = imageUrl;
    this.salary = this.calculateNetSalary();
    employeeArray.push(this);
}
console.log("is this an array: ", Array.isArray(employeeArray));
//using ternery if: 
Employeeinfo.prototype.calculateSalary = function () {
    var min, max;
    this.level.toLowerCase() == "senior" ? min = 1500 : max = 2000;
    this.level.toLowerCase() == "mid-senior" ? min = 1000 : max = 1500;
    this.level.toLowerCase() == "junior" ? min = 500 : max = 1000;
    return Math.floor(Math.random() * (max - min) + min);
}
//calculating net salary
Employeeinfo.prototype.calculateNetSalary = function () {
    let totalSalary = this.calculateSalary();
    return this.salary = Math.floor(totalSalary - (totalSalary * 0.075));
     
}
function render() {
    const container = document.getElementById("HR");
    container.innerHTML = ''; // Ensure the container is cleared before rendering
    // Use a traditional for loop instead of forEach
    for (let i = 0; i < employeeArray.length; i++) {
        const employee = employeeArray[i];
        const cardParent = document.createElement("div");
        cardParent.classList.add("card");
        const cardImg = document.createElement("img");
        cardImg.src = employee.imageUrl;
        cardImg.alt = `${employee.fullName}`;
        cardImg.classList.add("image");
        const infoParent = document.createElement("div");
        infoParent.classList.add("info");
        const cardInfo1 = document.createElement("p");
        cardInfo1.textContent = `Name: ${employee.fullName} - ID: ${employee.employeeId}`;
        const cardInfo2 = document.createElement("p");
        cardInfo2.textContent = `Department: ${employee.department} - Level: ${employee.level}`;
        const cardInfo3 = document.createElement("p");
        cardInfo3.textContent = `Salary: ${employee.salary}`;
        infoParent.appendChild(cardInfo1);
        infoParent.appendChild(cardInfo2);
        infoParent.appendChild(cardInfo3);
        cardParent.appendChild(cardImg);
        cardParent.appendChild(infoParent);
        container.appendChild(cardParent);
    }
}
let employeeForm = document.getElementById("HR-Management");
employeeForm.addEventListener('submit', addNewEmployee);
function addNewEmployee(event) {
    event.preventDefault();
    let employeeId = getRndId();
    let employeeName1 = event.target.fullName.value;
    let department1 = event.target.Department.value;
    let level1 = event.target.Level.value;
    let imageUrl1 = event.target.imgUrl.value;
    let newEmployee = new Employeeinfo(employeeId, employeeName1, department1, level1, imageUrl1);
    let jsonEmployee = JSON.stringify(employeeArray);
    localStorage.setItem("allEmployee", jsonEmployee);
    render();
}
// random number function (between min and max included)
//function getRndIntegar(min, max) {
//    return Math.floor(Math.random() * (max - min + 1)) + min;
//}
function getRndId() {
    return Math.floor(1000 + Math.random() * 9000);
}
function getEmployee() {
    let jsonEmployee = localStorage.getItem("allEmployee");
    if (jsonEmployee) {
        employeeArray = JSON.parse(jsonEmployee);
    }
}
getEmployee();
render();

///////////////////////////////////////////
//console.log(employeeArray.length);
//var Administration;
//var Marketing;
//var Development;
//var Finance;
//for (let index = 0; index < employeeArray.length; index++) {
 //   const element = array[index];
//    
//}