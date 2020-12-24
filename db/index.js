const connection = require("./connection");

module.exports = {
    //get a single table of all
    getCombinedTables(){
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
    getAllTables(tableName){
        return connection.query("SELECT * FROM ??",[tableName]);
    },
    getManager(){
        return connection.query(
        `SELECT concat(em.first_name," ",em.last_name) as manager,e.manager_id  
        FROM employee e
        LEFT JOIN employee em
        ON e.manager_id = em.employee_id
        WHERE e.manager_id 
        ORDER BY e.employee_id;`);
    },
    addEmployee(name,last, id, managerId){
        return connection.query(
        `INSERT INTO employee SET?`,
        {
            id_role: id,
            first_name: name,
            last_name: last,
            manager_id:managerId
        });
    },
    addRole(id,title,salary){
        return connection.query(
        `INSERT INTO role SET?`,
        {
            department_id: id,
            title: title,
            salary: salary,
        });
    },
    addDepartment(deptName){
        return connection.query(
        `INSERT INTO department SET?`,
        {
            department_name: deptName,
        });
    },

    endConnection(){
        connection.end();
    }
}