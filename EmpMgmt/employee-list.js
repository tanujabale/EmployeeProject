const apiUrl = 'http://localhost:8080'; 

document.addEventListener('DOMContentLoaded', () => {
    const employeeTable = document.getElementById('employeeTable').getElementsByTagName('tbody')[0];

    
    fetch(`${apiUrl}/getAll`)
        .then(response => response.json())
        .then(data => {
            data.forEach(employee => {
                const row = employeeTable.insertRow();
                row.insertCell().textContent = employee.employeeName;
                row.insertCell().textContent = employee.dateOfJoining;
                row.insertCell().textContent = employee.mobile;
                row.insertCell().textContent = employee.email;
                row.insertCell().textContent = employee.salary;
                row.insertCell().textContent = employee.designation;
                row.insertCell().textContent = employee.alternativeMobile || 'N/A'; 
                const actionsCell = row.insertCell();
                actionsCell.innerHTML = `
                    <button onclick="editEmployee(${employee.employeeId})">Update</button>
                    <button onclick="deleteEmployee(${employee.employeeId})">Delete</button>
                `;
            });
        })
        .catch(error => console.error('Error fetching employees:', error));
});


function editEmployee(employeeId) {
    window.location.href = `update.html?employeeId=${employeeId}`;
}


function deleteEmployee(employeeId) {
    if (confirm('Are you sure you want to delete this employee?')) {
        fetch(`${apiUrl}/delete/${employeeId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                alert('Employee deleted successfully!');
                window.location.reload(); 
            } else {
                alert('An error occurred while deleting the employee.');
            }
        })
        .catch(error => console.error('Error deleting employee:', error));
    }
}
