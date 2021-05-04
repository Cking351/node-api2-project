// implement your posts router here
const e = require("express");
const express = require("express");

const router = express.Router();

const Posts = require("./posts-model.js");

// GET ALL POSTS
router.get("/", async (req, res) => {
	const allPosts = await Posts.find();
	try {
		res.status(200).json(allPosts);
	} catch {
		res
			.status(500)
			.json({ message: "The posts information could not be retrieved" });
	}
});

// GET POST BY ID
router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const result = await Posts.findById(id);

	try {
		res.status(200).json(result);
	} catch {
		res
			.status(500)
			.json({ message: "The post with the specified ID does not exist" });
	}
});

// POST A POST ?????
router.post("/", async (req, res) => {
	const input = req.body;
	if (!input.title || !input.contents) {
		res
			.status(400)
			.json({ message: "Please provide title and contents for the post" });
	} else {
		const result = await Posts.insert(input);
		try {
			const newPost = await Posts.findById(input.id);
			try {
				res.status(201).json(newPost);
			} catch {
				res.status(500).json({
					message: "There was an error while saving the post to the database",
				});
			}
		} catch {
			res.status(500).json({
				message: "There was an error while saving the post to the database",
			});
		}
	}
});

// PUT POST
router.put("/:id", async (req, res) => {
	const id = req.params.id;
	const changes = req.body;
	const confirmation = await Posts.update(id, changes);

	try {
		if (confirmation === 0) {
			res
				.status(400)
				.json({ message: "The post with the specified ID does not exist" });
		} else {
			res.status(200).json(confirmation);
		}
	} catch {
		res
			.status(500)
			.json({ message: "The post information could not be modified" });
	}
});

// DELETE POSTS
router.delete("/:id", (req, res) => {
	const id = req.params.id;
	Posts.remove(id)
		.then((post) => {
			if (!post || post.id == 0) {
				res
					.status(404)
					.json({ message: "The post with the specified ID does not exist" });
			} else {
				res.status(200).json(post);
			}
		})
		.catch((error) =>
			res.status(500).json({ message: "The post could not be removed" })
		);
});

module.exports = router;
