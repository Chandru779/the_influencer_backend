class UserController {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async createUser(req, res) {
        try {
            const userData = req.body;
            const newUser = await this.userModel.create(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error });
        }
    }

    async getUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await this.userModel.findById(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const updatedData = req.body;
            const updatedUser = await this.userModel.findByIdAndUpdate(userId, updatedData, { new: true });
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id;
            const deletedUser = await this.userModel.findByIdAndDelete(userId);
            if (!deletedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    }
}

export default UserController;