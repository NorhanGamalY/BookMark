let siteName = document.getElementById('site-name');
let siteUrl = document.getElementById('site-url');
let markRow =document.getElementById('mark-table');
let allBookMarks =  JSON.parse(localStorage.getItem('allBookMarks')) || []
displayBookMarks(allBookMarks);
function addBookMark(){
    let bookMark = {
        markName: siteName.value,
        markUrl: siteUrl.value
    }
    allBookMarks.push(bookMark);
    localStorage.setItem('allBookMarks', JSON.stringify(allBookMarks))
    displayBookMarks(allBookMarks);
}

function displayBookMarks(arr){
   let HtmlMarkUp =''
    for(let i=0; i< arr.length; i++){
        HtmlMarkUp+=
        `   <tr class="d-flex justify-content-between py-2 border-top w-100 m-auto">
                        <td class="w-25">${i}</td>
                        <td class="w-25">${arr[i].markName}</td>
                        <td class="w-25"> <a target="_blank" href="${arr[i].markUrl}"> <button class="btn-visit"> <i class="fa-solid fa-eye"></i> Visit</button></a></td>
                        <td class="w-25"><button class="btn-delete" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i>  Delete</button></td>
                    </tr> `
    }
    markRow.innerHTML = HtmlMarkUp;
}

function deleteSite(i){
allBookMarks.splice(i ,1);
displayBookMarks(allBookMarks);
localStorage.setItem('allBookMarks', JSON.stringify(allBookMarks))
}

function validateName() {
    let nameRegex = /^[A-Za-z]{3,}$/;
    return nameRegex.test(siteName.value);
}

function validateUrl() {
     let url = siteUrl.value.trim();
    if (url === "") return false;

    let urlRegex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/;
    return urlRegex.test(siteUrl.value);
}

function handleSubmit() {
    if (!validateName() || !validateUrl()) {
        displayAlert()
    return false;
    }

    addBookMark();
    return false;
}


function displayAlert() {
    document.getElementById("alert-box").classList.remove("d-none");
}

function closeAlert() {
    document.getElementById("alert-box").classList.add("d-none");
}
