CREATE database employee_DB;

USE employee_DB;

CREATE TABLE departament(
    departament_id INT AUTO_INCREMENT, 
    name VARCHAR(30),
    PRIMARY KEY (departament_id)
);


CREATE TABLE role(
    id_role INT NOT NULL AUTO_INCREMENT, 
    departament_id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL (10,4),
    PRIMARY KEY (id_role),
    FOREIGN KEY (departament_id) REFERENCES departament(departament_id)
);

CREATE TABLE employee(
    employee_id INT NOT NULL AUTO_INCREMENT,
    id_role INT NOT NULL,
    manager_id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    PRIMARY KEY(employee_id),
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id),
    FOREIGN KEY (id_role) REFERENCES role(id_role)
);






