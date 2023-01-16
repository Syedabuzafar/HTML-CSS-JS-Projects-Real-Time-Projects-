//finalResult will hold the final output for the calculator
var finalEval = "";
var isEqualClicked = false; // this is to check whether the equal button is already PRESSED
var finalValue = 0;
var resultText = document.getElementsByClassName("cal-result")[0];

//this function will clear the result
function allClear() {
    resultText.innerText = '';
}

//this function is used to insert any value to the expression
function insertValue(val) {
        if(val==="0" && finalEval.length<1){
            resultText.innerText = val;
            return null;
        }
        if(isEqualClicked==true && (finalEval.includes('+') || finalEval.includes('-') ||
        finalEval.includes('/') || finalEval.includes('*'))){
            resultText.innerText = resultText.innerText+val;
            finalEval = resultText.innerText;
        }else{
            resultText.innerText = resultText.innerText+val;
            finalEval = resultText.innerText;
        }
}
function performOperation(objBtn){
    if(resultText.innerText === "0" && (objBtn.value=="+" || objBtn.value=="-"
    || objBtn.value=="/" || objBtn.value=="*")){
        return null;
    }
    if(finalEval[finalEval.length-1]!="+" && 
    finalEval[finalEval.length-1]!="-" &&
    finalEval[finalEval.length-1]!="/" && finalEval[finalEval.length-1]!="*" &&
    finalEval[finalEval.length-1]!="%"){
        if(isEqualClicked==false){
            finalEval = finalEval+objBtn.value;
            resultText.innerText = finalEval;
        }else{
            finalEval = finalValue+objBtn.value;
            resultText.innerText = finalEval;
        }
    }else{
        console.log("invalid");
    }
}
function updateValue(){
    console.log(finalEval);
    if(finalEval[finalEval.length-1]=='+' || finalEval[finalEval.length-1]=='-' 
    || finalEval[finalEval.length-1]=='*' || finalEval[finalEval.length-1]=='/'){
        finalEval = finalEval.slice(0, finalEval.length-1);
        resultText.innerText = eval(finalEval);
        finalValue = eval(finalEval);
        isEqualClicked = true;
    }else{
        resultText.innerText = eval(finalEval);
        finalValue = eval(finalEval);
        isEqualClicked = true;
    }
}
