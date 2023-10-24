import express from 'express';
import flatController from "../controllers/flat.controller.js";

const router = express.Router();

router.get('/', flatController.list);
router.get('/:id', flatController.singleFlat);
router.post('/', flatController.create);
router.put('/:id/update', flatController.update);
router.delete('/:id', flatController.delete);

export default router;