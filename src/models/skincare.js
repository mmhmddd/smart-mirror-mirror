const mongoose = require('mongoose');

const skinCareSchema = new mongoose.Schema({
  skinType: {
    type: String,
    required: true,
    enum: ['Oily', 'Dry', 'Combination', 'Normal']
  },
  condition: {
    type: String,
    required: true,
    enum: ['Clear', 'Mild Acne', 'Moderate Acne', 'Severe Acne', 'Dryness', 'Redness', 'Aging']
  },
  morningRoutine: {
    type: [String],
    default: []
  },
  nightRoutine: {
    type: [String],
    default: []
  },
  recommendedIngredients: {
    type: [String],
    default: []
  },
  avoidIngredients: {
    type: [String],
    default: []
  },
  lifestyleTips: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

// Index for fast query by skinType + condition
skinCareSchema.index({ skinType: 1, condition: 1 });

module.exports = mongoose.model('SkinCare', skinCareSchema);