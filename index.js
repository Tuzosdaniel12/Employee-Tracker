const db = require("./db");
const inquirer = require("inquirer");
const q = require("./lib/questions.js");

//print table of all employees
const start  = async () => {
    try{
        const getAllTAbles = await db.getAllTAbles();
        console.table(getAllTAbles)
        initialContact()
    }catch(err){
        console.error(err);
    }
}
//ask user what the want to do first
const initialContact = async() =>{  
    //ask user what they want to do 
    const {action} = await promptUser(q.WhatWouldYouLikeToDo());

    switch (action) {
        case "add_Employee":
          addEmployee();
          break;
  
        case "add_Department":
            addEmployee();
          break;
  
        case "add_Role":
          rangeSearch();
          break;
        }
    

}
const addEmployee = async () =>{
    const{firstName, lastName, roleId} = await promptUser(q.askEmployeeQ());
    console.log(firstName, lastName, roleId)
}
//ask user questions and wait for response
const promptUser = (question) =>{
    return inquirer
        .prompt(question);
}
//start function
start();