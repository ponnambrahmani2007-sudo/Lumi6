/**
 * Lumi6 — Controlled Visual Simulation Registry
 * Enforces strict boundaries: AI can only request verified, safe client components.
 */

export interface VisualActivityMetadata {
  id: 'shadow_distance' | 'prism_rainbow' | 'none';
  title: string;
  componentKey: string;
  description: string;
  supportedControls: string[];
  safePracticalActivity: {
    title: string;
    materials: string[];
    steps: string[];
    safetyTip: string;
  };
}

export const VISUAL_ACTIVITY_REGISTRY: Record<string, VisualActivityMetadata> = {
  shadow_distance: {
    id: 'shadow_distance',
    title: 'Light & Shadow Distance Simulator',
    componentKey: 'ShadowSimulationCanvas',
    description: 'An interactive 2D ray-casting simulator showing how moving a light source closer to an obstacle casts a larger shadow.',
    supportedControls: ['distance_slider', 'light_toggle'],
    safePracticalActivity: {
      title: 'The Flashlight Wall Mystery',
      materials: ['Phone flashlight or small torch', 'A small toy or your hand', 'A plain wall'],
      steps: [
        'Dim the room lights.',
        'Hold your hand steady 1 foot in front of a wall.',
        'Move the flashlight closer to your hand, then pull it back.',
        'Watch your hand shadow grow into a giant!'
      ],
      safetyTip: 'Never look directly into a bright flashlight.'
    }
  },

  prism_rainbow: {
    id: 'prism_rainbow',
    title: 'Prism & Rainbow Refraction Chamber',
    componentKey: 'PrismRefractionCanvas',
    description: 'An interactive optics simulator demonstrating light slowing down in glass and dispersing into rainbow colors by wavelength.',
    supportedControls: ['angle_slider', 'monochrome_toggle'],
    safePracticalActivity: {
      title: 'Make a Window Rainbow with Water',
      materials: ['A clear drinking glass filled with water', 'A sunny window or flashlight', 'White paper'],
      steps: [
        'Place the paper on the floor or table in sunlight.',
        'Hold the glass of water slightly above the paper.',
        'Tilt the glass gently until rainbow stripes appear on the paper!'
      ],
      safetyTip: 'Always handle glassware with adult guidance.'
    }
  },

  none: {
    id: 'none',
    title: 'None',
    componentKey: 'TextExplanation',
    description: 'No visual simulation required for this inquiry.',
    supportedControls: [],
    safePracticalActivity: {
      title: 'Mental Reflection',
      materials: ['Paper and pencil'],
      steps: ['Write or draw your thoughts.'],
      safetyTip: 'Enjoy learning!'
    }
  }
};

export function isValidVisualActivity(id: unknown): id is 'shadow_distance' | 'prism_rainbow' | 'none' {
  return typeof id === 'string' && (id === 'shadow_distance' || id === 'prism_rainbow' || id === 'none');
}

export function resolveVisualActivity(id: string): VisualActivityMetadata {
  if (isValidVisualActivity(id)) {
    return VISUAL_ACTIVITY_REGISTRY[id];
  }
  return VISUAL_ACTIVITY_REGISTRY.none;
}
