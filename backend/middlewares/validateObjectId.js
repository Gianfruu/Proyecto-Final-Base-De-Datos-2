import mongoose from 'mongoose';
import { createError } from '../utils/createError.js';

export const validateObjectId = (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, 'El ID es inválido'));
  }

  // "else": El ID es válido, sigamos
  next(); 
};
