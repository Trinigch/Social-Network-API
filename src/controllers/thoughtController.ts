import { Request, Response } from 'express';
import { Thought, User } from './../models/index.js';

// Get all thoughts
export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a single thought
export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    } else {
      return res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// Create a new thought
export const createThought = async (req: Request, res: Response) => {
  try {
    const { thoughtText, username, userId } = req.body;

    const newThought = await Thought.create({ thoughtText, username });
    // Add the thought to the user's thoughts array
    await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    res.json(newThought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update a thought
export const updateThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      ...req.body,
      { new: true }
    );
    if (!thought){
      return res.status(404).json({ message: 'No thought with that ID' });
    } else {
      return res.json(thought);
    }
       
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  };
/////

// Delete a thought
export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!thought){
      return res.status(404).json({ message: 'No thought with that ID' });
    } else {
      return res.json(thought);
    }
       
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  };
///

// Add a reaction to a thought
export const addReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    } else {
      return res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

// Remove a reaction from a thought
export const removeReaction = async (req: Request, res: Response) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.body.reactionId } } },
      { new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with that ID' });
    } else {
      return res.json(thought);
    }
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};