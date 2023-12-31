const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleSchemaValidationErrors } = require('../helpers');
const { address } = require('../constants');

const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
const nameRegEx = /^[а-яА-ЯёЁіІa-zA-Z-`\s]+$/;
const passportSeriesRegex = /^([А-ЯІ]{2})$/;
const passportNumberRegex = /^[0-9]{6}$/;
const idCardRegex = /^[0-9]{9}$/;
const cityRegEx = /^[а-яА-ЯёЁіІїЇ\-`\s]+$/;
const flatNumberRegEx = /^[0-9]{1,9}$/;
const identificationNumberRegEx = /^[0-9]{12}$/;
const idpCertificateNumberRegEx = /^\d{4}-\d{10}$/;
const documentType = ['idCard', 'passport'];
// const emailRegex = /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      match: nameRegEx,
      required: [true, 'Будь ласка введіть коректне значення імені'],
    },
    surname: {
      type: String,
      match: nameRegEx,
      required: [true, 'Будь ласка введіть коректне значення прізвища'],
    },
    patronymic: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      match: cityRegEx,
      required: [true, 'Будь ласка введіть правильну назву міста'],
    },
    street: {
      type: String,
      match: cityRegEx,
      default: '',
    },
    houseNumber: {
      type: String,
      default: '',
    },

    flatNumber: {
      type: String,
      match: flatNumberRegEx,
      default: '',
    },
    documentType: {
      type: String,
      require: true,
      enum: documentType,
    },
    passportSeries: {
      type: String,
      match: passportSeriesRegex,
      default: '',
    },
    passportNumber: {
      type: String,
      match: passportNumberRegex,
      default: '',
    },
    idCard: {
      type: String,
      match: idCardRegex,
      default: '',
    },
    disabilityCertificateNumber: {
      type: String,
      default: '',
    },
    identificationNumber: {
      type: String,
      match: identificationNumberRegEx,
      require: true,
    },
    idpCertificateNumber: {
      type: String,
      match: idpCertificateNumberRegEx,
      default: '',
    },
    movementArea: {
      type: String,
      match: address.areaCollection,
    },
    movementCity: {
      type: String,
      default: '',
    },
    numberOfFamilyMembers: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      required: true,
      match: phoneRegex,
      unique: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    // favorite: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleSchemaValidationErrors);

const addSchema = Joi.object({
  name: Joi.string().pattern(nameRegEx).required(),
  surname: Joi.string().pattern(nameRegEx).required(),
  patronymic: Joi.string(),
  city: Joi.string().pattern(cityRegEx).required(),
  street: Joi.string().pattern(cityRegEx).required(),
  houseNumber: Joi.string(),
  flatNumber: Joi.string().pattern(flatNumberRegEx),
  documentType: Joi.string().valid(...documentType),
  passportSeries: Joi.string().pattern(passportSeriesRegex),
  passportNumber: Joi.string().pattern(passportNumberRegex),
  idCard: Joi.string().pattern(idCardRegex),
  disabilityCertificateNumber: Joi.string(),
  identificationNumber: Joi.string().pattern(identificationNumberRegEx).required(),
  idpCertificateNumber: Joi.string().pattern(idpCertificateNumberRegEx),
  movementArea: Joi.string().valid(...address.areaCollection),
  movementCity: Joi.string(),
  numberOfFamilyMembers: Joi.number(),
  phone: Joi.string().pattern(phoneRegex).required(),

  // favorite: Joi.boolean(),
  // colum: Joi.string()
  //   .valid(...collections)
  //   .required(),
});
const updateFavorite = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactSchemas = {
  addSchema,
  updateFavorite,
};

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  contactSchemas,
};
