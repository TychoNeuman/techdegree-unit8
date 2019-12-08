const url = "https://randomuser.me/api/?results=12";

const containerDiv = document.getElementById('employee-container');
const employeeButton = document.getElementsByClassName('employee-card');

let employees = "";

containerDiv.innerText = "Loading...";

fetch(url)
    .then((response) => response.json())
    .then(function(data){
        containerDiv.innerText = "";
        employees = data.results;
        console.log(employees);
        let index = 0;
        return employees.map(function(employee){
            let img = document.createElement('img');
                divCard = document.createElement('div');
                divPhoto = document.createElement('div');
                divInfo = document.createElement('div');
                pName = document.createElement('p');
                pEmail = document.createElement('p');
                pResidence = document.createElement('p');
            divCard.classList.add('employee-card');
            pName.textContent = employee.name.first + " " + employee.name.last;
            pName.id = 'name';
            pEmail.textContent = employee.email;
            pResidence.textContent = employee.location.city;
            img.src = employee.picture.large;
            img.classList.add('profile-pic');
            divInfo.classList.add('employee-info');
            divPhoto.append(img);
            divInfo.append(pName);
            divInfo.append(pEmail);
            divInfo.append(pResidence);
            divCard.append(divPhoto);
            divCard.append(divInfo);
            containerDiv.append(divCard);
            divCard.setAttribute('title', index);
            index++;
        })
    })
    .then(function(){
        for(let i = 0; i < employeeButton.length; i++){
            employeeButton[i].addEventListener('click', function(event){
                let chosenIndex = event.target.getAttribute('title');
                document.getElementById('profile-pic-large').src = employees[chosenIndex].picture.large;
                document.getElementById('employee-name-full').textContent =
                    employees[chosenIndex].name.first + " " + employees[chosenIndex].name.last;
                document.getElementById('employee-email-full').textContent = employees[chosenIndex].email;
                document.getElementById('employee-city-full').textContent = employees[chosenIndex].location.city;
                document.getElementById('employee-phone-full').textContent = employees[chosenIndex].phone;
                document.getElementById('employee-address-full').textContent =
                    employees[chosenIndex].location.street.name + " " + employees[chosenIndex].location.street.number  + ", " + employees[chosenIndex].location.state + ", " + employees[chosenIndex].location.postcode;
                let birthday = employees[chosenIndex].dob.date;
                document.getElementById('employee-birthday-full').textContent = "Birthday: " + birthday.substring(0, 10);
                const overlay = document.getElementById('overlay');
                overlay.style.display = "block";
                document.getElementById('close').addEventListener('click', function(){
                    overlay.style.display = "none";
                });
            });
        }
    })
    .catch(function(error){
       console.error("Something went wrong trying to fetch the employees:" + error);
        containerDiv.innerText = "Something went wrong trying to get data.. please try again later!";
    });

