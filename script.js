const inputBox = document.getElementById("input-box");
const uncheckedListContainer = document.getElementById("unchecked-list-container")
const checkedListContainer = document.getElementById("checked-list-container")
const barWidth = document.getElementById("progress-bar");
const firstNumber = document.getElementById("first-number");
const secondNumber = document.getElementById("second-number");
const progressBar = document.getElementById("progress");
const fileName = document.getElementById("file-name");
const inputElement = document.getElementById("upload-file");
const rewardImage = document.getElementById("reward-image");
const backgroundImage = document.getElementById("background-image");
const fallButton = document.getElementById("fall-button");
const springButton = document.getElementById("spring-button");

function addTask(){
    if(inputBox.value === ""){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        uncheckedListContainer.insertAdjacentElement("afterbegin", li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    updateNumbers();
    updateBar();
    saveData();
}
function clearData(){
    uncheckedListContainer.innerHTML="";
    checkedListContainer.innerHTML="";
    updateNumbers();
    updateBar();
}
function saveData(){
    localStorage.setItem("dataUnchecked", uncheckedListContainer.innerHTML);
    localStorage.setItem("dataChecked", checkedListContainer.innerHTML);
    localStorage.setItem("dataFirstNumber", firstNumber.innerHTML);
    localStorage.setItem("dataSecondNumber", secondNumber.innerHTML);
    localStorage.setItem("dataFileName", fileName.innerHTML);
}
function showTask(){
    uncheckedListContainer.innerHTML = localStorage.getItem("dataUnchecked");
    checkedListContainer.innerHTML = localStorage.getItem("dataChecked");
    firstNumber.innerHTML = localStorage.getItem("dataFirstNumber");
    secondNumber.innerHTML = localStorage.getItem("dataSecondNumber");
    fileName.innerHTML = localStorage.getItem("dataFileName");
    showRewardImage();
    updateBar();
}
function updateNumbers(){
    var checkCount = 0;
    var uncheckCount = 0;
    var checkLength = checkedListContainer.children.length;
    var uncheckLength = uncheckedListContainer.children.length;
    if (checkLength != 0 || uncheckLength != 0){
        checkCount = checkLength;
        uncheckCount = uncheckLength;
    }
    firstNumber.innerHTML = checkCount;
    secondNumber.innerHTML = checkCount + uncheckCount;
    saveData();
}
function updateBar(){
    var newWidth = 0;
    const totalCount = parseInt(secondNumber.innerHTML, 10);
    const checkedCount = parseInt(firstNumber.innerHTML, 10);
    if (totalCount > 0){
        newWidth = checkedCount/totalCount * 75;
        newWidth = Math.min(newWidth, 100);
        barWidth.style.width = newWidth + "%";
        if (checkedCount === totalCount){
            progressBar.style.backgroundImage = "url('images/progress bar finish.png')";
        }
        else{
            progressBar.style.backgroundImage = "url('images/progress bar start.png')";
        }
    }
}
function saveRewardImage(file) {
    const reader = new FileReader();
    reader.onload = function() {
        localStorage.setItem("dataRewardImage", reader.result);
    };
    reader.readAsDataURL(file);
}
function showRewardImage() {
    const savedImage = localStorage.getItem("dataRewardImage");
    if (savedImage) {
        rewardImage.style.backgroundImage = "url('"+savedImage+"')";
    }
}

inputBox.addEventListener("keypress",function(e){
    if (e.key === "Enter"){
        addTask();
    }
});
uncheckedListContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        checkedListContainer.insertAdjacentElement("afterbegin", e.target);
        e.target.classList.toggle("checked");
        updateNumbers();
        updateBar();
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        updateNumbers();
        updateBar();
        saveData();
    }
}, false);
checkedListContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        uncheckedListContainer.insertAdjacentElement("afterbegin", e.target);
        e.target.classList.toggle("checked");
        updateNumbers();
        updateBar();
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        updateNumbers();
        updateBar();
        saveData();
    }
}, false);
inputElement.addEventListener("change", function(){
    const selectedFile = inputElement.files[0];
    if (selectedFile) {
        const objectURL = URL.createObjectURL(selectedFile);
        fileName.textContent = selectedFile.name;
        rewardImage.style.backgroundImage = "url('"+objectURL+"')";
        saveRewardImage(selectedFile);
        saveData();
    }
    else {
        fileName.textContent = "No file chosen"
    }
}, false);
fallButton.addEventListener("click", function(e){
    backgroundImage.style.backgroundImage = "url('images/fall background.png')";
    fallButton.style.backgroundImage = "url('images/clicked fall button.png')";
    springButton.style.backgroundImage = "url('images/unclicked spring button.png')";
});
springButton.addEventListener("click", function(e){
    backgroundImage.style.backgroundImage = "url('images/spring background.png')";
    springButton.style.backgroundImage = "url('images/clicked spring button.png')";
    fallButton.style.backgroundImage = "url('images/unclicked fall button.png')";
});

showTask();
