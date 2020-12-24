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
        case "VIEW_EMPLOYEE_BY_MANAGER":
            viewEmpByMan();
            break;

        case "CHANGE_EMPLOYEEs_ROLE":
            updateEmployeeRoles();
            break; 

        case "CHANGE_EMPLOYEEs_MANAGER":
            updateEmpManager();
            break;
            
        case "REMOVE_EMPLOYEE":
            removeEmployee();
            break; 

        case "REMOVE_DEPARTMENT":
            removeDepartment();
            break;

        case "REMOVE_ROLE":
            removeRoles();
            break;

        case "DEPARTMENT_BUDGET":
            budget();
            break                   
            
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
//Update employee roles
const updateEmployeeRoles = async  () =>{
    const {emp, roleId} = await promptUser(q.employeeRoleQ())
    console.log(emp, roleId);
    try{
        const c = await db.changeRole(emp, roleId);
        console.log(c.affectedRows + " product inserted!\n")
        start();
    }catch(err){
        console.error(err);
    }
}
//Update employee managers
const updateEmpManager = async () =>{
    const {emp, manager} = await promptUser(q.changeManager())
    console.log(emp, manager);
    try{
        const c = await db.changeManager(emp, manager);
        console.log(c.affectedRows + " product inserted!\n")
        start();
    }catch(err){
        console.error(err);
    }
}
//departments budget
const budget = async () =>{
    const{id} = await promptUser(q.departmentList());
    try{
        const budgetTable = await db.budget(id);
        console.table(budgetTable)
        initialContact();
        
    }catch(err){
        console.error(err);
    }

}
//Delete departments
const removeDepartment = async () =>{
    const{id} = await promptUser(q.departmentList());
    try{
        const c = await db.removeDepartment(id);
        console.log(c.affectedRows + " product inserted!\n")
        viewTable("department");
        initialContact()
    }catch(err){
        console.error(err);
    }

}
//Delete roles
const removeRoles = async () =>{
    const{roleId} = await promptUser(q.roleList());
    try{
        const c = await db.removeRoles(roleId);
        console.log(c.affectedRows + " product inserted!\n")
        viewTable("role");
    }catch(err){
        console.error(err);
    }
} 
//Delete employees
const removeEmployee = async () =>{
    const{emp} = await promptUser(q.employeeList());
    try{
        const c = await db.removeEmployee(emp);
        console.log(c.affectedRows + " product inserted!\n")
        start();
    }catch(err){
        console.error(err);
    }

} 
//view table by manager
const viewEmpByMan = async () =>{
    const{manager} = await promptUser(q.askForWhatManager());
    try{
        const empByMan = await db.getTableEmployeeByManager(manager);
        console.table(empByMan);
        initialContact();
    }catch(err){
        console.error(err);
    }
}

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

