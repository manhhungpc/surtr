import {EntitySchema} from "typeorm";
import UserModel from "../models/UserModel";

const User = new EntitySchema({
    name: "User",
    target: UserModel,
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        username: {
            type: "varchar"
        },
        password: {
            type: "varchar"
        }, 
        bod: {
            type: "varchar"
        },
        phone: {
            type: "varchar"
        }
}
})

export default User;
