const axios = require('axios');
const SkinCare = require('../models/skinCare');

exports.analyzeSkin = async (req, res) => {
  try {
    // Call Python AI Service
    const aiResponse = await axios.post('http://localhost:8000/analyze');

    const { skinType, condition, detected } = aiResponse.data;

    if (!detected) {
      return res.status(400).json({
        success: false,
        message: 'No face detected. Please face the mirror clearly.'
      });
    }

    // Find recommendation in MongoDB
    const recommendation = await SkinCare.findOne({ skinType, condition });

    if (!recommendation) {
      return res.status(404).json({
        success: false,
        message: `No routine found for ${skinType} skin with ${condition}`,
        detectedSkin: { skinType, condition }
      });
    }

    // Final response to Angular
    res.json({
      success: true,
      disclaimer: 'These are general skincare suggestions. Always consult a dermatologist for personalized advice.',
      data: {
        skinType: recommendation.skinType,
        condition: recommendation.condition,
        morningRoutine: recommendation.morningRoutine,
        nightRoutine: recommendation.nightRoutine,
        recommendedIngredients: recommendation.recommendedIngredients,
        avoidIngredients: recommendation.avoidIngredients,
        lifestyleTips: recommendation.lifestyleTips
      },
      aiMessage: `AI Detected: ${skinType} skin with ${condition}`
    });

  } catch (error) {
    console.error('Skin analysis error:', error.message);

    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        success: false,
        message: 'AI Service is not running. Please start the Python server on port 8000.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to analyze skin. Please try again.'
    });
  }
};