const connection = require("./connection");

module.exports = {
    //get a single table of all
    getCombinedTables(){
        return connection.query(
            `SELECT e.employee_id, e.first_name, e.last_name,r.title,r.salary, d.department_name, concat(em.first_name," ",em.last_name) as manager 
            FROM employee e
            INNER JOIN role r
            ON e.id_role = r.id_role OR e.id_role is null
            LEFT JOIN department d
            ON d.department_id = r.department_id OR d.department_id is null OR r.department_id is null 
            LEFT JOIN employee em
            ON e.manager_id = em.employee_id
            ORDER BY e.employee_id;`
            );
    },
    getAllTables(tableName){
        return connection.query("SELECT * FROM ??",[tableName]);
    },
    getTableEmployeeByManager(id){
        return connection.query(
            `SELECT concat(e.first_name," ",e.last_name) as employee,concat(em.first_name," ",em.last_name) as manager
            FROM employee e
            LEFT JOIN employee em
            ON e.manager_id = em.employee_id
            WHERE em.employee_id = ${id}
            ORDER BY e.employee_id;`);
    },
    getManager(){
        return connection.query(
            `SELECT DISTINCT concat(em.first_name," ",em.last_name) as manager,e.manager_id  
            FROM employee e
            INNER JOIN employee em
            ON e.manager_id = em.employee_id
            ORDER BY e.employee_id`);
    },
    addAll(addArray){
        return connection.query(
            `INSERT INTO ?? SET?`,addArray);
    },
    changeAll(changeArray){
        return connection.query(
            `UPDATE employee SET ? WHERE ?;`,changeArray)
    },
 
    removeAll(removeArray){
        return connection.query(
            `DELETE FROM ??
            WHERE ?;`, removeArray)
    },
    budget(deptId){
        return connection.query(
        `SELECT d.department_name,SUM(r.salary ) as Total_Budget 
        FROM employee e
        INNER JOIN role r
        ON e.id_role = r.id_role
        INNER JOIN department d
        ON d.department_id = r.department_id
        WHERE d.department_id = ?;`,[deptId])
    },
    endConnection(){
        connection.end();
    }
}