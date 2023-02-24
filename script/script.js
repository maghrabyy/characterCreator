const row = document.querySelector('.row');
const addUserBtn = document.getElementById('add-user-btn');
const expandSearchBtn = document.getElementById('exp-search-btn');
const searchBtn = document.getElementById('search-btn');
const clearResultsbtn = document.getElementById('clear-results');

const errorMsg = document.getElementById('error-msg');
const imgSrc = "assets/images/char";

let usersList = [];

const getInputData = function () {
    const firstNameInput = document.getElementById('first-name-input').value;
    const lastNameInput = document.getElementById('last-name-input').value;
    const ageInput = document.getElementById('age-input').value;
    const descriptionInput = document.getElementById('description-input').value;
    const randCharImgId = Math.floor((Math.random() * 30) + 1);
    return {
        fName: firstNameInput,
        lName: lastNameInput,
        age: ageInput,
        desc: descriptionInput,
        charImgId: randCharImgId,
    }
}

const clearInput = function () {
    const userInputs = document.getElementsByName('user-input');
    userInputs.forEach((input) => {
        if (input) {
            input.value = '';
        }
    })
}

const clearResultsHandler = function () {
    if (clearResultsbtn.classList.contains('d-block')) {
        clearResultsbtn.classList.replace('d-block', 'd-none');
        updateUI();
        console.log('test')
    }
}

clearResultsbtn.addEventListener('click', clearResultsHandler);

createUserBox = function (charImgId, userFName, userLName, userAge, userDesc) {
    const newCol = document.createElement("div");
    newCol.classList.add('col-lg-5');
    const newUserBox = document.createElement("div");
    newUserBox.classList.add('userBox', 'text-white');
    const newUserName = document.createElement("div");
    newUserName.classList.add('user-name');
    newUserName.innerHTML = `<img src="${imgSrc}${charImgId}.png" class="img-fluid" alt=""> <h3>${userFName} ${userLName}</h3>`
    const newOtherInfo = document.createElement("div");
    newOtherInfo.classList.add('other-info');
    newOtherInfo.innerHTML = `<p class="mb-0">${userAge}</p> <p>${userDesc}</p>`;
    row.append(newCol);
    newCol.append(newUserBox);
    newUserBox.append(newUserName, newOtherInfo);
    setTimeout(() =>
        newUserBox.classList.add("animate"), 5);
    errorMsg.classList.replace('d-block', 'd-none')
}

const updateUI = function (searchResults) {
    while (row.lastChild.id !== 'clear-results') {
        row.removeChild(row.lastChild);
    }
    if (searchResults) {
        clearResultsbtn.classList.replace('d-none', 'd-block');
    }
    const filteredList = !searchResults ? usersList : searchResults;
    filteredList.forEach(user => {
        createUserBox(user.charImgId, user.fName, user.lName, user.age, user.desc)
    })
}

const addUserHandler = function () {
    const inputData = getInputData();
    if (inputData.fName && inputData.lName && inputData.age && inputData.desc) {
        createUserBox(inputData.charImgId, inputData.fName, inputData.lName, inputData.age, inputData.desc);
        usersList.push(inputData)
        clearInput();
        clearResultsHandler();
    }
    else {
        errorMsg.classList.replace('d-none', 'd-block')
        errorMsg.textContent = 'Complete the following fields';
    }
}

addUserBtn.addEventListener('click', addUserHandler);


const expandSearchHandler = function () {
    const searchArea = document.getElementById('search-area');
    const greatingMsg = document.querySelector(".greetingMsg");
    greatingMsg.classList.toggle('ms-auto');
    greatingMsg.classList.toggle('me-auto');
    if (searchArea.classList.contains('d-none')) {
        searchArea.classList.toggle('d-none');
        setTimeout(() =>
            searchArea.classList.toggle("animate"), 5);
    }
    else {
        searchArea.classList.toggle("animate");
        setTimeout(() => {
            searchArea.classList.toggle('d-none');
        }, 100)
    }
}

expandSearchBtn.addEventListener('click', expandSearchHandler);

const displayAlert = function (alertMsg) {
    const popAlert = document.getElementById("pop-alert");
    if (!popAlert.classList.contains('animate')) {
        const popAlertMsg = popAlert.lastElementChild;
        popAlertMsg.textContent = alertMsg;
        setTimeout(() =>
            popAlert.classList.add("animate"), 5);
        setTimeout(() => {
            popAlert.classList.remove("animate");
        }, 5000);
    }
}

const searchHandler = function () {
    const searchInput = document.getElementById('search-input').value;
    if (searchInput) {
        const searchResults = usersList.filter(user => {
            return user.fName.includes(searchInput)
                || user.lName.includes(searchInput)
                || user.age.includes(searchInput)
                || user.desc.includes(searchInput)
        })

        document.getElementsByName('search').forEach((input) => {
            if (input) {
                input.value = '';
            }
        })
        if (searchResults.length > 0) {
            updateUI(searchResults);
        }
        else {
            displayAlert("Couldn't find anything here.");
        }
    }
}

searchBtn.addEventListener('click', searchHandler);