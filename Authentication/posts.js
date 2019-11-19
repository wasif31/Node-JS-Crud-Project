const router = require('express').Router();
const verify = require('./varifyToken');
const Post = require('./models/Posts');
const { postCreation } = require('./validation');

router.get('/all', async (req, res) => {
    Post.find({})
        .then(postFound => {
            if (!postFound) return res.status(404).end("Sorry! No post found!");
            return res.status(200).json(postFound);
        });
});

router.post('/create', verify, async (req, res) => {

    const { error } = postCreation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const post = new Post({
        title: req.body.title,
        body: req.body.body,
        _created_by: req.user._id
    });
    try {
        const savedPost = await post.save();
        res.send({ post: savedPost._id });
    } catch (err) {
        res.status(400).send(err);
    }

})

router.get('/mypost', verify, async (req, res) => {

    Post.find({ _created_by: req.user._id })
        .then(postFound => {
            if (!postFound) return res.status(404).end("Sorry! No post found!");
            return res.status(200).json(postFound);
        })

});

router.put('/update/', verify, (req, res) => {
    let query = { _id: req.query.id, _created_by: req.user._id };

    Post.updateOne(query, {
        $set: {
            title: req.body.title,
            body: req.body.body,
        }
    }).then(
        () => {
            res.status(201).json({
                message: 'Thing updated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

router.put('/rate/', verify, (req, res) => {
    let query = { _id: req.query.id };

    Post.updateOne(query, {
        $set: {
            rate: req.body.rate
        }
    }).then(
        () => {
            res.status(201).json({
                message: 'Rated successfully!'
            });
        }
    ).catch(
        (error) => {
            res.status(400).json({
                error: error
            });
        }
    );
});

router.delete('/delete/', verify, async (req, res, next) => {
    let query = { _id: req.query.id, _created_by: req.user._id };

    try {
        const removedPost = await Post.deleteOne(query);
        if (removedPost.deletedCount > 0) {
            res.json({ message: "deleted" });
        } else {
            res.json({ message: "not found" });
        }

    } catch (err) {
        res.json({ message: err });
    }
});

module.exports = router;