const { Thought, User } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
          const thoughts = await Thought.find();
          res.json(thoughts);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async getThoughtById(req, res) {
        try {
          const thought = await Thought.findById(req.params.thoughtId);
          if (!thought) {
            return res.status(404).json({ message: 'No thought found' });
          }
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async createThought(req, res) {
        try {
          const thought = await Thought.create(req.body);
          await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { new: true }
          );
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      
      async updateThought(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true }
          );
          if (!thought) {
            return res.status(404).json({ message: 'No thought found' });
          }
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      
      async deleteThought(req, res) {
        try {
          const thought = await Thought.findByIdAndRemove(req.params.thoughtId);
          if (!thought) {
            return res.status(404).json({ message: 'No thought found' });
          }
          await User.findOneAndUpdate(
            { username: thought.username },
            { $pull: { thoughts: req.params.thoughtId } }
          );
          res.json({ message: 'Thought deleted!' });
        } catch (err) {
          res.status(500).json(err);
        }
      },

      async addReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true }
          );
          if (!thought) {
            return res.status(404).json({ message: 'No thought found' });
          }
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      
      async removeReaction(req, res) {
        try {
          const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
          );
          if (!thought) {
            return res.status(404).json({ message: 'No thought with this ID!' });
          }
          res.json(thought);
        } catch (err) {
          res.status(500).json(err);
        }
      },
    };