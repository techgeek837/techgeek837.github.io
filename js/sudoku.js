//Generating the input fields and requried attributes
let smallBoxes = document.querySelectorAll('.smallBox')
let boxCount = -1
let rowCount = -1
let colCount = 8
smallBoxes.forEach((element,number)=>{
    if(number % 27 == 0)
    {
        rowCount += 1
        boxCount +=1
        colCount -=8
    }
    else if(number % 9 == 0){
        boxCount +=1    
        rowCount -= 2
        colCount +=1
    }
    else if(number%3 == 0) {
        rowCount += 1
        colCount -= 2
    }
    else {
        colCount +=1
    }
    element.innerHTML = `<input type="text" onkeydown="EnterToTab(event,this)" id="${rowCount}${colCount}" onchange="validateNumber(this)" data-col="${colCount}" data-row="${rowCount}"data-boxNo="${boxCount}" data-fixed="yes"  class="input">`
})


//Mobile Support
function EnterToTab(event,field){
    if (event.keyCode==13)
      event.keyCode=9
    validateNumber(field)
}
//Validating the Input
function validateNumber(field){
    const userInput = field.value
    if(userInput == "")  return
    let parsedInput = +userInput
    if(isNaN(parsedInput) || !Number.isInteger(parsedInput) || parsedInput>9 || parsedInput<1)
    {
        alert("Enter a valid Number")
        field.value = null
        field.focus()
        return
    }
}

//Clearing the form
function clearForm(){
    smallBoxes.forEach((element)=>{
        element.firstChild.value = null
        element.firstChild.classList.remove("userEntered")
    })
}
clearBtn.addEventListener('click',clearForm)


//Creating the 2D 9X9 array
let arr = [
    new Array(9),
    new Array(9),
    new Array(9),

    new Array(9),
    new Array(9),
    new Array(9),

    new Array(9),
    new Array(9),
    new Array(9),
]

//Getting Inputs
solveBtn.addEventListener('click',()=>{
    smallBoxes.forEach((element)=>{
        let field = element.firstChild
        let userInput = field.value
        if(userInput == "")
            arr[field.dataset.row][field.dataset.col] = {value:0,fixed:false,possibleValues:[1,2,3,4,5,6,7,8,9]}
        else{
            arr[field.dataset.row][field.dataset.col] = {value:+userInput,fixed:true}
            field.classList.add("userEntered")
        }
    })
    bruteForceAlgorithm()
})

function validateState(){
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            //console.log("Validating")
            let temp = arr[i][j].value
            if(temp == 0) continue
            //Row checking
            for(let k=j+1; k < 9 ;k++){
                if(arr[i][k].value == temp)
                    return false
            }
            //Coloum checking
            for(let k=i+1; k < 9 ;k++){
                if(arr[k][j].value == temp)
                    return false
            }
            //Box Checking
            for(let a= i-(i%3) ; a <= i-(i%3)+2 ; a++){
                for(let b = j -(j%3) ; b < j - (j%3)+2 ; b++){
                    if(arr[a][b].value == temp && a!=i && b!=j)
                        return false
                }
            }
        }
    }
    return true
}


//Solving Algorithm
function bruteForceAlgorithm(){
    let goBack = false
    console.log(arr)
    for(let i=0;i<9;i++){
        for(let j=0;j<9;j++){
            if(arr[i][j].fixed){
                if(goBack == true){
                    if(j==0){
                        j = 7
                        if(i==0){alert("Invalid Puzzle");clearForm();return}
                        i=i-1
                    }
                    else{
                        j = j-2
                    }
                }
                continue
            }
            goBack = false
            do {
                arr[i][j].value++
                document.getElementById(`${i}${j}`).value = arr[i][j].value
                window.requestAnimationFrame(()=>console.log("r"))             
            } while (arr[i][j].value <10 && !validateState())
            if(arr[i][j].value==10){
                //GO back
                goBack = true 
                arr[i][j].value =0
                if(j==0){
                    j = 7
                    if(i==0) return
                    i=i-1
                }
                else{
                    j = j-2
                }
            }
        }
    }
}



//UI
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

function getHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
}

document.querySelector('.sudokuContainer').style.width = 0.8 * (Math.min(getHeight(),getWidth()))+'px'
document.querySelector('.sudokuContainer').style.height = 0.72 * (Math.min(getHeight(),getWidth()))+'px'