const rootParent = document.getElementById("root");
let searchStud = document.getElementById("searchByName");
let searchStudTag = document.getElementById("searchByTag");
let database = [];
let tags = [];
async function getClimate(){
    let url = "https://api.hatchways.io/assessment/students";
       await fetch(url)
          .then(response => response.json())
          .then(data =>{
              console.log(data.students.length);
              for(let i = 0; i< data.students.length; i++){
                  createElement(i);
                }
                searchStudTag.addEventListener("keyup", (e)=>{
                    let searchTitle = e.target.value.toLowerCase();
                    for(let i =0; i<tags.length; i++){
                        let newer = tags[i].textContent; 
                        if(newer.toLowerCase().indexOf(searchTitle) !=-1){
                            tags[i].parentNode.parentNode.style.display ='flex'; 
                        }else{
                            tags[i].parentNode.parentNode.style.display ='none';
                        }
                    }
                });
                searchStud.addEventListener("keyup", (e)=>{
                    database.forEach(el =>{
                        el.style.display = "none";
                    });
                    let searchTitle = e.target.value.toLowerCase();
                    for(let i = 0; i<data.students.length; i++){
                          let checkit = data.students[i].firstName;
                          if(checkit.toLowerCase().indexOf(searchTitle) != -1){
                              console.log('yes');
                              createElement(i);
                              console.log(data.students);
                            }
                        }
                      });
              function createElement(el){
                  let enterTag = document.createElement("input");
                  let tag = document.createElement("h4");
                  // add tag 
                  enterTag.placeholder= "Add tag";
                  enterTag.classList.add("tag-input");
                  enterTag.addEventListener("keypress", (e)=>{
                      let searchKey = e.target.value;
                      if(e.key == "Enter"){
                          if(searchKey){
                              tag.textContent = searchKey;
                              tag.classList.add("tag");
                              tags.push(tag);
                              enterTag.value= "";
                            }
                      }
                   });
                  let rootElement = document.createElement("div");
                  let rootChild = document.createElement("div");
                  let rootChild1 = document.createElement("div");
                  rootChild1.classList.add("space-around");
                  rootElement.classList.add("display-root-element");
                  // grade button
                  let gradeBtn = document.createElement("button");
                  gradeBtn.innerText ="+";
                  gradeBtn.classList.add("grade-btn");
                  let gradeSummary = document.createElement("p");
                  gradeSummary.classList.add("nodisplay");
                  gradeBtn.addEventListener("click", ()=>{
                      console.log("yeap");
                      gradeSummary.classList.toggle("nodisplay");
                      gradeSummary.classList.toggle("displayStud");
                  });
                  //display elements
                  let studGrades =data.students[el].grades;
                  let test = 1;
                  studGrades.forEach((stud) =>{
                      let newGrade =document.createElement("span");
                      newGrade.textContent = `Test ${test++}: ${stud}%`;
                      gradeSummary.append(newGrade);
                  });
                  let img = document.createElement("img");
                  let fullName = document.createElement("h2");
                  let email = document.createElement("h3");
                  let company = document.createElement("h3");
                  let skill= document.createElement("h3");
                  let average= document.createElement("h3");
                  img.src = data.students[el].pic;
                  fullName.textContent =data.students[el].firstName +' '+ data.students[el].lastName;
                  email.textContent ="Email: " + data.students[el].email;
                  company.textContent ="Company: " + data.students[el].company;
                  skill.textContent ="Skill: " + data.students[el].skill;
                  average.textContent ="Average: " + data.students[el].skill;
                  rootChild.append(img);
                  rootChild1.append(fullName, email, company, skill, gradeSummary, tag, enterTag);
                  rootElement.append(rootChild, rootChild1, gradeBtn);
                  database.push(rootElement);
                  rootParent.append(rootElement);
              }
          });
}
getClimate();
