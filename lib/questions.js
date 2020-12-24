const db = require("../db/index.js");
module.exports = {

    WhatWouldYouLikeToDo(){
        return [{
                type:"list",
                name:"action",
                message:"What would you like to do?",
                choices:[
                        "add_Employee",
                        "add_Department",
                        "add_Role",
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
                let choices = await db.readTable("role");
                choices = choices.map(({id_role, title}) => `${id_role} : ${title}`)
                return Object.values(choices)
            }
        }]

    }
}