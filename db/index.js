const mysql = require('mysql2');
const inquirer = require ('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'buckyDO0D0O',
    database: 'business_db'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Connected as ' + connection.threadId + '\n');
    inquireOne();
});

function inquireOne() {
    inquirer.prompt([
            {
                type: 'list',
                name: 'initial',
                message: 'What would you like to do?',
                choices: [
                    {
                        name: 'View all employees.',
                        value: 'VIEW_EMPLOYEES'
                    },
                    {
                        name: 'View all departments.',
                        value: 'VIEW_DEPARTMENTS'
                    },
                    {
                        name: 'View all roles.',
                        value: 'VIEW_ROLE'
                    },
                    {
                        name: 'Add an employee.',
                        value: 'ADD_EMPLOYEE'
                    },
                    {
                        name: 'Add a department.',
                        value: 'ADD_DEPARTMENT'
                    },
                    {
                        name: 'Add a role.',
                        value: 'ADD_ROLE'
                    },
                    {
                        name: "Update an employee's information.",
                        value: 'UPDATE_EMPLOYEE'
                    },
                ]
            }
        ]).then((answers) => {console.log(answers)
            switch(answers.initial){
                // given a value from inquireOne, return a function that connects to our database
                case "VIEW_EMPLOYEES":
                    return viewEmployees()
                case "VIEW_ROLE":
                    return viewRole()
                case "VIEW_DEPARTMENTS":
                    return viewDepartments()
                case "ADD_EMPLOYEE":
                    return addEmployee()
                case "ADD_ROLE":
                    return addRole()
                case "ADD_DEPARTMENT":
                    return addDepartment()
                case "UPDATE_EMPLOYEE":
                    return updateEmployee()
            }
        });
};

// Query business database for all employees
viewEmployees = () => {
    connection.query('SELECT * FROM business_db.Employee', function (err, result) {
        if (err) throw err;
        console.table(result)
    });
    inquireOne()
};

// Query business database for all departments
viewDepartments = () => {
    connection.query('SELECT * FROM business_db.departments', function (err, result) {
        if (err) throw err;
        console.table(result)
    });
}

// Query business database for all roles
viewRole = () => {
    connection.query('SELECT * FROM business_db.role', function (err, result) {
        if (err) throw err;
        console.table(result)
    });
}

// Inquirer prompt collecting info for new employee, pass to next function, run inquireOne function
addEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of your new employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of your new employee?'
        },
        {
            type: 'input',
            name: ' role_id',
            message: 'What is the department ID for your new employee?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'What is the manager ID for your new employee?'
        }
    ]).then(res => {
        let empName = res;
        addEmployeeSql(empName)
        inquireOne()
    })
};

// Insert new employee into database, employee table
addEmployeeSql = (role) => {
    return connection.query('INSERT INTO employee SET ?', role)
};

// Inquirer prompt collecting info for new department, pass to next function, run inquireOne function
addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'What is the name of the department you would like to add?'
        }
    ]).then(res => {
        let depName  = res;
        addDepartmentSql(depName)
        inquireOne()
    })
};

// Insert new department into database, department table
addDepartmentSql = (department) => {
    return connection.query('INSERT INTO departments SET ?', department)
}

// Inquirer prompt collecting info for new role, pass to next function, run inquireOne function
addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: ' What is the name of the role you would like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary for your new role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department id for your new role?'
        }
    ]).then(res => {
        let roleName = res;
        addRoleSql(roleName)
        inquireOne()
    })
};

addRoleSql = (role) => {
    return connection.query('INSERT INTO role SET ?', role)
};

updateEmployee = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the NEW ID for your employee?'
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'What is the NEW role for your employee?'
        }
    ]).then(res => {
        let updateEmp = res;
        updateEmployeeSql(updateEmp)
        inquireOne()
    })
};

updateEmployeeSql = (role) => {
    return connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [role[0], role[1]])
};