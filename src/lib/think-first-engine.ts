import { ChatMessage, ProgressiveHint, Flashcard, QuizQuestion } from './types';

export interface ConceptDomain {
  key: string;
  title: string;
  topic: string;
  initialQuestionPrompt: string;
  predictionQuestion: string;
  predictionOptions: string[];
  visualType: 'prism-simulation' | 'shadow-simulation' | 'fraction-pizza' | 'practical-activity';
  scientificFact: string;
  realWorldConnection: string;
  practicalHomeActivity: {
    title: string;
    materials: string[];
    steps: string[];
    safetyTip: string;
  };
  misconceptionHandlers: {
    pattern: string;
    response: string;
  }[];
  hints: ProgressiveHint[];
  flashcards: Flashcard[];
  quiz: QuizQuestion[];
}

export const CONCEPT_CATALOG: Record<string, ConceptDomain> = {
  shadows: {
    key: 'shadows',
    title: 'Shadows & Light Travel',
    topic: 'Light, Obstacles & Geometry',
    initialQuestionPrompt: 'Why does a shadow change size when something moves?',
    predictionQuestion: 'What do you think will happen to the shadow if we move the light source closer to the object?',
    predictionOptions: [
      'The shadow will get bigger on the wall',
      'The shadow will shrink and get smaller',
      'The shadow will stay the exact same size'
    ],
    visualType: 'shadow-simulation',
    scientificFact: 'Light travels in straight rays. When an opaque object blocks light, it creates a shadow. When the light source moves closer to the object, the object blocks a wider angle of light rays, casting a larger shadow on the surface behind it.',
    realWorldConnection: 'Think about walking past a streetlight at night. When you are far away from the pole, your shadow stretches long ahead of you. As you walk right underneath the light, your shadow pools small at your feet!',
    practicalHomeActivity: {
      title: 'The Living Room Shadow Puppet Show',
      materials: ['A small flashlight or phone torch', 'A small toy or your hands', 'A blank white wall or card'],
      steps: [
        'Dim the room lights so the wall is dark.',
        'Hold the flashlight 2 feet from the wall and place your hand in the beam.',
        'Slowly bring the flashlight closer to your hand without moving your hand.',
        'Watch the shadow grow giant on the wall!'
      ],
      safetyTip: 'Never shine flashlights directly into anyone\'s eyes.'
    },
    misconceptionHandlers: [
      {
        pattern: 'object gets bigger',
        response: 'Interesting idea! Let\'s test that. Notice that the toy stays the exact same size on the table. Move the light closer—does the shadow grow because the object grew, or because the light beam spreads out wider around it?'
      },
      {
        pattern: 'shadow shrinks',
        response: 'That\'s a great hypothesis to check! Let\'s slide the light closer to the toy right now and look at the wall. Notice how the shadow spreads outward!'
      }
    ],
    hints: [
      {
        level: 1,
        type: 'gentle_prompt',
        title: 'Notice the Light Rays',
        content: 'Look at the straight lines coming out from the flashlight. Where do they hit the toy?'
      },
      {
        level: 2,
        type: 'observation',
        title: 'Check the Spread Angle',
        content: 'When the flashlight is close to the toy, does the toy block a tiny slice of light, or a huge cone of light?'
      },
      {
        level: 3,
        type: 'concept',
        title: 'Straight Line Geometry',
        content: 'Light travels in straight lines! The closer the light is to an object, the wider the cone of light that gets blocked from reaching the wall.'
      },
      {
        level: 4,
        type: 'similar_example',
        title: 'The Movie Projector',
        content: 'At a movie theater, a tiny film frame in front of a bright bulb makes a giant picture on the big screen across the room!'
      },
      {
        level: 5,
        type: 'full_explanation',
        title: 'Complete Understanding: How Shadows Change',
        content: 'A shadow forms because the object stops light from passing through. Because light spreads outwards in straight lines from the bulb, placing the light close to the object makes the object block a much wider angle of rays. Those blocked rays leave a huge dark area on the wall behind!'
      }
    ],
    flashcards: [
      {
        id: 'sh-fc-1',
        conceptKey: 'shadows',
        frontQuestion: 'What causes a shadow to appear on a wall?',
        backExplanation: 'An opaque object blocks light rays traveling in straight lines, leaving an unlit silhouette behind it.',
        reviewCount: 0
      },
      {
        id: 'sh-fc-2',
        conceptKey: 'shadows',
        frontQuestion: 'What happens to a shadow when the light moves CLOSER to the object?',
        backExplanation: 'The shadow becomes BIGGER because the object blocks a wider cone of spreading light rays.',
        reviewCount: 0
      },
      {
        id: 'sh-fc-3',
        conceptKey: 'shadows',
        frontQuestion: 'Does an object have to change size for its shadow to change size?',
        backExplanation: 'No! The object stays the same size. Only the distance between light, object, and wall changes the shadow size.',
        reviewCount: 0
      }
    ],
    quiz: [
      {
        id: 'sh-q-1',
        conceptKey: 'shadows',
        question: 'What is most likely to happen if the light source moves closer to an object while the screen and object stay in the same arrangement?',
        options: [
          {
            id: 'opt-a',
            text: 'The shadow gets noticeably larger on the screen.',
            isCorrect: true,
            reasoningExplanation: 'Correct! Moving the light closer makes the object block a wider cone of rays, casting a larger shadow.'
          },
          {
            id: 'opt-b',
            text: 'The shadow disappears completely.',
            isCorrect: false,
            reasoningExplanation: 'The shadow still exists as long as light is shining and an opaque object is blocking it.'
          },
          {
            id: 'opt-c',
            text: 'The shadow becomes tiny and sharp.',
            isCorrect: false,
            reasoningExplanation: 'Moving light farther away makes the shadow smaller, but moving it closer makes it expand.'
          }
        ],
        hint: 'Think about holding your hands close to a flashlight beam versus far away.'
      },
      {
        id: 'sh-q-2',
        conceptKey: 'shadows',
        question: 'Why does light create a sharp shadow instead of bending smoothly around the object like water?',
        options: [
          {
            id: 'opt-2a',
            text: 'Light travels in straight lines (rays) in everyday situations.',
            isCorrect: true,
            reasoningExplanation: 'Spot on! Light travels in straight paths, so it cannot curve around corners like a liquid.'
          },
          {
            id: 'opt-2b',
            text: 'Light is heavy and falls to the floor.',
            isCorrect: false,
            reasoningExplanation: 'Light has no mass in the everyday sense and travels at the speed of light.'
          }
        ],
        hint: 'Notice the straight beams in our simulation!'
      }
    ]
  },

  prisms: {
    key: 'prisms',
    title: 'Prisms, Light & The Rainbow',
    topic: 'Refraction, Wavelengths & Colors',
    initialQuestionPrompt: 'How does a clear glass prism create a rainbow from white sunlight?',
    predictionQuestion: 'What do you think white sunlight is really made of before it touches the glass?',
    predictionOptions: [
      'White light is already a mixture of all the colors together',
      'The glass colors the light with secret dyes inside the prism',
      'White light only has red and blue in it'
    ],
    visualType: 'prism-simulation',
    scientificFact: 'White light is actually a blend of all the colors of the visible spectrum. Each color has a different wavelength and bends (refracts) at a slightly different angle when entering glass. Red bends the least, while violet bends the most, spreading the colors into a rainbow!',
    realWorldConnection: 'Nature does this after rainstorms! Every tiny spherical raindrop acting like a miniature prism, bending and reflecting sunlight into a rainbow arch across the sky.',
    practicalHomeActivity: {
      title: 'Make a Living-Room Rainbow with Water',
      materials: ['A clear drinking glass filled with water', 'A flashlight or sunny window', 'A piece of white paper'],
      steps: [
        'Place the paper on the floor or table in front of the window.',
        'Hold the glass of water just above the paper so sunlight passes through.',
        'Tilt the glass slightly until you see bright color bands on the white sheet!'
      ],
      safetyTip: 'Handle glass carefully with adult guidance.'
    },
    misconceptionHandlers: [
      {
        pattern: 'glass has dye',
        response: 'That\'s a common mystery! It looks like the glass might have color inside, but look closely: the prism is completely clear! What if the colors were hiding inside the white light all along?'
      }
    ],
    hints: [
      {
        level: 1,
        type: 'gentle_prompt',
        title: 'Look at the Point of Entry',
        content: 'Look at where the single white beam enters the triangular glass. What happens to its path?'
      },
      {
        level: 2,
        type: 'observation',
        title: 'Compare Red vs Violet',
        content: 'Notice which color bends just a little bit, and which color bends the sharpest angle.'
      },
      {
        level: 3,
        type: 'concept',
        title: 'Light Slows Down in Glass',
        content: 'Light travels slightly slower in glass than in air. That change of speed bends the beam, and each color bends by a different amount!'
      },
      {
        level: 4,
        type: 'similar_example',
        title: 'The Cart in the Sand',
        content: 'Imagine a toy wagon rolling from smooth pavement onto thick sand. As one wheel hits the sand first and slows down, the wagon swerves! Light waves do the same thing.'
      },
      {
        level: 5,
        type: 'full_explanation',
        title: 'Complete Understanding: Dispersion of Light',
        content: 'White sunlight contains all the colors of the rainbow combined together. Because each color vibrates at a different wavelength, each color slows down and bends at a slightly different angle when hitting glass. Red light bends the least, and violet bends the most, spreading the colors out into a gorgeous spectrum!'
      }
    ],
    flashcards: [
      {
        id: 'pr-fc-1',
        conceptKey: 'prisms',
        frontQuestion: 'Is white sunlight just one single pure color?',
        backExplanation: 'No! White light is a mixture of all the visible colors (Red, Orange, Yellow, Green, Blue, Indigo, Violet) combined.',
        reviewCount: 0
      },
      {
        id: 'pr-fc-2',
        conceptKey: 'prisms',
        frontQuestion: 'What is refraction?',
        backExplanation: 'Refraction is the bending of light as it passes from one material into another (like from air into glass or water) because its speed changes.',
        reviewCount: 0
      },
      {
        id: 'pr-fc-3',
        conceptKey: 'prisms',
        frontQuestion: 'Which color of light bends the MOST inside glass?',
        backExplanation: 'Violet light bends the most because it has the shortest wavelength, while red bends the least.',
        reviewCount: 0
      }
    ],
    quiz: [
      {
        id: 'pr-q-1',
        conceptKey: 'prisms',
        question: 'When a beam of white sunlight passes through a triangular glass prism, why do the colors separate?',
        options: [
          {
            id: 'opt-pr-1a',
            text: 'Different colors have different wavelengths and bend at different angles.',
            isCorrect: true,
            reasoningExplanation: 'Brilliant deduction! Each color slows and refracts at its own angle, separating the white beam.'
          },
          {
            id: 'opt-pr-1b',
            text: 'The prism paints the light using glass chemicals.',
            isCorrect: false,
            reasoningExplanation: 'The glass is completely clear—all the colors were already present inside the white light!'
          }
        ],
        hint: 'Remember that red and violet emerge at different places.'
      }
    ]
  }
};

/**
 * Classifies a user query and returns the matching concept domain or fallback
 */
export function classifyInquiry(query: string): ConceptDomain {
  const normalized = query.toLowerCase();
  
  if (normalized.includes('shadow') || normalized.includes('dark') || normalized.includes('silhouette')) {
    return CONCEPT_CATALOG.shadows;
  }
  
  if (normalized.includes('prism') || normalized.includes('rainbow') || normalized.includes('color') || normalized.includes('refract') || normalized.includes('light')) {
    return CONCEPT_CATALOG.prisms;
  }

  // Default to shadows as foundational visual exploration
  return CONCEPT_CATALOG.shadows;
}

/**
 * Analyzes a child's prediction or response and produces a supportive, Think-First answer
 */
export function generateThinkFirstResponse(
  query: string,
  concept: ConceptDomain,
  previousAnswer?: string
): {
  message: string;
  isMisconception: boolean;
  requiresExperiment: boolean;
} {
  if (!previousAnswer) {
    return {
      message: `${concept.initialQuestionPrompt}\n\n${concept.predictionQuestion}`,
      isMisconception: false,
      requiresExperiment: true
    };
  }

  // Check misconception handlers
  const lowerAnswer = previousAnswer.toLowerCase();
  for (const handler of concept.misconceptionHandlers) {
    if (lowerAnswer.includes(handler.pattern.toLowerCase())) {
      return {
        message: handler.response,
        isMisconception: true,
        requiresExperiment: true
      };
    }
  }

  // Positive non-judgmental progression
  return {
    message: `That's an insightful thought! Let's verify it right now in our simulation. Adjust the controls and observe what happens to the visual.`,
    isMisconception: false,
    requiresExperiment: true
  };
}
