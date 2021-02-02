import { Schema, model } from 'mongoose';

const DependentSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
    },
    cpf: String,
    age: Number,
    type: {
      type: String,
      lowercase: true,
    },
    maintainer: {
      type: Schema.Types.ObjectId,
      ref: 'customers',
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    },

    updatedAt: {
      type: Date,
      default: Date.now,
      select: false
    },
  },
  { versionKey: false }
);

const DependentModel = model('dependents', DependentSchema);

export default DependentModel;
