const db = require("../db/index.js");

module.exports = {
    //ask initial question
    WhatWouldYouLikeToDo(){
        return [{
                type:"list",
                name:"action",
                message:"What would you like to do?\n",
                choices:[
                        "VIEW_DEPARTMENT",
                        "VIEW_ROLE",
                        "VIEW_EMPLOYEE",
                        "VIEW_EMPLOYEE_BY_MANAGER",
                        "ADD_EMPLOYEE",
                        "ADD_DEPARTMENT",
                        "ADD_ROLE",
                        "CHANGE_EMPLOYEEs_ROLE",
                        "CHANGE_EMPLOYEEs_MANAGER",
                        "REMOVE_EMPLOYEE",
                        "REMOVE_DEPARTMENT",
                        "REMOVE_ROLE",
                        "DEPARTMENT_BUDGET",
                        "QUIT"
                ]
        }];
    },//end ask initial question

    //ask for employee requirements
    askEmployeeQ(){
        return[{
            name: "firstName",
            type: "input",
            message: "What is the employees first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employees last name?"
        },
        role(),
        assignManager()]
    },//end of ask for employee requirements

    //ask for role requirements
    askRoleQ(){
        return[{
            name: "title",
            type: "input",
            message: "What is the role title?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the role salary?"
        },
        department()]
    },
    //ask for department requirements
    askDepartmentQ(){
        return[{
            name: "deptName",
            type: "input",
            message: "What is the name of Department?"
        }]
    },
    deleting(){
        return {
            type: "confirm",
            name: "answer",
            message: "If you delete any roles, departments or employees you might delete multiple employees associated to the action?"
        }
    },
    //ask for what manager to render table by manager
    askForWhatManager(){
        return[currentManager()]
    },
     //ask what employee need a role change role tide
    employeeRoleQ(){
        return[employee(),role()]
    },
    changeManager(){
        return[employee(),
            assignManager()]
    },
    departmentList(){
        return[department()]
    },
    roleList(){
        return[role()]
    },
    employeeList(){
        return[employee()]
    }
   

}
//manager question
const currentManager = () =>{
    return {
        name: "manager",
        type: "rawlist",
        message: "What is the managers name?",
        choices: ()=>getManager()
    }
}
//employee question
const employee = () =>{
    return {
        name:"emp",
        type: "rawlist",
        message: "Which employee?",
        choices: ()=>getEmp()
    }
}
const assignManager = () =>{
    return {
        name:"manager",
        type: "rawlist",
        message: "Which employee is there manager?",
        choices: ()=>getEmp()
    }
}
//role question
const role = () =>{
    return {
        name: "roleId",
        type: "rawlist",
        message: "What is the role?",
        choices: ()=>getRole()
    }
}

//department question
const department = () =>{
    return  {
        name: "id",
        type: "rawlist",
        message: "What is the department name?",
        choices: ()=>getDept()
    }
}
//read employee table
const getEmp = async() =>{
    let emp = await db.getAllTables("employee")
    let array = emp.map(({employee_id, first_name,last_name}) =>{
        return{
            name:`${first_name} ${last_name}`,
            value:employee_id
        }
    })
    array.push({
        name:`No Employee`,
        value: "null"
    })
    return array
}
//real role table
const getRole = async() =>{
    let roles = await db.getAllTables("role");
    return roles.map(({id_role, title}) => {
       return{
           name:title,
           value:id_role
       }
    })
}
//read manager table
const getManager = async () =>{
    let manager = await db.getManager();
    
    return manager.map(({manager,manager_id}) => {
       return{
           name:manager,
           value:manager_id
       }
    })
}
//read department table
const getDept = async() =>{
            
    let departments = await db.getAllTables("department");
    return departments.map(({department_id, department_name}) => {
       return{
           name:department_name,
           value:department_id
       }
    })
   // return departments;
}