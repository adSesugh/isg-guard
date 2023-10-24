import towerController from "../controllers/tower.controller.js";
import express from 'express';

const router = express.Router();

router.get('/', towerController.list)
    .get('/:id/', towerController.singleTower)
    .post('/', towerController.create)
    .put('/:id/update', towerController.update)
    .delete('/:id/destroy', towerController.delete);

export default router;