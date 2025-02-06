
import express from 'express';
import { getAllGadgets, addGadget, updateGadget, decommissionGadget, selfDestructGadget } from '../controller/gadgetController.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.get('/gadgets', authenticateToken, getAllGadgets);
// router.get('/',getAllGadgets);
router.post('/gadgets', authenticateToken, addGadget);
router.patch('/gadgets/:id', authenticateToken, updateGadget);
router.delete('/gadgets/:id', authenticateToken, decommissionGadget);
router.post('/gadgets/:id/self-destruct', authenticateToken, selfDestructGadget);

export default router;