USE employee_db;

--add departaments 
INSERT INTO department(department_name)
VALUES
("Engineering"),
("Sales"),
("Finace"),
("Legal");

--add roles
INSERT INTO role(department_id, title, salary)
VALUES
(1,"Lead Engineer",150000),
(1,"Software Engineer",12000),
(2,"Sales Lead",100000),
(2,"Salesperson",80000),
(3,"Accountant",12500),
(4,"legal Team Lead", 250000),
(4,"Lawyer", 190000);

--add employees
INSERT INTO employee(id_role, first_name, last_name)
VALUES
(3,"Jonh","Doe"),
(4,"Mike","Chan"),
(1,"Ashley","Rodriguez"),
(2,"Kevin","Tupik"),
(3,"Melia","Brown"),
(6,"Sarah","Lourd"),
(7,"Tom","Allen"),
(1,"Christian","Eckenrode");

--use this to update manger to employee 
--or update employee in general
update employee 
set manager_id = 2 
where first_name = "Christian" AND last_name = "Eckenrode";

--use this to see each tables

SELECT * FROM departamens
SELECT * FROM roles
SELECT * FROM employess


--use this to have a nice TABLE 
USE employee_db;

SELECT e.employee_id, e.first_name, e.last_name,r.title,r.salary, d.department_name, concat(em.first_name," ",em.last_name) as manager 
FROM employee e
INNER JOIN role r
ON e.id_role = r.id_role OR e.id_role is null
LEFT JOIN department d
ON d.department_id = r.department_id OR d.department_id is null OR r.department_id is null 
LEFT JOIN employee em
ON e.manager_id = em.employee_id
GROUP by e.employee_id
ORDER BY e.employee_id;


