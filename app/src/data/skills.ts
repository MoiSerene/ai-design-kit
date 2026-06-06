import type { Skill } from '@/types';

export const skills: Skill[] = [
  {
    id: 'interview-analysis',
    name: 'Interview Analysis',
    stage: 'Discover',
    type: 'Research',
    context: ['User research synthesis', 'Pattern extraction from raw interviews'],
    frameworks: ['JTBD', 'Human-Centered AI'],
    input: {
      type: ['Transcript', 'Recording notes', 'Observation logs'],
      format: 'Markdown',
    },
    process: [
      'Transcribe and clean raw data',
      'Identify recurring themes',
      'Tag emotional signals',
      'Map to JTBD dimensions',
      'Extract verbatim evidence',
    ],
    output: {
      format: 'Structured report',
      artifacts: ['Theme clusters', 'Quote library', 'Emotion map'],
    },
    prompt: {
      system: 'You are a design researcher specialized in qualitative interview analysis.',
      user: 'Analyze this interview transcript. Extract themes, emotional signals, and JTBD-related jobs, pains, and gains.',
    },
    examples: [
      {
        input: 'Interview transcript about team collaboration tool usage',
        output: 'Theme: Coordination overhead; Job: "When I need to hand off work, I want clear ownership so I don\'t duplicate effort"',
      },
    ],
    variants: ['Expert interview', 'User interview', 'Stakeholder interview'],
    relatedSkills: ['affinity-mapping', 'problem-framing'],
    usedInWorkflows: ['research-synthesis', 'ai-feature-discovery'],
  },
  {
    id: 'jtbd-extraction',
    name: 'JTBD Extraction',
    stage: 'Discover',
    type: 'Strategy',
    context: ['Identifying unmet user needs', 'Converting observations into structured jobs'],
    frameworks: ['JTBD', 'Systems Thinking'],
    input: {
      type: ['Research findings', 'Interview themes', 'Behavioral observations'],
      format: 'Markdown',
    },
    process: [
      'Review research findings',
      'Identify functional jobs',
      'Identify emotional jobs',
      'Identify social jobs',
      'Define context and constraints',
      'Validate with evidence',
    ],
    output: {
      format: 'JTBD statement library',
      artifacts: ['Job statements', 'Context map', 'Desired outcomes'],
    },
    prompt: {
      system: 'You are a JTBD strategist. Extract job statements from user research.',
      user: 'From the following research, extract functional, emotional, and social jobs. Format each as "When [situation], I want [motivation], so I can [outcome]."',
    },
    examples: [
      {
        input: 'Users struggle to find relevant design patterns for AI interactions',
        output: 'When designing an AI feature, I want to reference proven interaction patterns, so I can reduce design risk and ship faster.',
      },
    ],
    variants: ['B2B JTBD', 'Consumer JTBD', 'Internal tool JTBD'],
    relatedSkills: ['interview-analysis', 'opportunity-mapping'],
    usedInWorkflows: ['research-synthesis', 'ai-feature-discovery'],
  },
  {
    id: 'affinity-mapping',
    name: 'Affinity Mapping',
    stage: 'Discover',
    type: 'Research',
    context: ['Synthesizing large amounts of qualitative data', 'Finding patterns across multiple sources'],
    frameworks: ['Systems Thinking', 'Human-Centered AI'],
    input: {
      type: ['Research notes', 'Interview quotes', 'Observation data'],
      format: 'Markdown / CSV',
    },
    process: [
      'Extract atomic observations',
      'Group by semantic similarity',
      'Label each cluster',
      'Identify relationships between clusters',
      'Prioritize by frequency and impact',
    ],
    output: {
      format: 'Affinity diagram',
      artifacts: ['Cluster labels', 'Relationship map', 'Priority matrix'],
    },
    prompt: {
      system: 'You are a design researcher skilled in affinity mapping and qualitative synthesis.',
      user: 'Group these observations into thematic clusters. Label each cluster and identify cross-cluster relationships.',
    },
    examples: [
      {
        input: '200+ observations from usability tests',
        output: 'Clusters: Navigation confusion (47), Trust signals (32), Onboarding friction (28), Data density (22)',
      },
    ],
    variants: ['Digital whiteboard', 'Async remote', 'Mixed methods'],
    relatedSkills: ['interview-analysis', 'problem-framing'],
    usedInWorkflows: ['research-synthesis'],
  },
  {
    id: 'problem-framing',
    name: 'Problem Framing',
    stage: 'Define',
    type: 'Strategy',
    context: ['Defining the right problem before solving', 'Aligning stakeholders on problem space'],
    frameworks: ['Systems Thinking', 'JTBD'],
    input: {
      type: ['Research synthesis', 'Business goals', 'User needs'],
      format: 'Markdown',
    },
    process: [
      'Articulate current state',
      'Define desired future state',
      'Identify barriers and tensions',
      'Frame as a "How might we" question',
      'Validate with stakeholders',
    ],
    output: {
      format: 'Problem statement',
      artifacts: ['Problem frame', 'Stakeholder alignment doc', 'Success criteria'],
    },
    prompt: {
      system: 'You are a strategic design thinker. Frame problems precisely.',
      user: 'Given the research and context below, craft a clear problem statement. Include current state, desired state, and key barriers.',
    },
    examples: [
      {
        input: 'Users cannot effectively evaluate AI-generated design suggestions',
        output: 'Problem: Designers lack a structured way to evaluate AI suggestions. HMW: How might we create a comparison framework that makes AI output quality transparent and actionable?',
      },
    ],
    variants: ['Strategic framing', 'Tactical framing', 'Technical framing'],
    relatedSkills: ['affinity-mapping', 'opportunity-mapping'],
    usedInWorkflows: ['ai-feature-discovery'],
  },
  {
    id: 'opportunity-mapping',
    name: 'Opportunity Mapping',
    stage: 'Define',
    type: 'Strategy',
    context: ['Identifying where to focus design efforts', 'Prioritizing feature opportunities'],
    frameworks: ['JTBD', 'Systems Thinking'],
    input: {
      type: ['Problem frames', 'User needs', 'Market analysis'],
      format: 'Markdown',
    },
    process: [
      'List all identified opportunities',
      'Score by user value and business impact',
      'Map to effort and feasibility',
      'Plot on 2x2 matrix',
      'Recommend priority order',
    ],
    output: {
      format: 'Opportunity matrix',
      artifacts: ['2x2 matrix', 'Priority roadmap', 'Rationale document'],
    },
    prompt: {
      system: 'You are a product strategist. Map and prioritize design opportunities.',
      user: 'Evaluate these opportunities against user value, business impact, and implementation effort. Recommend a prioritized roadmap.',
    },
    examples: [
      {
        input: 'List of 15 potential AI features for a design tool',
        output: 'Top priority: AI-assisted design critique (high value, moderate effort). Deprioritized: Full auto-generation (low trust, high effort).',
      },
    ],
    variants: ['Feature opportunity', 'Experience opportunity', 'Platform opportunity'],
    relatedSkills: ['problem-framing', 'jtbd-extraction'],
    usedInWorkflows: ['ai-feature-discovery'],
  },
  {
    id: 'agent-design',
    name: 'Agent Design',
    stage: 'Develop',
    type: 'AI',
    context: ['Designing AI agent experiences', 'Defining agent behavior and interaction patterns'],
    frameworks: ['Human-Centered AI', 'Systems Thinking'],
    input: {
      type: ['Agent requirements', 'Use cases', 'User journey'],
      format: 'Markdown',
    },
    process: [
      'Define agent persona and tone',
      'Map agent capabilities to user needs',
      'Design interaction protocol',
      'Define error and edge case handling',
      'Specify feedback and transparency mechanisms',
    ],
    output: {
      format: 'Agent design spec',
      artifacts: ['Persona doc', 'Interaction protocol', 'Error handling guide'],
    },
    prompt: {
      system: 'You are an AI interaction designer. Design agent experiences that are transparent, controllable, and trustworthy.',
      user: 'Design an AI agent for the following use case. Define persona, interaction patterns, error handling, and transparency mechanisms.',
    },
    examples: [
      {
        input: 'Design agent that helps designers explore layout alternatives',
        output: 'Agent persona: "Thoughtful collaborator." Interaction: suggestion cards with rationale. Error: graceful degradation with manual override.',
      },
    ],
    variants: ['Conversational agent', 'Embedded agent', 'Autonomous agent'],
    relatedSkills: ['prompt-design', 'ux-critique'],
    usedInWorkflows: ['agent-design-flow'],
  },
  {
    id: 'prompt-design',
    name: 'Prompt Design',
    stage: 'Develop',
    type: 'AI',
    context: ['Crafting effective AI prompts for design tasks', 'Building reusable prompt templates'],
    frameworks: ['Human-Centered AI'],
    input: {
      type: ['Task description', 'Expected output format', 'Constraints'],
      format: 'Markdown',
    },
    process: [
      'Define the AI role and context',
      'Specify input format and constraints',
      'Define step-by-step process',
      'Specify output format',
      'Test and iterate with examples',
    ],
    output: {
      format: 'Prompt template',
      artifacts: ['System prompt', 'User prompt', 'Example inputs/outputs'],
    },
    prompt: {
      system: 'You are a prompt engineer specialized in design workflows. Create effective, reusable prompts.',
      user: 'Create a prompt template for the following design task. Include system context, step-by-step process, and output format specification.',
    },
    examples: [
      {
        input: 'Need a prompt for generating UI copy variations',
        output: 'System: "You are a UX writer..." Process: 1. Understand context, 2. Generate 5 variations, 3. Explain rationale for each.',
      },
    ],
    variants: ['System prompt', 'Chain-of-thought', 'Few-shot prompt'],
    relatedSkills: ['agent-design', 'workflow-design'],
    usedInWorkflows: ['agent-design-flow'],
  },
  {
    id: 'workflow-design',
    name: 'Workflow Design',
    stage: 'Develop',
    type: 'Systems',
    context: ['Designing multi-step AI-assisted workflows', 'Composing skills into end-to-end processes'],
    frameworks: ['Systems Thinking', 'Service Design'],
    input: {
      type: ['Process requirements', 'Skill inventory', 'Output goals'],
      format: 'Markdown',
    },
    process: [
      'Define workflow goal and outcomes',
      'Select and sequence skills',
      'Define handoffs between steps',
      'Specify checkpoints and validations',
      'Design feedback loops',
    ],
    output: {
      format: 'Workflow specification',
      artifacts: ['Step sequence', 'Skill mapping', 'Validation rules'],
    },
    prompt: {
      system: 'You are a design operations specialist. Compose design workflows from atomic skills.',
      user: 'Design a workflow for the following process. Select skills, define sequence, specify handoffs and validations.',
    },
    examples: [
      {
        input: 'Need an end-to-end AI feature discovery workflow',
        output: 'Workflow: Interview Analysis → Affinity Mapping → JTBD Extraction → Problem Framing → Opportunity Mapping',
      },
    ],
    variants: ['Linear workflow', 'Branching workflow', 'Iterative workflow'],
    relatedSkills: ['prompt-design', 'prototype-spec'],
    usedInWorkflows: ['ai-feature-discovery'],
  },
  {
    id: 'ux-critique',
    name: 'UX Critique',
    stage: 'Develop',
    type: 'UX',
    context: ['Evaluating design quality', 'Identifying UX issues in AI interfaces'],
    frameworks: ['Human-Centered AI', 'Service Design'],
    input: {
      type: ['Design mockups', 'Interaction flows', 'Prototypes'],
      format: 'Image / Markdown description',
    },
    process: [
      'Review against heuristics',
      'Evaluate AI-specific UX principles',
      'Identify transparency gaps',
      'Assess error recovery patterns',
      'Provide actionable recommendations',
    ],
    output: {
      format: 'Critique report',
      artifacts: ['Heuristic scorecard', 'Issue list', 'Recommendations'],
    },
    prompt: {
      system: 'You are a UX critic specialized in AI product interfaces. Evaluate designs systematically.',
      user: 'Critique this design against standard UX heuristics and AI-specific principles. Provide specific, actionable recommendations.',
    },
    examples: [
      {
        input: 'Mockup of an AI writing assistant interface',
        output: 'Issue: AI confidence not shown to users. Recommendation: Add confidence indicator with explainability on hover.',
      },
    ],
    variants: ['Heuristic evaluation', 'Cognitive walkthrough', 'Expert review'],
    relatedSkills: ['agent-design', 'prototype-spec'],
    usedInWorkflows: ['agent-design-flow'],
  },
  {
    id: 'prototype-spec',
    name: 'Prototype Spec',
    stage: 'Deliver',
    type: 'UX',
    context: ['Specifying prototypes for AI features', 'Bridging design and development'],
    frameworks: ['Human-Centered AI', 'Service Design'],
    input: {
      type: ['Design decisions', 'Interaction patterns', 'Technical constraints'],
      format: 'Markdown',
    },
    process: [
      'Define prototype scope and goals',
      'Specify interaction states',
      'Document AI behavior variations',
      'Define success metrics',
      'Create handoff documentation',
    ],
    output: {
      format: 'Prototype specification',
      artifacts: ['State diagram', 'Interaction spec', 'Metrics plan'],
    },
    prompt: {
      system: 'You are a design technologist. Create detailed prototype specifications.',
      user: 'Create a prototype spec for the following feature. Include all interaction states, AI behavior variations, and success metrics.',
    },
    examples: [
      {
        input: 'Need prototype spec for AI-powered search in a design tool',
        output: 'States: idle, typing, loading, results, empty, error. AI: shows reasoning path alongside results. Metrics: time-to-result, result relevance rating.',
      },
    ],
    variants: ['Low-fidelity spec', 'High-fidelity spec', 'Interaction prototype'],
    relatedSkills: ['ux-critique', 'workflow-design'],
    usedInWorkflows: ['agent-design-flow'],
  },
];

export const stages = ['Discover', 'Define', 'Develop', 'Deliver'] as const;
export const skillTypes = ['Research', 'Strategy', 'UX', 'AI', 'Systems'] as const;

export const stageColors: Record<string, string> = {
  Discover: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  Define: 'bg-amber-50 text-amber-800 border-amber-200',
  Develop: 'bg-sky-50 text-sky-800 border-sky-200',
  Deliver: 'bg-violet-50 text-violet-800 border-violet-200',
};

export const typeIcons: Record<string, string> = {
  Research: '🔍',
  Strategy: '◆',
  UX: '◇',
  AI: '○',
  Systems: '⬡',
};
