CREATE database employee_DB;

USE employee_DB;

CREATE TABLE department(
    department_id INT AUTO_INCREMENT, 
    department_name VARCHAR(30),
    PRIMARY KEY (department_id)
);


CREATE TABLE role(
    id_role INT NOT NULL AUTO_INCREMENT, 
    department_id INT,
    title VARCHAR(30),
    salary DECIMAL (10,4),
    PRIMARY KEY (id_role),
    CONSTRAINT fk_department_id
    FOREIGN KEY (department_id)
    REFERENCES department (department_id)
    ON DELETE SET NULL
);

CREATE TABLE employee(
    employee_id INT NOT NULL AUTO_INCREMENT,
    id_role INT,
    manager_id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    PRIMARY KEY(employee_id),
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id),
    CONSTRAINT fk_id_role
    FOREIGN KEY (id_role)
    REFERENCES role (id_role)
    ON DELETE SET NULL
);






