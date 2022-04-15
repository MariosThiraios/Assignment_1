let studentsPerCourse = [];

// Global variables
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
function StudentsPerCourse(students, course) {
    this.students = students;
    this.course = course;
}
/**************************************************************************/

function studentsPerCourseToString(studentsPerCourse) {
    return (`Student: ${studentsPerCourse.students}, will watch ${studentsPerCourse.course} course!`);
}

function submit(event) {
    event.preventDefault();
    let myStudentsPerCourse = new StudentsPerCourse(students.value, course.value);
    validations()
    studentsPerCourse.push(myStudentsPerCourse);
    // edit button
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.id = "edit";
    btnEdit.studentsPerCourseIndex = studentsPerCourse.length - 1; // custom atribute
    btnEdit.addEventListener("click", edit);
    createLiElement(myStudentsPerCourse, btnEdit);
    btnReset.click();
}

function reset() {
    btnSubmit.textContent = "Add";
}

function edit() {
    students.value = studentsPerCourse[this.studentsPerCourseIndex].students;
    course.value = studentsPerCourse[this.studentsPerCourseIndex].course;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.studentsPerCourseIndex = this.studentsPerCourseIndex;
}

function update(event) {
    event.preventDefault();
    studentsPerCourse[this.studentsPerCourseIndex] = new StudentsPerCourse(students.value, courses.value);
    validations();
    ul.innerHTML = "";
    for (let i = 0; i < studentsPerCourse.length; i++) {
        let btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.id = "edit";
        btnEdit.studentsPerCourseIndex = i;
        btnEdit.addEventListener("click", edit);
        createLiElement(studentsPerCourse[i], btnEdit);
    }
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
    btnReset.click();
}

function createLiElement(studentsPerCourse, editButton) {
    let li = document.createElement("li");
    li.id = "liFromJs";
    li.innerText = studentsPerCourseToString(studentsPerCourse);
    li.append(editButton);
    ul.appendChild(li);
}

function validations() {
    if (students.value == "") {
        students.focus();
        alert("Select students");
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