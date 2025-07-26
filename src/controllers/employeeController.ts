import { Request, Response } from 'express';
import prisma from '../prisma/client';

// Create a new employee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    console.log('Received request body:', JSON.stringify(req.body, null, 2));
    // Handle potential field name variations
    const { 
      name, 
      email, 
      position, 
      department, 
      salary,
      age, // in case frontend is still sending student data
      fullName, // in case frontend sends fullName instead of name
      annualSalary, // in case frontend sends annualSalary instead of salary
      hireDate // in case frontend sends hireDate
    } = req.body;
    
    // Use fallback field names if primary ones are missing
    const employeeName = name || fullName;
    const employeeSalary = salary || annualSalary;
    
    console.log('Extracted fields:', { 
      name: employeeName, 
      email, 
      position, 
      department, 
      salary: employeeSalary,
      hireDate 
    });
    
    // Check if frontend is sending student data instead of employee data
    if (age !== undefined && (!position && !department && !salary)) {
      return res.status(400).json({
        error: 'Frontend is sending student data instead of employee data. Please update your frontend form to include: position, department, and salary fields.',
        received: req.body,
        expected: {
          name: 'string',
          email: 'string', 
          position: 'string',
          department: 'string',
          salary: 'number'
        },
        note: 'Your frontend form appears to be using the student form structure. Please update it to use the employee form structure.'
      });
    }
    
    // Validate required fields
    if (!employeeName || !email || !position || !department || employeeSalary === undefined) {
      console.log('Validation failed:', { 
        name: employeeName, 
        email, 
        position, 
        department, 
        salary: employeeSalary 
      });
      return res.status(400).json({ 
        error: 'Missing required fields. Please provide: name, email, position, department, and salary',
        received: { 
          name: employeeName, 
          email, 
          position, 
          department, 
          salary: employeeSalary 
        },
        expected: {
          name: 'string',
          email: 'string',
          position: 'string', 
          department: 'string',
          salary: 'number'
        }
      });
    }
    
    // Clean salary - remove currency symbols and commas
    const cleanSalary = String(employeeSalary).replace(/[$,]/g, '');
    const salaryNumber = parseFloat(cleanSalary);
    if (isNaN(salaryNumber)) {
      return res.status(400).json({ 
        error: 'Salary must be a valid number',
        received: employeeSalary,
        cleaned: cleanSalary
      });
    }
    
    const employee = await prisma.employee.create({
      data: { 
        name: String(employeeName), 
        email: String(email), 
        position: String(position), 
        department: String(department), 
        salary: salaryNumber 
      },
    });
    res.status(201).json(employee);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Get all employees
export const getEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: { hireDate: 'desc' }
    });
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single employee by ID
export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update an employee by ID
export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, email, position, department, salary, isActive } = req.body;
    
    // Validate required fields
    if (!name || !email || !position || !department || salary === undefined) {
      return res.status(400).json({ 
        error: 'Missing required fields. Please provide: name, email, position, department, and salary' 
      });
    }
    
    // Validate salary is a valid number
    const salaryNumber = parseFloat(salary);
    if (isNaN(salaryNumber)) {
      return res.status(400).json({ 
        error: 'Salary must be a valid number' 
      });
    }
    
    const employee = await prisma.employee.update({
      where: { id: Number(id) },
      data: { 
        name: String(name), 
        email: String(email), 
        position: String(position), 
        department: String(department), 
        salary: salaryNumber,
        isActive: isActive !== undefined ? Boolean(isActive) : true
      },
    });
    res.json(employee);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an employee by ID
export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Get employees by department
export const getEmployeesByDepartment = async (req: Request, res: Response) => {
  try {
    const { department } = req.params;
    const employees = await prisma.employee.findMany({
      where: { department },
      orderBy: { name: 'asc' }
    });
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get active employees
export const getActiveEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await prisma.employee.findMany({
      where: { isActive: true },
      orderBy: { hireDate: 'desc' }
    });
    res.json(employees);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}; 