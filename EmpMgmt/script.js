const apiUrl = 'http://localhost:8080';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('employeeForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const employeeName = document.getElementById('employeeName').value.trim();
        const dateOfJoining = document.getElementById('dateOfJoining').value;
        const mobile = document.getElementById('mobile').value.trim();
        const email = document.getElementById('email').value.trim();
        const salary = document.getElementById('salary').value.trim();
        const designation = document.getElementById('designation').value.trim();
        const alternativeMobile = document.getElementById('alternativeMobile').value.trim();

        // Validation Patterns
        const namePattern = /^[A-Z][a-zA-Z\s]+$/; // Name should start with a capital letter and contain only alphabets and spaces
        const phonePattern = /^[6-9]\d{9}$/; // Phone number should be 10 digits and start with 6, 7, 8, or 9
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Valid email pattern
        const dateOfJoiningValue = new Date(dateOfJoining);
        const today = new Date();

        // Name validation
        if (!namePattern.test(employeeName)) {
            alert('Invalid name! Name should start with a capital letter and contain only alphabets and spaces.');
            return;
        }

        // Date validation - no future dates allowed
        if (dateOfJoiningValue > today) {
            alert('Date of joining cannot be in the future.');
            return;
        }

        // Mobile number validation
        if (!phonePattern.test(mobile)) {
            alert('Invalid phone number! Must be 10 digits and start with 6, 7, 8, or 9.');
            return;
        }

        // Email validation
        if (!emailPattern.test(email)) {
            alert('Invalid email format!');
            return;
        }

        // Salary validation - must be positive
        if (isNaN(salary) || salary <= 0) {
            alert('Salary must be a positive number.');
            return;
        }

        // Alternative Mobile validation
        if (alternativeMobile && !phonePattern.test(alternativeMobile)) {
            alert('Invalid alternative mobile number! Must be 10 digits and start with 6, 7, 8, or 9.');
            return;
        }

        // Preparing the employee data
        const employeeData = {
            employeeName: employeeName,
            dateOfJoining: dateOfJoining,
            mobile: mobile,
            email: email,
            salary: salary,
            designation: designation,
            alternativeMobile: alternativeMobile
        };

        // Sending the employee data to the server
        fetch(`${apiUrl}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employeeData)
        })
        .then(response => response.text().then(text => {
            if (response.ok) {
                alert('Employee added successfully!');
                console.log('Employee added:', text);
                form.reset(); // Reset the form after successful submission
                window.location.href = 'employee-list.html';
            } else {
                // Handle server-side validation errors
                if (text.includes('Email ID already exists')) {
                    alert('This email is already registered. Please use a different email.');
                } else if (text.includes('Mobile number already exists')) {
                    alert('This mobile number is already registered. Please use a different mobile number.');
                } else {
                    alert('An error occurred: ' + text);
                }
            }
        }))
        .catch(error => {
            alert('An error occurred while adding the employee.');
            console.error('Error:', error);
        });
    });

    // Prevent future dates in date picker
    const dateOfJoiningField = document.getElementById('dateOfJoining');
    const today = new Date();
    const todayFormatted = today.toISOString().split('T')[0];
    dateOfJoiningField.setAttribute('max', todayFormatted);
});
