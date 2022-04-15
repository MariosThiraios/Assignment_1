let teachersPerCourse = [];
//*********************************************************************************** */
function Teacher(nameWithLastName, subject) {
    this.nameWithLastName = nameWithLastName;
    this.subject = subject;
}

let pasparakis = new Teacher("George Pasparakis", "Full-Stack");
let bozas = new Teacher("Panos Bozas", "Full-Stack");
let kapetanaki = new Teacher("Lena Kapetanaki", "Web Developer");
let thodos = new Teacher("Antonis Thodos", "Database Programming");

function teacherToString(teacher) {
    return (`${teacher.nameWithLastName} / ${teacher.subject}`);
}

function createOptionElement(teacher, select) {
    let option = document.createElement("option");
    option.innerText = teacherToString(teacher)
    select.appendChild(option);
}

let select = document.getElementById("teachers");
createOptionElement(pasparakis, select);
createOptionElement(bozas, select);
createOptionElement(kapetanaki, select);
createOptionElement(thodos, select);

//******************************************************************************************* */
// Global variables
let teachers = document.getElementById("teachers");
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
function TeachersPerCourse(teachers, course) {
    this.teachers = teachers;
    this.course = course;
}
/**************************************************************************/

function teachersPerCourseToString(teachersPerCourse) {
    return (`Teacher: ${teachersPerCourse.teachers}, offers lessons in: ${teachersPerCourse.course}`);
}

function submit(event) {
    event.preventDefault();
    let myTeachersPerCourse = new TeachersPerCourse(teachers.value, course.value);
    validations()
    teachersPerCourse.push(myTeachersPerCourse);
    // edit button
    let btnEdit = document.createElement("button");
    btnEdit.textContent = "Edit";
    btnEdit.id = "edit";
    btnEdit.teachersPerCourseIndex = teachersPerCourse.length - 1; // custom atribute
    btnEdit.addEventListener("click", edit);
    createLiElement(myTeachersPerCourse, btnEdit);
    btnReset.click();
}

function reset() {
    btnSubmit.textContent = "Add";
}

function edit() {
    teachers.value = teachersPerCourse[this.teachersPerCourseIndex].teachers;
    course.value = teachersPerCourse[this.teachersPerCourseIndex].course;
    btnSubmit.hidden = true;
    btnUpdate.hidden = false;
    btnUpdate.teachersPerCourseIndex = this.teachersPerCourseIndex;
}

function update(event) {
    event.preventDefault();
    teachersPerCourse[this.teachersPerCourseIndex] = new TeachersPerCourse(teachers.value, courses.value);
    validations();
    ul.innerHTML = "";
    for (let i = 0; i < teachersPerCourse.length; i++) {
        let btnEdit = document.createElement("button");
        btnEdit.textContent = "Edit";
        btnEdit.id = "edit";
        btnEdit.teachersPerCourseIndex = i;
        btnEdit.addEventListener("click", edit);
        createLiElement(teachersPerCourse[i], btnEdit);
    }
    btnUpdate.hidden = true;
    btnSubmit.hidden = false;
    btnReset.click();
}

function createLiElement(teachersPerCourse, editButton) {
    let li = document.createElement("li");
    li.id = "liFromJs";
    li.innerText = teachersPerCourseToString(teachersPerCourse);
    li.append(editButton);
    ul.appendChild(li);
}

function validations() {
    if (teachers.value == "") {
        teachers.focus();
        alert("Select Teachers");
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