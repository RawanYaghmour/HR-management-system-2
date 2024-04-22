'use strict';

function getEmployeesFromLocalStorage() {
    const jsonData = localStorage.getItem("allEmployee");
    return jsonData ? JSON.parse(jsonData) : [];
}

function calculateDepartmentStats(employees) {
    const departments = {};
    employees.forEach(employee => {
        const { department, salary } = employee;
        departments[department] = departments[department] || { count: 0, totalSalary: 0 };
        departments[department].count++;
        departments[department].totalSalary += salary;
    });

    Object.values(departments).forEach(department => {
        department.averageSalary = department.totalSalary / department.count;
    });

    return departments;
}

function renderHrTable(departments) {
    var tableContainer = document.getElementById('HR-table');
    var table = document.createElement('table');
    table.style.width = '90%';
    table.style.margin = '22px auto';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = '#e4f0f5';

    table.className = 'department-table';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr style="background-color: #2c5e77; color: white;">
            <th>Department</th>
            <th>Number of Employees</th>
            <th>Average Salary</th>
            <th>Total Salary</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    var totalEmployees = 0;
    var totalSalary = 0;
    var alldepartmentKeys = Object.keys(departments);
    for (var i = 0; i < alldepartmentKeys.length; i++) {
        var department = alldepartmentKeys[i];
        var dept = departments[department];
        var tr = document.createElement('tr');
        tr.innerHTML = 
        '<td>' 
        + department + '</td><td>' 
        + dept.count + '</td><td>$' 
        + totalSalary.toFixed(2) + '</td><td>$' 
        + dept.averageSalary.toFixed(2) + 
        '</td>';

        tr.style.textAlign = 'center';
        tbody.appendChild(tr);
        totalEmployees += dept.count;
        totalSalary += dept.totalSalary;
    }
    table.appendChild(tbody);
    var averageSalaryAll = totalSalary / totalEmployees;
    var tfoot = document.createElement('tfoot');
    tfoot.innerHTML = 
    '<tr style="background-color: #70c4ee; color: white;"><th>Total</th><th>' 
    + totalEmployees + '</th><th>$' 
    + totalSalary.toFixed(2) + '</th><th>$' 
    + averageSalaryAll.toFixed(2) + '</th></tr>';
    
    tfoot.style.textAlign = 'center';
    table.appendChild(tfoot);
    tableContainer.appendChild(table);
}
document.addEventListener('DOMContentLoaded', function() {
    var employees = getEmployeesFromLocalStorage();
    var departmentStats = calculateDepartmentStats(employees);
    renderHrTable(departmentStats);
});