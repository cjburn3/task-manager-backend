"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRoutes = void 0;
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
exports.taskRoutes = router;
router.get('/', taskController_1.getTasks);
router.post('/', taskController_1.createTask);
