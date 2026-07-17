/**
 * Response Formatter Utility
 * Parses raw text answers from Gemini or offline database and splits them into clean UI sections:
 * - Summary
 * - Key Points
 * - Prevention Tips
 * - When to Consult a Doctor
 * - Educational Disclaimer
 */

export const responseFormatter = {
  /**
   * Parses the text output from Gemini API into a structured object.
   * Uses markers like [SUMMARY], [KEY_POINTS], [PREVENTION], [CONSULT], [DISCLAIMER]
   * and falls back to markdown header patterns if exact markers are missing.
   * 
   * @param {string} text 
   * @returns {Object} Structured sections
   */
  parse: (text) => {
    if (!text) {
      return {
        summary: "",
        keyPoints: [],
        prevention: [],
        consult: "",
        disclaimer: ""
      };
    }

    // Initialize segments
    let summary = "";
    let keyPoints = [];
    let prevention = [];
    let consult = "";
    let disclaimer = "";

    // Normalize markers for easy regex splitting
    // Support either [TAG] or **Tag** patterns
    const cleanText = text
      .replace(/\[SUMMARY\]|\*\*Summary:\*\*|\*\*Summary\*\*/gi, '|||SUMMARY: ')
      .replace(/\[KEY_POINTS\]|\*\*Key Points:\*\*|\*\*Key Points\*\*|\*\*Key Symptoms:\*\*|\*\*Key Symptoms\*\*/gi, '|||KEY_POINTS: ')
      .replace(/\[PREVENTION\]|\*\*Prevention Tips:\*\*|\*\*Prevention Tips\*\*|\*\*Prevention:\*\*|\*\*Prevention\*\*/gi, '|||PREVENTION: ')
      .replace(/\[CONSULT\]|\*\*When to Consult a Doctor:\*\*|\*\*When to Consult a Doctor\*\*|\*\*When to Consult:\*\*|\*\*When to Consult\*\*/gi, '|||CONSULT: ')
      .replace(/\[DISCLAIMER\]|\*\*Educational Disclaimer:\*\*|\*\*Educational Disclaimer\*\*|\*\*Disclaimer:\*\*|\*\*Disclaimer\*\*/gi, '|||DISCLAIMER: ');

    // Split text by normalized tags
    const segments = cleanText.split('|||');

    segments.forEach(segment => {
      const trimmed = segment.trim();
      if (!trimmed) return;

      if (trimmed.startsWith('SUMMARY')) {
        summary = trimmed.replace(/^SUMMARY[:\s]*/i, '').trim();
      } else if (trimmed.startsWith('KEY_POINTS')) {
        const rawPoints = trimmed.replace(/^KEY_POINTS[:\s]*/i, '').trim();
        keyPoints = parseList(rawPoints);
      } else if (trimmed.startsWith('PREVENTION')) {
        const rawPrev = trimmed.replace(/^PREVENTION[:\s]*/i, '').trim();
        prevention = parseList(rawPrev);
      } else if (trimmed.startsWith('CONSULT')) {
        consult = trimmed.replace(/^CONSULT[:\s]*/i, '').trim();
      } else if (trimmed.startsWith('DISCLAIMER')) {
        disclaimer = trimmed.replace(/^DISCLAIMER[:\s]*/i, '').trim();
      } else {
        // Content before any tag (or un-tagged text) is assigned to summary if empty
        if (!summary) {
          summary = trimmed;
        }
      }
    });

    // Smart Fallback Parser if no explicit sections were parsed
    if (!summary && !consult && keyPoints.length === 0 && prevention.length === 0) {
      // Split by paragraphs to guess
      const paragraphs = text.split(/\n\s*\n/);
      summary = paragraphs[0] || "";
      
      const listItems = [];
      paragraphs.slice(1).forEach(para => {
        const lines = para.split('\n');
        lines.forEach(line => {
          const cleanLine = line.replace(/^[\s-*•\d+.)]+/g, '').trim();
          if (cleanLine) {
            listItems.push(cleanLine);
          }
        });
      });

      if (listItems.length > 4) {
        keyPoints = listItems.slice(0, Math.ceil(listItems.length / 2));
        prevention = listItems.slice(Math.ceil(listItems.length / 2));
      } else {
        keyPoints = listItems;
      }
    }

    return {
      summary,
      keyPoints,
      prevention,
      consult,
      disclaimer: disclaimer || "AI HealthMate provides educational information only. Always consult a doctor for diagnosis or treatment."
    };
  }
};

/**
 * Splits lines by lists indicators (- or * or numbers) and cleans them.
 */
function parseList(rawText) {
  if (!rawText) return [];
  return rawText
    .split('\n')
    .map(line => {
      // Remove starting bullet chars like: *, -, •, numbers like 1., 2)
      return line.replace(/^[\s-*•\d+.)]+/g, '').trim();
    })
    .filter(line => line.length > 0);
}
