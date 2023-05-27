import User from '../entities/User';
import { dataSource } from '~/config/db';

export const getUserById = async (req, res) => {
    if (!req.body.userId) {
        throw new Error('No id!');
    }

    const userRepository = dataSource.getRepository(User)
    const user = userRepository.findOneBy({id: req.body.userId})

    return user;
};
