import { Router } from 'express';
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeesByDepartment,
  getActiveEmployees,
} from '../controllers/employeeController';

const router = Router();

// Basic CRUD routes
router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/active', getActiveEmployees);
router.get('/department/:department', getEmployeesByDepartment);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

export default router; 