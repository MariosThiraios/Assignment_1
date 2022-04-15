let assignmentsPerStudentsPerCourse = [];

// Global variables

let assignments = document.getElementById("assignments");
let students = document.getElementById("students");
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
function AssignmentsPerStudentsPerCourse(assignments, students, course) {
    this.assignments = assignments;
    this.students = students;
    this.course = course;
}
/**************************************************************************/

function assignmentsPerStudentsPerCourseToString(assignmentsPerStudentsPerCourse) {
    return (`Assignment: ${assignmentsPerStudentsPerCourse.assignments}, Student: ${assignmentsPerStudentsPerCourse.students}, Course: ${assignmentsPerStudentsPerCourse.course}`);
}

function submit(event) {
    event.preventDefault();
    let myAssignmentsPerStudentsPerCourse = new AssignmentsPerStudentsPerCourse(assignments.value, students.value, course.value);
    validations()
    assignmentsPerStudentsPerCourse.push(myAssignmentsPerStudentsPerCourse);
    // edit button
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.id = "edit";
    btnEdit.assignmentsPerStudentsPerCourseIndex = assignmentsPerStudentsPerCourse.length - 1; // custom atribute
    btnEdit.addEventListener("click", edit);
    createLiElement(myAssignmentsPerStudentsPerCourse, btnEdit);
    btnReset.click();
}

function reset() {
    btnSubmit.textContent = "Add";
}

function edit() {
    assignments.value = assignmentsPerStudentsPerCourse[this.assignmentsPerStudentsPerCourseIndex].assignments;
    students.value = assignmentsPerStudentsPerCourse[this.assignmentsPerStudentsPerCourseIndex].students;
    course.value = assignmentsPerStudentsPerCourse[this.assignmentsPerStudentsPerCourseIndex].course;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.assignmentsPerStudentsPerCourseIndex = this.assignmentsPerStudentsPerCourseIndex;
}

function update(event) {
    event.preventDefault();
    assignmentsPerStudentsPerCourse[this.assignmentsPerStudentsPerCourseIndex] = new AssignmentsPerStudentsPerCourse(assignments.value, students.value, courses.value);
    validations();
    ul.innerHTML = "";
    for (let i = 0; i < assignmentsPerStudentsPerCourse.length; i++) {
        let btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.id = "edit";
        btnEdit.assignmentsPerStudentsPerCourseIndex = i;
        btnEdit.addEventListener("click", edit);
        createLiElement(assignmentsPerStudentsPerCourse[i], btnEdit);
    }
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
    btnReset.click();
}

function createLiElement(assignmentsPerStudentsPerCourse, editButton) {
    let li = document.createElement("li");
    li.id = "liFromJs";
    li.innerText = assignmentsPerStudentsPerCourseToString(assignmentsPerStudentsPerCourse);
    li.append(editButton);
    ul.appendChild(li);
}

function validations() {
    if (assignments.value == "") {
        assignments.focus();
        alert("Select assignment");
        createLiElement() = false;
    }
    if (students.value == "") {
        students.focus();
        alert("Select student");
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