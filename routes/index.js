import express from 'express';
import membersRoutes from './members.js';
import messagesRoutes from './messages.js';

const router = express.Router();

router.use('/members', membersRoutes);
router.use('/messages', messagesRoutes);

export default router;
