const connection = require("./connection");

module.exports = {
    //show all the departaments;
    getTable(tableName){

        return connection.query(`SELECT * FROM ?;`, [tableName]);
    },
    //get a single table of all
    getAllTAbles(){
        return connection.query(
            `SELECT e.employee_id, e.first_name, e.last_name,r.title,r.salary, d.department_name, concat(em.first_name," ",em.last_name) as manager 
            FROM employee e
            INNER JOIN role r
            ON e.id_role = r.id_role
            INNER JOIN department d
            ON d.department_id = r.department_id
            LEFT JOIN employee em
            ON e.manager_id = em.employee_id
            ORDER BY e.employee_id;`
            );
    },
    readTable(role){
        return connection.query("SELECT * FROM ??",[role]);
    }
}