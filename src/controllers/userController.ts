import { User, Thought } from '../models/index.js';
import { Request, Response } from 'express';


  // Get all users
  export const getUsers = async (_req: Request, res: Response) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      //console.log(users)
      res.json(users);
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  }

  // Get a single user
  export const getSingleUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.userId)
     .populate('thoughts').populate('friends');
    // .select('-__v');//?

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }else {
        return res.json(user);
      }

    } catch (err) {
      return res.status(500).json(err);
    }
  }
// PUT update user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      {_id: req.params.userId},
      {$set: req.body} ,
      {runValidators:true, new: true }
    );
    if (!user){
      return res.status(404).json({ message: 'User not found' });
    } else {
      return res.json(user);
    }
       
    } catch (err) {
      res.status(500).json(err);
      return;
    }
};

  // create a new user
  export const createUser = async (req: Request, res: Response) => {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // Delete a user and associated apps
  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
   // Remove associated thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts} });
      res.json({ message: 'User and thought deleted!' })
      return;
    } catch (err) {
      res.status(500).json(err);
      return;
    }
  }

  //AddFriend
  export const addFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } }, // Evitar duplicados
        { new: true }
      );
      if (!user){
        return res.status(404).json({ message: 'User not found' });
      } else {
        return res.json(user);
      }
         
      } catch (err) {
        res.status(500).json(err);
        return;
      }
  };
// DELETE remove friend

export const removeFriend = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );
    if (!user){
      return res.status(404).json({ message: 'User not found' });
    } else {
      return res.json(user);
    }
       
    } catch (err) {
      res.status(500).json(err);
      return;
    }
};
