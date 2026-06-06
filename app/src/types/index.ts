export interface Skill {
  id: string;
  name: string;
  stage: 'Discover' | 'Define' | 'Develop' | 'Deliver';
  type: 'Research' | 'Strategy' | 'UX' | 'AI' | 'Systems';
  context: string[];
  frameworks: string[];
  input: {
    type: string[];
    format: string;
  };
  process: string[];
  output: {
    format: string;
    artifacts: string[];
  };
  prompt: {
    system: string;
    user: string;
  };
  examples: {
    input: string;
    output: string;
  }[];
  variants: string[];
  relatedSkills: string[];
  usedInWorkflows: string[];
}

export interface Workflow {
  id: string;
  name: string;
  goal: string;
  frameworks: string[];
  steps: {
    skillId: string;
    description: string;
  }[];
  output: string[];
}

export interface Framework {
  id: string;
  name: string;
  description: string;
  coreConcepts: string[];
  usedInSkills: string[];
}

export type Stage = 'Discover' | 'Define' | 'Develop' | 'Deliver';
export type SkillType = 'Research' | 'Strategy' | 'UX' | 'AI' | 'Systems';
