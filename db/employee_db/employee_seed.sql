USE employee_db;

INSERT INTO departament(name)
VALUES
("Engineering"),
("Sales"),
("Finace"),
("Legal");

INSERT INTO role(departament_id, title, salary)
VALUES
(1,"Lead Engineer",150000),
(1,"Software Engineer",12000),
(2,"Sales Lead",100000),
(2,"Salesperson",80000),
(3,"Accountant",12500),
(4,"legal Team Lead", 250000),
(4,"Lawyer", 190000);


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
update employee 
set manager_id = 2 
where first_name = "Christian" AND last_name = "Eckenrode";
