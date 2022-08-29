const mongoose = require('mongoose');

const genders = ['Masc', 'Fem'];

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 128,
    index: true,
    trim: true,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  cpf: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 11,
  },
  gender: {
    type: String,
    required: false,
    enum: genders,
  },
  birthDate: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Patient = mongoose.model('Patient', patientSchema);

// patientSchema.method({
//   transform() {
//     const transformed = {};
//     const fields = ['id', 'name', 'email', 'cpf', 'gender', 'birthDate'];

//     fields.forEach((field) => {
//       transformed[field] = this[field];
//     });

//     return transformed;
//   },
// });

// patientSchema.pre('save', async function save(next) {
//   try {
//     if (!this.created) this.created = new Patient();
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

module.exports = Patient;
