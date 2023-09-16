import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const societyController = new Object();

// GET - Get all society records
societyController.read = async (req, res) => {
    try {
        const societies = await prisma.society.findMany({});
        return res.status(200).json({
            success: true,
            societies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

// GET - Get single society
societyController.singleSociety = async (req, res) => {
    try {
        const societyId = req.params.id;
        const society = await prisma.society.findFirstOrThrow({
            where: {
                id: societyId
            },
            include: {
                towers: true,
                guard: true
            }
        });

        return res.status(200).json({
            success: true,
            society
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

// POST - create society
societyController.create = async (req, res) => {
    try {
        const { name, location } = req.body;
        const society = await prisma.society.create({
            data: {
                location,
                name
            }
        });
        return res.status(201).json({
            success: true,
            message: "Soceity created",
            society
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

// PUT - Update society
societyController.update = async (req, res) => {
    try {
        const societyId = req.params.id;
        const { name, location } = req.body;
        const society = await prisma.society.update({
            where: {
                id: societyId
            },
            data: {
                name,
                location
            }
        });

        return res.status(200).json({
            success: true,
            message: "Society Updated!",
            society
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

societyController.delete = async (req, res) => {
    const societyId = req.params.id;
    try {
        const society = await prisma.society.delete({
            where: {
                id: societyId
            }
        });

        return res.status(205).json({
            success: true,
            message: `${society.name} deleted!`,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

export default societyController;