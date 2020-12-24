const db = require("../db/index.js");
module.exports = {
    //ask initial question
    WhatWouldYouLikeToDo(){
        return [{
                type:"list",
                name:"action",
                message:"What would you like to do?",
                choices:[
                        "VIEW_DEPARTMENT",
                        "VIEW_ROLE",
                        "VIEW_EMPLOYEE",
                        "ADD_EMPLOYEE",
                        "ADD_DEPARTMENT",
                        "ADD_ROLE",
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
        {
            name: "roleId",
            type: "rawlist",
            message: "What is there role?",
            choices: async () =>{
                let roles = await db.getAllTables("role");
                return roles.map(({id_role, title}) => {
                   return{
                       name:title,
                       value:id_role
                   }
                })
 
            }
        },
        {
            name: "managerId",
            type: "rawlist",
            message: "What is there role?",
            choices: async () =>{
                let manager = await db.getManager();
                return manager.map(({manager,manager_id}) => {
                   return{
                       name:manager,
                       value:manager_id
                   }
                })
            }
        }]
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
        {
            name: "id",
            type: "rawlist",
            message: "What department does this role belong to?",
            choices: async () =>{
                
                let departments = await db.getAllTables("department");
                console.log(departments)
                return departments.map(({department_id, department_name}) => {
                   return{
                       name:department_name,
                       value:department_id
                   }
                })
               // return departments;
            }
        }]
    },

    askDepartmentQ(){
        return[{
            name: "deptName",
            type: "input",
            message: "What is the name of Department?"
        }]
    }
}