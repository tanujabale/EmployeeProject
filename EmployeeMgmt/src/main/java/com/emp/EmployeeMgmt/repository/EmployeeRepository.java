package com.emp.EmployeeMgmt.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.emp.EmployeeMgmt.entity.Employee;
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {
    boolean existsByEmail(String email);
    boolean existsByMobile(String mobile);
    
}