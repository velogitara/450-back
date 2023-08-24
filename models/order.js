const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationErrors, handleSchemaStatusModify } = require('../helpers');
const { address } = require('../constants');

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const nameRegEx = /^[а-яА-ЯёЁіІa-zA-Z-`\s]+$/;
const cityRegEx = /^[а-яА-ЯёЁіІїЇ\-`\s]+$/;
const flatNumberRegEx = /^[0-9]{1,9}$/;
const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const idpCertificateNumberRegEx = /^\d{4}-\d{10}$/;

const orderSchema = new Schema(
  {
    maxQuantity: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'ready', 'archive', 'complete'],
    },
    type: {
      type: String,
      enum: ['temp_moved', 'invalid', 'child'],
    },
    persons: [
      {
        name: {
          type: String,
          match: nameRegEx,
          required: [true, 'Будь ласка введіть коректне значення імені'],
        },
        email: {
          type: String,
          match: emailRegEx,
          required: true,
        },
        surname: {
          type: String,
          match: nameRegEx,
          required: [true, 'Будь ласка введіть коректне значення прізвища'],
        },
        patronymic_name: {
          type: String,
          default: '',
        },
        settlement: {
          type: String,
          match: cityRegEx,
          required: [true, 'Будь ласка введіть правильну назву міста'],
        },
        street: {
          type: String,
          match: cityRegEx,
          default: '',
        },
        building: {
          type: String,
          default: '',
        },

        apartment: {
          type: String,
          match: flatNumberRegEx,
          default: '',
        },
        // idpCertificateNumber: {
        //   type: String,
        //   match: idpCertificateNumberRegEx,
        //   default: '',
        // },
        birthCertificateNumber: {
          type: String,
          match: idpCertificateNumberRegEx,
          default: '',
        },
        regionFrom: {
          type: String,
          match: address.areaCollection,
        },

        memberNumber: {
          type: Number,
          default: '',
        },
        phone: {
          type: String,
          required: true,
          match: phoneRegex,
        },
        isActivated: {
          type: Boolean,
          default: false,
        },
        activationLink: {
          type: String,
          default: '',
        },
      },
    ],
    createdDate: {
      type: Date,
      default: new Date(),
    },
    changedDate: {
      type: Date,
      default: '',
    },
    closeDate: {
      type: Date,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

orderSchema.post('save', handleSchemaValidationErrors);
orderSchema.pre('save', handleSchemaStatusModify);

const addSchema = Joi.object({
  maxQuantity: Joi.number().required(),
  status: Joi.string().valid('active', 'ready', 'archive', 'complete'),
  type: Joi.string().valid('temp_moved', 'invalid', 'child'),
});

const addPersonToOrderSchema = Joi.object({
  name: Joi.string().pattern(nameRegEx).required(),
  email: Joi.string().email().required(),
  surname: Joi.string().pattern(nameRegEx).required(),
  patronymic_name: Joi.string(),
  settlement: Joi.string().pattern(cityRegEx).required(),
  street: Joi.string().pattern(cityRegEx).required(),
  building: Joi.string(),
  apartment: Joi.string().pattern(flatNumberRegEx),
  idpCertificateNumber: Joi.string().pattern(idpCertificateNumberRegEx),
  birthCertificateNumber: Joi.string().pattern(idpCertificateNumberRegEx),
  regionFrom: Joi.string().valid(...address.areaCollection),
  memberNumber: Joi.number(),
  phone: Joi.string().pattern(phoneRegex).required(),
});

const orderJoiSchemas = {
  addSchema,
  addPersonToOrderSchema,
};

const Order = model('order', orderSchema);

module.exports = {
  Order,
  orderJoiSchemas,
};
