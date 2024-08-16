package com.emp.EmployeeMgmt.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Pattern;

@Entity
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int employeeId;
	private String employeeName;

	private LocalDate dateOfJoining;

	private String mobile;

	private String email;
	private Double salary;
	private String designation;
	
	private String alternativeMobile;

	public int getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(int employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeName() {
		return employeeName;
	}

	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}

	public LocalDate getDateOfJoining() {
		return dateOfJoining;
	}

	public void setDateOfJoining(LocalDate dateOfJoining) {
		this.dateOfJoining = dateOfJoining;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Double getSalary() {
		return salary;
	}

	public void setSalary(Double salary) {
		this.salary = salary;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getAlternativeMobile() {
		return alternativeMobile;
	}

	public void setAlternativeMobile(String alternativeMobile) {
		this.alternativeMobile = alternativeMobile;
	}

	@Override
	public String toString() {
		return "Employee [employeeId=" + employeeId + ", employeeName=" + employeeName + ", dateOfJoining="
				+ dateOfJoining + ", mobile=" + mobile + ", email=" + email + ", salary=" + salary + ", designation="
				+ designation + ", alternativeMobile=" + alternativeMobile + "]";
	}

	public Employee(int employeeId, String employeeName, LocalDate dateOfJoining, String mobile, String email,
			Double salary, String designation, String alternativeMobile) {
		super();
		this.employeeId = employeeId;
		this.employeeName = employeeName;
		this.dateOfJoining = dateOfJoining;
		this.mobile = mobile;
		this.email = email;
		this.salary = salary;
		this.designation = designation;
		this.alternativeMobile = alternativeMobile;
	}

	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}

}
