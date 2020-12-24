const db = require("../db/index.js");
module.exports = {

    WhatWouldYouLikeToDo(){
        return [{
                type:"list",
                name:"action",
                message:"What would you like to do?",
                choices:[
                        "VIEW_DEPARTMENT",
                        "VIEW_ROLE",
                        "VIEW_EMPLOYEE",
                        "ADD_EMPLOYEES",
                        "ADD_DEPARTMENTS",
                        "ADD_ROLES",
                        "QUIT"
                ]
        }];
    },
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
                let choices = await db.getAllTables("role");
                choices = choices.map(({id_role, title}) => {
                   return{
                       name:title,
                       value:id_role
                   }
                })
                return choices;
            }
        },
        {
            name: "managerId",
            type: "rawlist",
            message: "What is there role?",
            choices: async () =>{
                let manager = await db.getManager();
                manager = manager.map(({manager,manager_id}) => {
                   return{
                       name:manager,
                       value:manager_id
                   }
                })
                return manager;
            }
        },
    
    ]

    }
}