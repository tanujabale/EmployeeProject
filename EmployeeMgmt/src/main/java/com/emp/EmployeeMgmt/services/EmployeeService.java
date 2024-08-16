package com.emp.EmployeeMgmt.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.emp.EmployeeMgmt.entity.Employee;
import com.emp.EmployeeMgmt.repository.EmployeeRepository;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public ResponseEntity<String> saveEmployee(Employee employee) {
        try {
            // Check if email or mobile number already exists
            if (employeeRepository.existsByEmail(employee.getEmail())) {
                return new ResponseEntity<>("Email ID already exists", HttpStatus.BAD_REQUEST);
            }

            if (employeeRepository.existsByMobile(employee.getMobile())) {
                return new ResponseEntity<>("Mobile number already exists", HttpStatus.BAD_REQUEST);
            }

            // Save the new employee
            employeeRepository.save(employee);
            return new ResponseEntity<>("Employee added successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while saving the employee", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<List<Employee>> getAllEmployees() {
        try {
            List<Employee> employees = employeeRepository.findAll();
            if (employees.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(employees, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Employee> getEmployeeById(int employeeId) {
        try {
            Optional<Employee> employee = employeeRepository.findById(employeeId);
            return employee.map(emp -> new ResponseEntity<>(emp, HttpStatus.OK))
                           .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<String> deleteEmployee(int employeeId) {
        try {
            if (employeeRepository.existsById(employeeId)) {
                employeeRepository.deleteById(employeeId);
                return new ResponseEntity<>("Employee deleted successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Employee not found", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("An error occurred while deleting the employee", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<Employee> updateEmployee(Employee employee) {
        try {
            // Check if employee exists before updating
            if (employeeRepository.existsById(employee.getEmployeeId())) {
                Employee updatedEmployee = employeeRepository.save(employee);
                return new ResponseEntity<>(updatedEmployee, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
