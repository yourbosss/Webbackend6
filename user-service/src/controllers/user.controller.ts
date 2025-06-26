import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import mongoose from 'mongoose';

export const getUserProfile = async (req: Request & { user?: { userId: string } }, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?.userId).select('-password').populate('favoriteCourseIds');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.id);
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const toggleFavorite = async (req: Request<{ courseId: string }> & { user?: { userId: string } }, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const courseId = req.params.courseId;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const index = user.favoriteCourseIds.findIndex(id => id.toString() === courseId);
    if (index === -1) {
      user.favoriteCourseIds.push(courseId as any);
    } else {
      user.favoriteCourseIds.splice(index, 1);
    }

    await user.save();

    res.json({ success: true, favoriteCourseIds: user.favoriteCourseIds });
  } catch (error) {
    next(error);
  }
};

export const getCreatedCourses = async (req: Request & { user?: { userId: string } }, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    res.status(200).json({ message: 'Not implemented: getCreatedCourses should query courses-service' });
  } catch (error) {
    next(error);
  }
};
