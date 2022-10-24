const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6
        },
        picture: {
            type: String,
            default: "./uploads/profil/random-user.png"
        },
        bio: {
            type: String,
            max: 1024,
        },
        // followers: {
        //     type: [String]
        // },
        // following: {
        //     type: [String]
        // },
        likes: {
            type: [String]
        },
        role: {
            type: String,
            required: true,
            default: "2023",
        },

    },
    {
        timestamps: true,
    }
);

// play function before save into display: 'block',
userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            // console.log(user.id);
            // Le console log ici sert à recueillir l'id du USER
            //Requete ne fonctionne pas sur POSTMAN mais fonctionne dans la console
            //Fonctionne pas sur Postman mais fonctionne dans la console
            //Voir video FROMSCRATCH 2H05

            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email')
};

// userSchema.statics.login = async function (email, password) {
//     const user = await this.findOne({ email });
//     if (user) {
//         const auth = await bcrypt.compare(password, user.password);
//         if (auth) {
//             return user;
//         }
//         throw Error('incorrect password');
//     }
//     throw Error('incorrect email')
// };

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;