"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
exports.taskRoutes = router;
// Route to get all tasks
router.get('/', (req, res) => (0, taskController_1.getTasks)(req, res));
// Route to create a new task
router.post('/', (req, res) => (0, taskController_1.createTask)(req, res));
