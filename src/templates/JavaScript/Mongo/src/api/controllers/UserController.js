import User from '../models/User';

export const getUserById = async (req, res) => {
    if (!req.body.userId) {
        throw new Error('No id!');
    }
    const user = await User.find(req.body.userId);

    return user;
};
