import mongoose from "mongoose";
//При создании шаблона таблицы, если мы хотил чтобы поля было обязательным мы передаём значение ключа в виде объекта, если хотим чтобы поле было опциональным, то передаём просто тип поля как значение ключа поля.
const UserSchema = new mongoose.Schema({
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        passwordHash: {
            type: String,
            required: true,
        },

        avatarUrl: String,
    },
    {
        timestamps: true,
    });

export default mongoose.model("User", UserSchema)