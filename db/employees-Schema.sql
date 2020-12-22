CREATE database employee_DB;

CREATE TABLE departament(
    departament_id INT NOT NULL AUTO_INCREMENT, 
    name VARCHAR(30)
);

CREATE TABLE role(
    id_role INT NOT NULL AUTO_INCREMENT, 
    title VARCHAR(30),
    salary DECIMAL (10,4),
    PRIMARY KEY (id_role),
    FOREIGN KEY (departament_id) REFERENCES departament(departament_id)
);

CREATE TABLE employee(
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    FOREIGN KEY (id_role) REFERENCES role(id_role),
)





