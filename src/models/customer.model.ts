import { Schema, model } from 'mongoose';
import IDependent from '../interfaces/dependent.interface';

const CustomerSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
    },

    cpf: String,

    address: {
      cep: String,
      publicPlace: {
        type: String,
        lowercase: true,
      },
      number: String,
      district: {
        type: String,
        lowercase: true,
      },
      city: {
        type: String,
        lowercase: true,
      },
      state: {
        type: String,
        uppercase: true,
      },
    },

    contact: {
      email: {
        type: String,
        lowercase: true,
      },
      phone: String,
    },

    dependents: [
      {
        type: Schema.Types.ObjectId,

        ref: 'dependents',
      },
    ],

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

const CustomerModel = model('customers', CustomerSchema);

export default CustomerModel;
