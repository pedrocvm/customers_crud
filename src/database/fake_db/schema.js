const { Schema, model } = require('mongoose');

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
      select: false,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  { versionKey: false }
);

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
      select: false,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
  },
  { versionKey: false }
);

const CustomerModel = model('customers', CustomerSchema);
const DependentModel = model('dependents', DependentSchema);

module.exports = { CustomerModel, DependentModel };
