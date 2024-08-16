const apiUrl = 'http://localhost:8080'; 

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const employeeId = urlParams.get('employeeId');
    
    // Set today's date as the maximum date for the date picker
    const dateOfJoiningField = document.getElementById('dateOfJoining');
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    dateOfJoiningField.setAttribute('max', todayFormatted);

    if (employeeId) {
        // Fetch existing employee data
        fetch(`${apiUrl}/get/${employeeId}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    document.getElementById('employeeId').value = data.employeeId;
                    document.getElementById('employeeName').value = data.employeeName;
                    document.getElementById('dateOfJoining').value = data.dateOfJoining;
                    document.getElementById('mobile').value = data.mobile;
                    document.getElementById('email').value = data.email;
                    document.getElementById('salary').value = data.salary;
                    document.getElementById('designation').value = data.designation;
                    document.getElementById('alternativeMobile').value = data.alternativeMobile || '';
                } else {
                    alert('Employee not found!');
                    window.location.href = 'employee-list.html'; 
                }
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
                alert('An error occurred while fetching employee data.');
            });
    }

    const form = document.getElementById('updateForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const employeeData = {
            employeeId: document.getElementById('employeeId').value,
            employeeName: document.getElementById('employeeName').value.trim(),
            dateOfJoining: document.getElementById('dateOfJoining').value,
            mobile: document.getElementById('mobile').value.trim(),
            email: document.getElementById('email').value.trim(),
            salary: document.getElementById('salary').value.trim(),
            designation: document.getElementById('designation').value.trim(),
            alternativeMobile: document.getElementById('alternativeMobile').value.trim()
        };

        // Additional date validation before submission
        const dateOfJoiningValue = new Date(employeeData.dateOfJoining);
        if (dateOfJoiningValue > today) {
            alert('Date of joining cannot be in the future.');
            return;
        }

        fetch(`${apiUrl}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        })
        .then(response => response.text().then(text => {
            if (response.ok) {
                alert('Employee updated successfully!');
                window.location.href = 'employee-list.html'; 
            } else {
                alert('An error occurred: ' + text);
            }
        }))
        .catch(error => {
            alert('An error occurred while updating the employee.');
            console.error('Error:', error);
        });
    });
});
