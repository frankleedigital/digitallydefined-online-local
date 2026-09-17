// src/features/quiz/lib/renderRoadmap.js — transforms AI roadmap JSON into UI shape

export function renderRoadmap(roadmapJson = {}) {
  const {
    superpower_summary = "",
    market_analysis = {},
    recommended_digital_assets = [],
    content_format_recommendations = {},
    personalized_roadmap = [],
    next_best_action = {}
  } = roadmapJson;

  return {
    header: superpower_summary || "",
    trendScore: market_analysis?.trend_score || 0,
    competitionScore: market_analysis?.competition_score || 0,
    demandScore: market_analysis?.demand_score || 0,
    opportunities: market_analysis?.niche_opportunities || [],
    riskFactors: market_analysis?.risk_factors || [],
    validationSteps: market_analysis?.validation_steps || [],
    assets: recommended_digital_assets.map(asset => ({
      assetType: asset.asset_type || "",
      whyItFits: asset.why_it_fits || "",
      difficulty: asset.difficulty || "",
      estimatedTime: asset.estimated_time || "",
      monetizationModel: asset.monetization_model || "",
      requiredSkills: asset.required_skills || [],
      starterPrompts: asset.starter_prompts || []
    })),
    contentFormats: {
      primary: content_format_recommendations?.primary_format || "",
      secondary: content_format_recommendations?.secondary_formats || [],
      automation: content_format_recommendations?.automation_opportunities || [],
      distribution: content_format_recommendations?.distribution_channels || []
    },
    steps: personalized_roadmap.map(step => ({
      step: step.step || "",
      description: step.description || "",
      toolsNeeded: step.tools_needed || [],
      estimatedTime: step.estimated_time || "",
      successMetric: step.success_metric || "",
      dependencies: step.dependencies || []
    })),
    nextAction: {
      action: next_best_action?.action || "",
      reason: next_best_action?.reason || "",
      expectedOutcome: next_best_action?.expected_outcome || "",
      timeRequired: next_best_action?.time_required || ""
    }
  };
}
