// Community Impact & Campaign Baseline Metrics
// Designed to represent educational outcomes for B.Tech Social Internships

export const baselineStats = {
  baselineVisitors: 15420,
  baselineArticlesRead: 9280,
  baselineQueriesAsked: 5310,
  baselineQuizzesCompleted: 1840,
  baselineCertificatesClaimed: 430,
  baselineQuizAverage: 82,
  baselineSatisfaction: 94,
  baselineLearningHours: 320,
  baselinePositiveFeedback: 96
};

export const popularTopics = [
  { id: "dengue", views: 4320, icon: "ShieldAlert" },
  { id: "firstaid", views: 3950, icon: "Activity" },
  { id: "nutrition", views: 3100, icon: "Apple" },
  { id: "cleanwater", views: 2840, icon: "Droplet" },
  { id: "vaccination", views: 2430, icon: "ShieldCheck" }
];

export const feedbackChoices = {
  ageGroups: ["Under 18", "18-25", "26-45", "46+"],
  occupations: ["Student", "Teacher", "Farmer", "NGO Volunteer", "Health Worker", "Other"],
  features: ["AI Assistant", "Health Library", "First Aid Guide", "Knowledge Quiz", "Bilingual Toggle"]
};

export default {
  baselineStats,
  popularTopics,
  feedbackChoices
};
