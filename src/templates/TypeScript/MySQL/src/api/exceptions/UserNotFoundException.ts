import { BadRequestError } from 'routing-controllers';
import { MsgError } from '@base/utils/msg-error';

export class UserNotFoundException extends BadRequestError {
    constructor() {
        super(MsgError.INVALID_USER);
    }
}
