console.log("hello js");



const weatherForm = document.querySelector("form");
const weatherInput = document.querySelector("input");
const msg1 = document.querySelector(".msg1");
const msg2 = document.querySelector(".msg2");

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();

    fetch(`http://localhost:3000/weather?address=${weatherInput.value}`).then(response=>{
    response.json().then((data,error)=>{

        msg1.textContent = "Loading ....";
        msg2.textContent = "";
        if(data.error){
            msg1.textContent = "ops Error";
            msg2.textContent = data.error;
        } else {
            msg1.textContent = data.location;
            msg2.textContent = data.forecast;
        }
    })
})
});