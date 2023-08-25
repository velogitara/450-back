const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationErrors, handleSchemaStatusModify } = require('../helpers');
const { address } = require('../constants');

const phoneRegex = /^[+]?(380)[\s][0-9]{2}[\s][0-9]{3}[\s]?[0-9]{2}[\s]?[0-9]{2}[\s]?$/;
const pibRegEx = /^[\sА-Яа-яІіЇїЄєҐґЁё'-]+$/;
const cityRegEx = /^[а-яА-ЯёЁіІїЇ\-`\s]+$/;
const flatNumberRegEx = /^[0-9]{1,9}$/;
const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;

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
    issueDate: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: ['temp_moved', 'invalid', 'child'],
    },
    persons: [
      {
        // id: { type: String, required: true },
        name: {
          type: String,
          match: pibRegEx,
          required: [true, 'Поле може містити тільки кирилицю, пробіл, дефіс та апостроф'],
        },
        email: {
          type: String,
          match: emailRegEx,
          required: true,
        },
        last_name: {
          type: String,
          match: pibRegEx,
          required: [true, 'Поле може містити тільки кирилицю, пробіл, дефіс та апостроф'],
        },
        patronymic_name: {
          type: String,
          match: pibRegEx,
          required: [true, 'Поле може містити тільки кирилицю, пробіл, дефіс та апостроф'],
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
        disabilityCertificateNumber: {
          type: String,
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
        settlementFrom: {
          type: String,
          default: '',
        },
        regionFrom: {
          type: String,
          validate: {
            validator: function (value) {
              return address.areaCollection.includes(value);
            },
            message: 'Invalid region value',
          },
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
  issueDate: Joi.string().required(),
});

const addPersonToOrderSchema = Joi.object({
  name: Joi.string().pattern(pibRegEx).required(),
  email: Joi.string().email().required(),
  last_name: Joi.string().pattern(pibRegEx).required(),
  patronymic_name: Joi.string().pattern(pibRegEx).required(),
  settlement: Joi.string().pattern(cityRegEx).required(),
  street: Joi.string().pattern(cityRegEx).required(),
  building: Joi.string(),
  apartment: Joi.string().pattern(flatNumberRegEx),
  idpCertificateNumber: Joi.string().pattern(idpCertificateNumberRegEx),
  birthCertificateNumber: Joi.string().pattern(idpCertificateNumberRegEx),
  settlementFrom: Joi.string(),
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
