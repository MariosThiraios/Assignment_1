let assignmentsPerCourse = [];

// Global variables
let assignments = document.getElementById("assignments");
let course = document.getElementById("courses");

let btnSubmit = document.getElementById("submit");
btnSubmit.addEventListener("click", submit);

let btnReset = document.getElementById("reset");
btnReset.addEventListener("click", reset);

let btnUpdate = document.getElementById("update");
btnUpdate.addEventListener("click", update);

let ul = document.createElement("ul");
ul.className = "ulFromJs";
document.body.append(ul);

/**************************************************************************/
// constractor
function AssignmentsPerCourse(assignments, course) {
    this.assignments = assignments;
    this.course = course;
}
/**************************************************************************/

function assignmentsPerCourseToString(assignmentsPerCourse) {
    return (`Assignment: ${assignmentsPerCourse.assignments}, will be in ${assignmentsPerCourse.course} course!`);
}

function submit(event) {
    event.preventDefault();
    let myassignmentsPerCourse = new AssignmentsPerCourse(assignments.value, course.value);
    validations()
    assignmentsPerCourse.push(myassignmentsPerCourse);
    // edit button
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.id = "edit";
    btnEdit.assignmentsPerCourseIndex = assignmentsPerCourse.length - 1; // custom atribute
    btnEdit.addEventListener("click", edit);
    createLiElement(myassignmentsPerCourse, btnEdit);
    btnReset.click();
}

function reset() {
    btnSubmit.textContent = "Add";
}

function edit() {
    assignments.value = assignmentsPerCourse[this.assignmentsPerCourseIndex].assignments;
    course.value = assignmentsPerCourse[this.assignmentsPerCourseIndex].course;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.assignmentsPerCourseIndex = this.assignmentsPerCourseIndex;
}

function update(event) {
    event.preventDefault();
    assignmentsPerCourse[this.assignmentsPerCourseIndex] = new AssignmentsPerCourse(assignments.value, courses.value);
    validations();
    ul.innerHTML = "";
    for (let i = 0; i < assignmentsPerCourse.length; i++) {
        let btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.id = "edit";
        btnEdit.assignmentsPerCourseIndex = i;
        btnEdit.addEventListener("click", edit);
        createLiElement(assignmentsPerCourse[i], btnEdit);
    }
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
    btnReset.click();
}

function createLiElement(assignmentsPerCourse, editButton) {
    let li = document.createElement("li");
    li.id = "liFromJs";
    li.innerText = assignmentsPerCourseToString(assignmentsPerCourse);
    li.append(editButton);
    ul.appendChild(li);
}

function validations() {
    if (assignments.value == "") {
        assignments.focus();
        alert("Select assignments");
        createLiElement() = false;
    }
    if (course.value == "") {
        course.focus();
        alert("Select a Course");
        createLiElement() = false;
    } else {
        return true;
    }
}