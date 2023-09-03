/// <reference types="../@types/jquery/" />


let Data = document.getElementById("Data");
let searchMeal = document.getElementById("searchMeal");
let contactUs=document.getElementById("contactUs");
let submitBtn;
let inputName ;
let inputEmail ;
let inputPhone ;
let inputAge ;
let inputPassword; 
let inputRepassword; 

//********** loading ************ 
$(function(){
    getData("").then(() => {
        $(".loading").fadeOut(500)
    })
})
//********** close Nav ************ 
function closeNavList() {
    let navWidth = $(".navList .navContact").outerWidth()
    $(".navList").animate({"left":-navWidth}, 600)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({top: 300}, 300)
}
//********** open Nav ************ 

function openNavList() {
    $(".navList").animate({"left":"0"}, 600)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({"top": "0"},(i+5)* 100)
    }
}

//********** open&close Nav ************ 
function openCloseNav(){
$(".open-close-icon").on("click" , function(){
    if ($(".navList").css("left") == "0px") {
        closeNavList()
    } else {
        openNavList()
    }
})
}
openCloseNav()

//**********get Data ************ 
async function getData(meal) {
    closeNavList()
    Data.innerHTML = ""
    $(".sectionLoading").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".sectionLoading").fadeOut(300)

}


async function getCategory(getcateg) {
    Data.innerHTML = ""
    $(".sectionLoading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${getcateg}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".sectionLoading").fadeOut(300)

}

async function getArea(area) {
    Data.innerHTML = ""
    $(".sectionLoading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".sectionLoading").fadeOut(300)

}

async function getIngredients(ingredients) {
    Data.innerHTML = ""
    $(".sectionLoading").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".sectionLoading").fadeOut(300)

}

async function detailsMeal(mealID) {
    closeNavList()
    Data.innerHTML = ""
    $(".sectionLoading").fadeIn(300)

    searchMeal.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayDetailsMeal(respone.meals[0])
    $(".sectionLoading").fadeOut(300)

}
//********* search by letter ******* 
async function searchByLetter(letter) {
    closeNavList()
    Data.innerHTML = ""
    letter == "" ? letter = "m" : "";
    $(".sectionLoading").fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
    response = await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".sectionLoading").fadeOut(300)

}

//********** display data  ************ 
function displayMeals(meal) {
    let cartona = "";

    for (let i = 0; i < meal.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="detailsMeal('${meal[i].idMeal}')" class="meal rounded-2 cursor">
                    <img class="w-100" src="${meal[i].strMealThumb}" alt="" >
                    <div class="layers ps-2">
                        <h3>${meal[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    Data.innerHTML = cartona
}

function displayCategories(Categ) {
    let cartona = "";

    for (let i = 0; i < Categ.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getCategory('${Categ[i].strCategory}')" class="meal  rounded-2 cursor">
                    <img class="w-100" src="${Categ[i].strCategoryThumb}" alt="" >
                    <div class="layers flex-wrap text-center p-3">
                        <div class="text-center w-100">
                        <h3 class=" ">${Categ[i].strCategory}</h3>
                        </div>
                        <p>${Categ[i].strCategoryDescription.split(" ").slice(0,15).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    Data.innerHTML = cartona
}

function displayArea(Area) {
    let cartona = "";

    for (let i = 0; i < Area.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getArea('${Area[i].strArea}')" class="rounded-2 text-center cursor">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${Area[i].strArea}</h3>
                </div>
        </div>
        `
    }

    Data.innerHTML = cartona
}

function displayIngredients(Ingr) {
    let cartona = "";

    for (let i = 0; i < Ingr.length; i++) {
        cartona += `
        <div class="col-md-3">
                <div onclick="getIngredients('${Ingr[i].strIngredient}')" class="rounded-2 text-center cursor p-3">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${Ingr[i].strIngredient}</h3>
                        <p>${Ingr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div>
        `
    }

    Data.innerHTML = cartona
}

//********** display Details Meal  ************ 

function displayDetailsMeal(meal) {
    
    searchMeal.innerHTML = "";
    let ingredients = ``
    for (let i = 1; i <= `strIngredient`.length ; i++) {
        let Recipes;
        if (meal[`strIngredient${i}`]) {
            Recipes=`<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
            ingredients += Recipes
        }
    }

    let tags = meal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        let Tags= `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
        tagsStr += Tags
    }

    let cartona = `
            <div class="col-md-4">
                <img class="w-100 rounded-3 pb-2" src="${meal.strMealThumb}" alt="">
                <span class="fs-3">${meal.strMeal}</span>
            </div>

            <div class="col-md-8">
                
            <div>
            <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
            </div>

                <div>
                <h3>Recipes :</h3>
                <span class="list-unstyled d-flex flex-wrap">
                    ${ingredients}
                </span>
                </div>

                <div>
                <h3>Tags :</h3>
                <span class="list-unstyled px-0 d-flex">
                    ${tagsStr}
                </span>
                </div>

                <div>
                <a  href="${meal.strSource}" class="btn btn-success" target="_blank">Source</a>
                <a  href="${meal.strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
                </div>
            </div>`

    Data.innerHTML = cartona
}
//...................................................................................

//**********Categories**************

$("#Categories").on("click",async function(){
    Data.innerHTML = ""
    $(".sectionLoading").fadeIn(300)
    searchMeal.innerHTML = "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    displayCategories(response.categories)
    $(".sectionLoading").fadeOut(300)

})


//*******Area***********
$("#Area").on("click",async function(){
    Data.innerHTML = ""
    $(".sectionLoading").fadeIn(300)
    searchMeal.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    displayArea(respone.meals)
    $(".sectionLoading").fadeOut(300)

})



//*******Ingredients********

$("#Ingredients").on("click",async function(){
    Data.innerHTML = ""
    $(".sectionLoading").fadeIn(300)
    searchMeal.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    displayIngredients(respone.meals.slice(0, 20))
    $(".sectionLoading").fadeOut(300)

})

// ******search******
$("#search").on("click" ,function(){
        
        searchMeal.innerHTML = `
        <div class="row py-4 form ">
            <div class="col-md-6 ">
                <input onkeyup="getData(this.value)" class="form-control bg-black text-white  " type="text" placeholder="Search By Name">
            </div>
            <div class="col-md-6">
                <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-black text-white  " type="text" placeholder="Search By First Letter">
            </div>
        </div>`
    
        Data.innerHTML = ""

})


//*********Contacts***********
$("#Contacts").on("click",function () {
    searchMeal.innerHTML = "";
    Data.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none"></div>
            </div>

            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none"></div>
            </div>

            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none"></div>
            </div>

            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none"></div>
            </div>

            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none"></div>
            </div>

            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control" placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none"></div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger  px-2 mt-3">Submit</button>
    </div>
</div> `

checkInputs()
} )



function checkInputs(){
    submitBtn = document.getElementById("submitBtn")
    document.getElementById("nameInput").addEventListener("focus", () => {
        inputName = true
    })

    document.getElementById("emailInput").addEventListener("focus", () => {
        inputEmail = true
    })

    document.getElementById("phoneInput").addEventListener("focus", () => {
        inputPhone = true
    })

    document.getElementById("ageInput").addEventListener("focus", () => {
        inputAge = true
    })

    document.getElementById("passwordInput").addEventListener("focus", () => {
        inputPassword= true
    })

    document.getElementById("repasswordInput").addEventListener("focus", () => {
        inputRepassword = true
    })

}


function inputsValidation() {
    if (inputName) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }
    if (inputEmail) {

        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (inputPhone) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")

        }
    }

    if (inputAge) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")

        }
    }

    if (inputPassword) {
        if (passwordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (inputRepassword) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }

    submitValidation()
}

function nameValidation() {
    let regex=/^[a-zA-Z ]+$/;
    if(regex.test(document.getElementById("nameInput").value)){
        nameInput.classList.add("is-valid");
        nameInput.classList.remove("is-invalid");
        return true

    }
    else{
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
        document.getElementById('nameAlert').innerHTML = 'Special characters and numbers not allowed'
        return false;
    }
}

function phoneValidation() {
    let regex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if(regex.test(document.getElementById("phoneInput").value)){
        phoneInput.classList.add("is-valid");
        phoneInput.classList.remove("is-invalid");
        return true
    }
    else{
        phoneInput.classList.add("is-invalid");
        phoneInput.classList.remove("is-valid");
        document.getElementById('phoneAlert').innerHTML = 'Enter valid Phone Number'
        return false;
    }
}

function emailValidation() {
    let regex=/@[a-z]{1,10}(\.com)$/ ;
    if(regex.test(document.getElementById("emailInput").value)){
        emailInput.classList.add("is-valid");
        emailInput.classList.remove("is-invalid");
        return true
    }
    else{
        emailInput.classList.add("is-invalid");
        emailInput.classList.remove("is-valid");
        document.getElementById('emailAlert').innerHTML = 'Email not valid *exemple@yyy.zzz'
        return false;
    }
}

function ageValidation() {
    let regex=/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
    if(regex.test(document.getElementById("ageInput").value)){
        ageInput.classList.add("is-valid");
        ageInput.classList.remove("is-invalid");
        return true
    }
    else{
        ageInput.classList.add("is-invalid");
        ageInput.classList.remove("is-valid");
        document.getElementById('ageAlert').innerHTML = 'Enter valid age'
        return false;
    }
}

function passwordValidation() {
    let regex=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;
    if(regex.test(document.getElementById("passwordInput").value)){
        passwordInput.classList.add("is-valid");
        passwordInput.classList.remove("is-invalid");
        return true
    }
    else{
        passwordInput.classList.add("is-invalid");
        passwordInput.classList.remove("is-valid");
        document.getElementById('passwordAlert').innerHTML = 'Enter valid password *Minimum eight characters, at least one letter and one number:*'
        return false;
    }
}

function repasswordValidation() {
    if(document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value){
        repasswordInput.classList.add("is-valid");
        repasswordInput.classList.remove("is-invalid");
        return true
    }
    else{
        repasswordInput.classList.add("is-invalid");
        repasswordInput.classList.remove("is-valid");
        document.getElementById('repasswordAlert').innerHTML = 'Enter valid password '
        return false;
    }
}

function submitValidation(){
    if (nameValidation() &&
    phoneValidation() &&
    passwordValidation() &&
    emailValidation() &&
    ageValidation() &&
    repasswordValidation()) 
    {
    submitBtn.removeAttribute("disabled")
} else {
    submitBtn.setAttribute("disabled",true)
}
}
