import { PrismaClient } from "@prisma/client";

const towerController = new Object();
const prisma = new PrismaClient();

// GET - get all towers
towerController.list = async (req, res) => {
    try {
        const societies = await prisma.tower.findMany({});
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

// GET - get one tower
towerController.singleTower = async (req, res) => {
    try {
        // Retreive the towerId from the request params
        const towerId = req.params.id;
        const tower = await prisma.tower.findFirstOrThrow({
            where: {
                id: towerId
            },
            include: {
                flats: true,
                FlatOwner: true,
                Society: true
            }
        });

        return res.status(200).json({
            success: true,
            tower
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

//POST - create tower
towerController.create = async (req, res) => {
    try {
        const { name, street, city, state, zip } = req.body;
        const tower = prisma.tower.create({
            data: {
                name,
                address: {
                    street,
                    city,
                    state,
                    zip
                }
            }
        });

        res.status(201).json({
            success: true,
            message: 'Tower saved!',
            tower
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

// PUT - Tower update
towerController.update = async () => {
    try {
        const towerId = req.params.id;
        const { name, address } = req.body;
        const tower = await prisma.tower.update({
            where: {
                id: userId
            },
            data: {
                name,
                address
            }
        });

        return res.status(200).json({
            success: true,
            message: "Tower updated!",
            tower
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

// DELETE - Delete tower
towerController.delete = async (req, res) => {
    try {
        const towerId = req.params.id;
        const tower = await prisma.tower({
            where: {
                id: towerId
            }
        });

        return res.status(200).json({
            success: true,
            message: `${tower.name} deleted!`,
            tower
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error
        });
    }
};

export default towerController;