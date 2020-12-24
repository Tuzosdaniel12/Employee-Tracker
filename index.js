const db = require("./db");
const inquirer = require("inquirer");
const q = require("./lib/questions.js");

//print table of all employees
const start  = async () => {
    try{
        const getAllTAbles = await db.getCombinedTables();
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
        case "ADD_EMPLOYEE":
            addEmployee();
            break;
  
        case "ADD_DEPARTMENT":
            addDepartment();
            break;
  
        case "ADD_ROLE":
            addRole();
            break;
        case "VIEW_EMPLOYEE":
        case "VIEW_ROLE":
        case "VIEW_DEPARTMENT":
            if(action == "VIEW_EMPLOYEE") {
                start() 
                break;
            };
            viewTable(action.split("_").pop().toLowerCase());
            break;
    
        default:
              db.endConnection();
            break;
        }
    

}
//add employee
const addEmployee = async () =>{
    const{firstName, lastName, roleId, managerId} = await promptUser(q.askEmployeeQ());
 
    try{
        const addedEmp = await db.addEmployee(firstName, lastName, roleId,managerId)
        console.log(addedEmp.affectedRows + " product inserted!\n")
        start()
    }catch(err){
        console.error(err);
    }
}
//add role
const addRole = async () => {
    const{id,title,salary} = await promptUser(q.askRoleQ());
    
    try{
        const addedRole = await db.addRole(id,title,salary)

        console.log(addedRole.affectedRows + " product inserted!\n")
        viewTable("role");

    }catch(err){
        console.error(err);
    }

}
//add department
const addDepartment = async () =>{
    const{deptName} = await promptUser(q.askDepartmentQ());

    try{
        const addedDep = await db.addDepartment(deptName);
        console.log(addedDep.affectedRows + " product inserted!\n")
        viewTable("department");
    }catch(err){
        console.error(err);
    }
}
//insert into employee

//

//view any table
const viewTable = async (tableName) =>{
    const table = await db.getAllTables(tableName)
    console.table(table);
    initialContact();

}
//ask user questions and wait for response
const promptUser = (question) =>{
    return inquirer
        .prompt(question);
}
//start function
start();

