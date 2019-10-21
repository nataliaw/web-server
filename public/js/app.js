console.log("hello js");

const weatherForm = document.querySelector("form");
const weatherInput = document.querySelector("input");
const msg1 = document.querySelector(".msg1");
const msg2 = document.querySelector(".msg2");
const msg3 = document.querySelector(".msg3");

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    fetch(`/weather?address=${weatherInput.value}`).then(response=>{
    response.json().then((data,error)=>{

        msg1.textContent = "Loading ....";
        msg2.textContent = "";
        msg3.textContent = "";
        if(data.error){
            msg1.textContent = "ops Error";
            msg2.textContent = data.error;
            msg3.textContent = "";
        } else {
            msg1.textContent = data.location;
            msg2.textContent = data.currentForecast;
            msg3.textContent = data.dailySummary;
        }
    })
})
});