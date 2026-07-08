// Export all articles from modular category files
import dengueArticle from './dengue';
import malariaArticle from './malaria';
import firstaidArticle from './firstaid';

import { 
  diabetesArticle, 
  hypertensionArticle, 
  lifestyleArticle, 
  heatstrokeArticle 
} from './lifestyle_diseases';

import { 
  typhoidArticle, 
  cleanwaterArticle, 
  sanitationArticle, 
  hygieneArticle, 
  foodsafetyArticle 
} from './hygiene_sanitation';

import { 
  vaccinationArticle, 
  womenshealthArticle, 
  childhealthArticle, 
  mentalhealthArticle, 
  covidArticle, 
  tuberculosisArticle, 
  nutritionArticle 
} from './family_health';

export const articles = [
  dengueArticle,
  malariaArticle,
  firstaidArticle,
  diabetesArticle,
  hypertensionArticle,
  lifestyleArticle,
  heatstrokeArticle,
  typhoidArticle,
  cleanwaterArticle,
  sanitationArticle,
  hygieneArticle,
  foodsafetyArticle,
  vaccinationArticle,
  womenshealthArticle,
  childhealthArticle,
  mentalhealthArticle,
  covidArticle,
  tuberculosisArticle,
  nutritionArticle
];

// Grouping by categories for rendering in filters
export const categories = [
  "All",
  "Infectious Diseases",
  "Lifestyle Diseases",
  "Nutrition & Child Care",
  "Water & Hygiene",
  "First Aid",
  "Women's Health",
  "Mental Health"
];

export default articles;
