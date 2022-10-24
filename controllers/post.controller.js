// const { findByIdAndUpdate } = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const { uploadErrors } = require('../utils/errors.utils');
const ObjectId = require('mongoose').Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);


module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Error to get data: ' + err);
    }).sort({ createdAt: -1 });
}

module.exports.createPost = async (req, res) => {
    let fileName;

    if (req.file !== null) {
        try {
            if (
                req.file.detectedMimeType != "image/jpg" &&
                req.file.detectedMimeType != "image/png" &&
                req.file.detectedMimeType != "image/jpeg"
            )
                throw Error("invalid file");

            if (req.file.size > 1500000) throw Error("max size");
        } catch (err) {
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
        }
        fileName = req.body.posterId + Date.now() + '.jpg';

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/posts/${fileName}`
            )
        );


    }

    const newPost = new PostModel({
        posterId: req.body.posterId,
        picture: req.file !== null ? "./uploads/posts/" + fileName : "",
        pseudo: req.body.pseudo,
        email: req.body.email,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
        bio: req.body.bio
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
};


module.exports.updatePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const updatedRecord = {
        message: req.body.message
    }

    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    )
}


// module.exports.deletePost = (req, res, next) => {
//     if (!ObjectId.isValid({ _id: req.params.id }))
//         return res.status(400).send("ID unknown : " + req.params.id);

//     PostModel.findOneAndRemove(
//         { _id: req.params.id },
//         (err, docs) => {
//             if (!err) res.send(docs);
//             else console.log("Delete error : " + err);
//         });

// }
exports.deletePost = (req, res, next) => {
    PostModel.findOne({ _id: req.params.id })
        .then((post) => {
            const filename = post.picture.split("uploads/posts/")[1];
            //[1] pour retirer le  './',
            console.log("filename", filename);
            console.log("post", post);
            console.log("post.picture", post.picture);
            fs.unlink("client/public/uploads/posts/" + filename, (err) => {
                console.log("filenamefs", filename);
                console.log("err", err);
                //unlink suivi d'un callback car c'est une fonction asynchrone, une fois que la suppression a eu lieu on appelle la methode qui surpprime le post de la database
                PostModel.deleteOne({ _id: req.params.id })
                    .then(() => {
                        res.status(200).json({ message: "Post supprimée !" });
                    })
                    .catch((error) => res.status(401).json({ error }));
            });
            // }
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

module.exports.likePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id },
            },
            { new: true },
            // (err, docs) => {
            //     if (err) return res.status(400).send(err)
            // }
        ).then((data) => { res.send(data); console.log("data", data); })
            .catch((err) => res.status(500).send({ message: err }));



        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: { likes: req.params.id }, //ajoute l'id du post dans le tableau de l'utilisateur qui like
            },
            { new: true }
        ),
            (err, docs) => {
                if (!err) { res.send(docs); console.log("docs", docs); }
                else return res.status(400).send(err);
            };
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id },
            },
            { new: true },
            // (err, docs) => {
            //     if (err) return res.status(400).send(err)
            // }
        ).then((data) => { res.send(data); console.log("data", data); })
            .catch((err) => res.status(500).send({ message: err }));



        await UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: { likes: req.params.id }, //ajoute l'id du post dans le tableau de l'utilisateur qui like
            },
            { new: true }
        ),
            (err, docs) => {
                if (!err) { res.send(docs); console.log("docs", docs); }
                else return res.status(400).send(err);
            };
    } catch (err) {
        return res.status(400).send(err);
    }
};

module.exports.commentPost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new: true },
            (err, docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        );
    } catch (err) {
        return res.status(400).send(err);
    }
}

module.exports.editCommentPost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return PostModel.findById(req.params.id, (err, docs) => {
            const theComment = docs.comments.find((comment) =>
                comment._id.equals(req.body.commentId)
            );

            if (!theComment) return res.status(404).send('Comment not found');
            theComment.text = req.body.text;

            return docs.save((err) => {
                if (!err) return res.status(200).send(docs);
                return res.status((500).send(err));
            });
        });
    } catch (err) {
        return res.status(400).send(err);
    }
};


module.exports.deleteCommentPost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            { new: true })
            .then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(400).send(err);
    }
};
// module.exports.deleteCommentPost = (req, res) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send("ID unknown : " + req.params.id);

//     try {
//         return PostModel.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $pull: {
//                     comments: {
//                         _id: req.body.commentId,
//                     }
//                 }
//             }, console.log("207"),
//             { new: true },
//             (err, docs) => {
//                 if (!err) return res.send(docs);
//                 else return res.status(400).send(err);
//             }
//         );
//     } catch (err) {
//         return res.status(400).send(err);
//     }
// };






//         await UserModel.findByIdAndUpdate(
//             req.body.id,
//             {
//                 $addToSet: { likes: req.params.id },
//             },
//             { new: true },
//             (err, docs) => {
//                 if (!err) res.send(docs);
//                 else return res.status(400).send(err);
//             }
//         )
//     } catch (err) {
//         return res.status(400).send(err);
//     }
// };


