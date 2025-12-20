// src/seeds/seedSkinCare.js

const mongoose = require('mongoose');

const connectDB = require('../config/db');
const SkinCare = require('../models/skinCare');

// Connect to MongoDB
connectDB();

const skinCareData = [
  // 1. Oily + Clear
  {
    skinType: "Oily",
    condition: "Clear",
    morningRoutine: [
      "Gentle foaming cleanser",
      "Alcohol-free toner",
      "Lightweight oil-free moisturizer",
      "Matte sunscreen SPF 30+"
    ],
    nightRoutine: [
      "Double cleanse (oil cleanser + foaming)",
      "Hydrating toner",
      "Niacinamide serum",
      "Light gel moisturizer"
    ],
    recommendedIngredients: ["Niacinamide", "Salicylic Acid (low %)", "Zinc", "Green Tea", "Hyaluronic Acid (light)"],
    avoidIngredients: ["Heavy oils", "Comedogenic products", "Alcohol-based toners"],
    lifestyleTips: ["Blot oil during day", "Use mattifying products", "Change pillowcase often", "Stay hydrated"]
  },

  // 2. Oily + Mild Acne
  {
    skinType: "Oily",
    condition: "Mild Acne",
    morningRoutine: [
      "Cleanser with salicylic acid 0.5-2%",
      "Alcohol-free toner",
      "Lightweight oil-free moisturizer",
      "Matte sunscreen SPF 30+"
    ],
    nightRoutine: [
      "Double cleanse",
      "Salicylic acid cleanser",
      "Spot treatment (benzoyl peroxide 2.5% or niacinamide)",
      "Lightweight moisturizer"
    ],
    recommendedIngredients: ["Salicylic Acid", "Niacinamide", "Benzoyl Peroxide (low strength)", "Tea Tree Oil", "Zinc"],
    avoidIngredients: ["Heavy oils", "Comedogenic ingredients", "Harsh scrubs"],
    lifestyleTips: ["Wash twice daily only", "Don't pick pimples", "Use non-comedogenic makeup", "Consult dermatologist if persists"]
  },

  // 3. Oily + Moderate Acne
  {
    skinType: "Oily",
    condition: "Moderate Acne",
    morningRoutine: [
      "Salicylic acid cleanser",
      "Niacinamide toner",
      "Oil-free moisturizer",
      "Sunscreen SPF 30+"
    ],
    nightRoutine: [
      "Double cleanse",
      "Benzoyl peroxide treatment",
      "Niacinamide serum",
      "Light moisturizer"
    ],
    recommendedIngredients: ["Benzoyl Peroxide", "Salicylic Acid", "Niacinamide", "Adapalene (if prescribed)"],
    avoidIngredients: ["Occlusive products", "Dairy (if trigger)", "Sugary foods"],
    lifestyleTips: ["Consult dermatologist", "Be patient with treatment", "Avoid over-washing"]
  },

  // 4. Oily + Severe Acne
  {
    skinType: "Oily",
    condition: "Severe Acne",
    morningRoutine: [
      "Gentle cleanser (medicated if prescribed)",
      "Light treatment lotion",
      "Oil-free moisturizer",
      "Sunscreen"
    ],
    nightRoutine: [
      "Prescription treatment as directed",
      "Light moisturizer"
    ],
    recommendedIngredients: ["Prescription retinoids", "Antibiotics (if prescribed)", "Niacinamide"],
    avoidIngredients: ["Harsh products", "Self-treatment"],
    lifestyleTips: ["See a dermatologist immediately", "Follow prescription routine", "Avoid picking or squeezing"]
  },

  // 5. Dry + Clear
  {
    skinType: "Dry",
    condition: "Clear",
    morningRoutine: [
      "Gentle creamy cleanser",
      "Hydrating toner",
      "Rich moisturizer with ceramides",
      "Cream sunscreen SPF 30+"
    ],
    nightRoutine: [
      "Cleansing balm",
      "Hydrating serum",
      "Rich night cream",
      "Optional facial oil"
    ],
    recommendedIngredients: ["Hyaluronic Acid", "Ceramides", "Glycerin", "Squalane", "Panthenol"],
    avoidIngredients: ["Foaming cleansers", "Alcohol toners", "Strong exfoliants"],
    lifestyleTips: ["Use lukewarm water", "Pat dry gently", "Humidifier in dry weather", "Drink water"]
  },

  // 6. Dry + Mild Acne
  {
    skinType: "Dry",
    condition: "Mild Acne",
    morningRoutine: [
      "Gentle hydrating cleanser",
      "Soothing toner",
      "Light treatment (benzoyl peroxide low %)",
      "Rich moisturizer",
      "Sunscreen"
    ],
    nightRoutine: [
      "Cleansing balm",
      "Spot treatment",
      "Hydrating serum",
      "Rich cream"
    ],
    recommendedIngredients: ["Benzoyl Peroxide (low %)", "Niacinamide", "Ceramides", "Hyaluronic Acid"],
    avoidIngredients: ["Drying alcohols", "Harsh acne products"],
    lifestyleTips: ["Balance treatment with hydration", "Consult dermatologist for dry acne"]
  },

  // 7. Dry + Moderate Acne
  {
    skinType: "Dry",
    condition: "Moderate Acne",
    morningRoutine: [
      "Very gentle cleanser",
      "Calming toner",
      "Prescription treatment",
      "Barrier repair moisturizer",
      "Sunscreen"
    ],
    nightRoutine: [
      "Cleansing balm",
      "Treatment as prescribed",
      "Rich occlusive cream"
    ],
    recommendedIngredients: ["Ceramides", "Niacinamide", "Prescription meds"],
    avoidIngredients: ["Drying treatments alone"],
    lifestyleTips: ["See dermatologist", "Focus on barrier repair"]
  },

  // 8. Dry + Severe Acne
  {
    skinType: "Dry",
    condition: "Severe Acne",
    morningRoutine: [
      "Gentle cleanser",
      "Prescription routine",
      "Barrier cream",
      "Sunscreen"
    ],
    nightRoutine: [
      "Cleansing balm",
      "Prescription treatment",
      "Heavy occlusive cream"
    ],
    recommendedIngredients: ["Prescription only"],
    avoidIngredients: ["Over-the-counter harsh products"],
    lifestyleTips: ["Medical supervision required", "Avoid self-treatment"]
  },

  // 9. Combination + Clear
  {
    skinType: "Combination",
    condition: "Clear",
    morningRoutine: [
      "Gentle gel cleanser",
      "Balancing toner",
      "Light moisturizer (gel-cream)",
      "Oil-free sunscreen"
    ],
    nightRoutine: [
      "Double cleanse if needed",
      "Niacinamide serum",
      "Moisturizer (heavier on dry areas)"
    ],
    recommendedIngredients: ["Niacinamide", "Hyaluronic Acid", "Centella Asiatica"],
    avoidIngredients: ["Heavy creams on T-zone"],
    lifestyleTips: ["Treat zones differently", "Blot oil during day"]
  },

  // 10. Combination + Mild Acne
  {
    skinType: "Combination",
    condition: "Mild Acne",
    morningRoutine: [
      "Gel cleanser",
      "Salicylic toner (T-zone)",
      "Light moisturizer",
      "Sunscreen"
    ],
    nightRoutine: [
      "Double cleanse",
      "Salicylic treatment on T-zone",
      "Niacinamide full face",
      "Moisturizer"
    ],
    recommendedIngredients: ["Salicylic Acid (T-zone)", "Niacinamide", "Hyaluronic Acid"],
    avoidIngredients: ["Heavy products on oily areas"],
    lifestyleTips: ["Zone-specific treatment", "Clay mask on T-zone weekly"]
  },

  // 11. Combination + Moderate Acne
  {
    skinType: "Combination",
    condition: "Moderate Acne",
    morningRoutine: [
      "Medicated cleanser (T-zone)",
      "Balancing toner",
      "Light treatment",
      "Moisturizer",
      "Sunscreen"
    ],
    nightRoutine: [
      "Double cleanse",
      "Targeted acne treatment",
      "Niacinamide",
      "Moisturizer"
    ],
    recommendedIngredients: ["Benzoyl Peroxide (T-zone)", "Niacinamide", "Salicylic Acid"],
    avoidIngredients: ["Uniform heavy products"],
    lifestyleTips: ["Consult dermatologist for combination acne"]
  },

  // 12. Combination + Severe Acne
  {
    skinType: "Combination",
    condition: "Severe Acne",
    morningRoutine: [
      "Gentle cleanser",
      "Prescription routine",
      "Light moisturizer",
      "Sunscreen"
    ],
    nightRoutine: [
      "Cleansing balm",
      "Prescription treatment",
      "Barrier repair"
    ],
    recommendedIngredients: ["Prescription medications"],
    avoidIngredients: ["Self-treatment"],
    lifestyleTips: ["See dermatologist urgently"]
  },

  // 13. Normal + Clear
  {
    skinType: "Normal",
    condition: "Clear",
    morningRoutine: [
      "Gentle cleanser",
      "Hydrating toner",
      "Balanced moisturizer",
      "Sunscreen SPF 30+"
    ],
    nightRoutine: [
      "Gentle cleanser",
      "Hydrating serum",
      "Moisturizer",
      "Weekly gentle exfoliation"
    ],
    recommendedIngredients: ["Vitamin C", "Niacinamide", "Hyaluronic Acid", "Ceramides"],
    avoidIngredients: ["Overly aggressive products"],
    lifestyleTips: ["Maintain consistency", "Daily sun protection", "Healthy lifestyle supports skin"]
  },

  // 14. Normal + Mild Acne
  {
    skinType: "Normal",
    condition: "Mild Acne",
    morningRoutine: [
      "Gentle cleanser",
      "Light treatment toner",
      "Moisturizer",
      "Sunscreen"
    ],
    nightRoutine: [
      "Cleanser",
      "Spot treatment",
      "Niacinamide",
      "Moisturizer"
    ],
    recommendedIngredients: ["Salicylic Acid", "Niacinamide", "Benzoyl Peroxide (spot)"],
    avoidIngredients: ["Harsh drying products"],
    lifestyleTips: ["Targeted treatment", "Don't over-treat normal areas"]
  },

  // 15. Normal + Moderate Acne
  {
    skinType: "Normal",
    condition: "Moderate Acne",
    morningRoutine: [
      "Medicated cleanser",
      "Treatment lotion",
      "Moisturizer",
      "Sunscreen"
    ],
    nightRoutine: [
      "Double cleanse",
      "Acne treatment",
      "Moisturizer"
    ],
    recommendedIngredients: ["Benzoyl Peroxide", "Salicylic Acid", "Niacinamide"],
    avoidIngredients: ["Comedogenic products"],
    lifestyleTips: ["Consult dermatologist"]
  },

  // 16. Normal + Severe Acne
  {
    skinType: "Normal",
    condition: "Severe Acne",
    morningRoutine: [
      "Gentle cleanser",
      "Prescription routine",
      "Moisturizer",
      "Sunscreen"
    ],
    nightRoutine: [
      "Cleansing balm",
      "Prescription treatment",
      "Moisturizer"
    ],
    recommendedIngredients: ["Prescription only"],
    avoidIngredients: ["Over-the-counter alone"],
    lifestyleTips: ["Medical treatment required"]
  }
];

const seedDB = async () => {
  try {
    // Remove all existing documents
    await SkinCare.deleteMany({});
    console.log('🗑️  Previous skin care data removed');

    // Insert new data
    await SkinCare.insertMany(skinCareData);
    console.log('✅ Skin care recommendations seeded successfully!');

    // Exit process
    process.exit(0);
  } catch (err) {
    console.error('❌ Error during seeding:', err.message);
    process.exit(1);
  }
};

// Run the seeding function
seedDB();