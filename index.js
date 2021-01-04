console.log("Hello");

// Constructor function of book Object
function Book(name, author, type) {
    this.bName = name;
    this.bAuthor = author;
    this.bType = type;
}

//Display constructor
function Display() {

}


//Add method to display prototye
Display.prototype.add = function (book) {
    console.log("Adding to UI");
    tableBody = document.getElementById('tablebody');
    let uiString = `<tr>
                        <td>${book.bName}</td>
                        <td>${book.bAuthor}</td>
                        <td>${book.bType}</td>
                    </tr>`;
    tableBody.innerHTML += uiString;
}

Display.prototype.validate = function (book) {
    if (book.bName.length < 2 || book.bAuthor.length < 2) {
        return false
    }
    else {
        return true;
    }
}

Display.prototype.show = function(type, showmsg){
    let message = document.getElementById("message");
    message.innerHTML = `
                <div class="alert alert-${type} alert-dismissible fade show" role="alert">
                    <strong>Message!</strong> ${showmsg}.
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
    `
    setTimeout(function(){
        message.innerHTML = "";
    }, 3000);
}

Display.prototype.clear = function(){
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}


//To submit event listener to libraryForm
let libraryForm = document.getElementById("libraryForm");

libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log("You have submitted your form");
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;

    // To grab fiction, programming and cooking
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();
    if(display.validate(book)){
        display.add(book);
        display.clear();
        display.show('success', "Your book has been successfully added");
    }
    else{
        display.show('danger', "Sorry you cannot add this book");
    }

    e.preventDefault();
}