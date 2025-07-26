import { Request, Response } from 'express';
import prisma from '../prisma/client';

// Create a new employee
export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { name, email, position, department, salary } = req.body;
    const employee = await prisma.employee.create({
      data: { 
        name, 
        email, 
        position, 
        department, 
        salary: parseFloat(salary) 
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
    const employee = await prisma.employee.update({
      where: { id: Number(id) },
      data: { 
        name, 
        email, 
        position, 
        department, 
        salary: parseFloat(salary),
        isActive 
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