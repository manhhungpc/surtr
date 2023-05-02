/**
 * Create your customs decorator
 * For example: a decorator for logged in user
 */
import { createParamDecorator } from 'routing-controllers';

export function LoggedUser() {
    return createParamDecorator({
        value: (action) => {
            return action.request.loggedUser;
        },
    });
}
