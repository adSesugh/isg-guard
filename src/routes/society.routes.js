import societyController from "../controllers/society.controller.js";
import express from 'express';

const router = express.Router();

router.get('/', societyController.read)
    .post('/', societyController.create)
    .get('/:id/details', societyController.singleSociety)
    .put('/:id/update', societyController.update)
    .delete('/:id', societyController.delete);
export default router;