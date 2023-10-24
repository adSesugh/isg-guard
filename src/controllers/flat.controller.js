import { PrismaClient } from "@prisma/client";
import { currentUser } from "../utils/helpers.js";

const flatController = new Object();
const prisma = new PrismaClient();

// GET - retreive all flats
flatController.list = async (req, res) => {
    try {
        const flats = await prisma.flat.findMany({});
        return res.status(200).json({
            success: true,
            flats
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

// GET - Retreive single flat record
flatController.singleFlat = async (req, res) => {
    try {
        const flatId = req.params.id;
        const flat = await prisma.flat.findFirstOrThrow({
            where: {
                id: flatId
            }
        });

        return res.status(200).json({
            success: true,
            flat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

// POST - create a flat
flatController.create = async (req, res) => {
    try {
        const { name, towerId, societyId } = req.body;
        const number = 'BNP9039393X';
        const flat = await prisma.flat.create({
            data: {
                name,
                number,
                towerId,
                societyId
            }
        });

        return res.status(201).json({
            success: true,
            message: "Flat saved!",
            flat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

// PUT - update flat info
flatController.update = async (req, res) => {
    try {
        const fId = req.params.id;
        const { flatId, societyId, name } = req.body;
        const flat = await prisma.flat.update({
            where: {
                id: fId
            },
            data: {
                number,
                flatId,
                societyId
            }
        });

        return res.status(201).json({
            success: true,
            message: "Flat updated!",
            flat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

// DELETE - destroy a flat record
flatController.delete = async (req, res) => {
    try {
        const fId = req.params.id;
        const flat = await prisma.flat.delete({
            where: {
                id: fId
            }
        });

        return res.status(205).json({
            success: true,
            message: "Flat deleted!",
            flat
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

export default flatController;