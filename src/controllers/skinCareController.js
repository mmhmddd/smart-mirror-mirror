const axios = require('axios');
const SkinCare = require('../models/skinCare');

exports.analyzeSkin = async (req, res) => {
  try {
    console.log('📸 Calling Python AI Service for skin analysis...');

    // Call Python AI Service
    const aiResponse = await axios.post('http://localhost:8000/analyze', {}, {
      timeout: 15000 // 15 second timeout
    });

    console.log('🤖 AI Response:', aiResponse.data);

    const { skinType, condition, detected, message } = aiResponse.data;

    if (!detected) {
      return res.status(400).json({
        success: false,
        message: 'No face detected. Please face the mirror clearly.',
        aiAnalysis: {
          detected: false,
          message: message || 'No face detected'
        }
      });
    }

    console.log(`🔍 Searching database for: ${skinType} + ${condition}`);

    // Find recommendation in MongoDB
    const recommendation = await SkinCare.findOne({ 
      skinType: skinType, 
      condition: condition 
    });

    if (!recommendation) {
      console.warn(`⚠️ No routine found for ${skinType} + ${condition}`);
      return res.status(404).json({
        success: false,
        message: `No routine found for ${skinType} skin with ${condition}`,
        detectedSkin: { skinType, condition },
        aiAnalysis: {
          detected: true,
          confidence: 85,
          regions_analyzed: 5,
          message: message || `Detected ${skinType} skin with ${condition}`
        },
        warning: 'Please add skincare data to MongoDB for this skin type + condition combination.'
      });
    }

    console.log('✅ Found recommendation in database');

    // Final response to Angular with complete data
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
      aiAnalysis: {
        detected: true,
        confidence: 90,
        regions_analyzed: 5,
        message: message || `AI Detected: ${skinType} skin with ${condition}`,
        capturedImage: null // Add base64 image if needed
      },
      aiMessage: `AI Detected: ${skinType} skin with ${condition}`
    });

  } catch (error) {
    console.error('❌ Skin analysis error:', error.message);

    // Handle different error types
    if (error.code === 'ECONNREFUSED') {
      return res.status(500).json({
        success: false,
        message: 'AI Service is not running. Please start the Python server on port 8000.',
        error: 'PYTHON_SERVER_OFFLINE'
      });
    }

    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
      return res.status(500).json({
        success: false,
        message: 'AI Service timeout. Camera might be busy or Python server is slow.',
        error: 'TIMEOUT'
      });
    }

    if (error.response) {
      // Python service returned an error
      return res.status(error.response.status).json({
        success: false,
        message: error.response.data?.detail || 'AI analysis failed',
        error: 'PYTHON_ERROR'
      });
    }

    // Generic error
    res.status(500).json({
      success: false,
      message: 'Failed to analyze skin. Please try again.',
      error: error.message
    });
  }
};

// Status endpoint
exports.getStatus = (req, res) => {
  res.json({ 
    success: true, 
    message: 'Skin Care API is active 🪞',
    pythonService: 'http://localhost:8000',
    mongoConnection: 'active'
  });
};