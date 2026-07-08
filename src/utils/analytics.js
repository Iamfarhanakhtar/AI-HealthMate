/**
 * Local Analytics Logger & Telemetry Helper
 * Stores anonymous event counts in localStorage to power the Community Impact dashboard in future phases.
 */

const ANALYTICS_KEY = 'ai_healthmate_local_analytics';

const getAnalytics = () => {
  try {
    const data = localStorage.getItem(ANALYTICS_KEY);
    return data ? JSON.parse(data) : {
      chatsStarted: 0,
      questionsAsked: 0,
      suggestedQuestionsClicked: 0,
      responsesGenerated: 0,
      helpfulResponsesCount: 0,
      unhelpfulResponsesCount: 0,
      conversationsCleared: 0,
      topicInteractions: {}
    };
  } catch (e) {
    console.error('Failed to read analytics from localStorage', e);
    return {
      chatsStarted: 0,
      questionsAsked: 0,
      suggestedQuestionsClicked: 0,
      responsesGenerated: 0,
      helpfulResponsesCount: 0,
      unhelpfulResponsesCount: 0,
      conversationsCleared: 0,
      topicInteractions: {}
    };
  }
};

const saveAnalytics = (data) => {
  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to write analytics to localStorage', e);
  }
};

export const analytics = {
  logEvent: (eventName, payload = {}) => {
    // Log to console in development
    console.log(`[Local Analytics] Event: ${eventName}`, payload);

    const data = getAnalytics();

    switch (eventName) {
      case 'Chat Started':
        data.chatsStarted += 1;
        break;
      case 'Question Asked':
        data.questionsAsked += 1;
        if (payload.topic) {
          data.topicInteractions[payload.topic] = (data.topicInteractions[payload.topic] || 0) + 1;
        }
        break;
      case 'Suggested Question Clicked':
        data.suggestedQuestionsClicked += 1;
        data.questionsAsked += 1;
        if (payload.topic) {
          data.topicInteractions[payload.topic] = (data.topicInteractions[payload.topic] || 0) + 1;
        }
        break;
      case 'Response Generated':
        data.responsesGenerated += 1;
        break;
      case 'Helpful Response':
        data.helpfulResponsesCount += 1;
        break;
      case 'Unhelpful Response':
        data.unhelpfulResponsesCount += 1;
        break;
      case 'Conversation Cleared':
        data.conversationsCleared += 1;
        break;
      default:
        break;
    }

    saveAnalytics(data);
  },

  getStats: () => {
    return getAnalytics();
  }
};
