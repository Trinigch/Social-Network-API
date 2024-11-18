import {   Schema, Types, Document  } from 'mongoose';

interface IReaction extends Document { 
  reactionId?: Types.ObjectId;
  reactionBody: string;
  username: string
  createdAt: Date;
}

const reactionSchema = new Schema<IReaction>(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp: Date): string =>
        timestamp ? timestamp.toLocaleString() : '', // Validar que `timestamp` exista
      } as any, // Conversión de tipo para evitar errores de compatibilidad
  },  
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

export default reactionSchema ;
