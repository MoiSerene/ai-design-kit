import { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { skills, stageColors } from '@/data/skills';
import { frameworks } from '@/data/frameworks';
import { workflows } from '@/data/workflows';

/* Four-card palette — Velvet Night, Petal, Fern, Linen */
const cardStyles = [
  { bg: '#09090B', text: '#F4F1F9', accent: '#DBAEBB', labelBg: 'rgba(255,255,255,0.10)', border: 'rgba(255,255,255,0.08)' },
  { bg: '#DBAEBB', text: '#3D2617', accent: '#C4909D', labelBg: 'rgba(0,0,0,0.08)', border: 'rgba(0,0,0,0.10)' },
  { bg: '#8F9951', text: '#F2F4EE', accent: '#A8B065', labelBg: 'rgba(255,255,255,0.12)', border: 'rgba(255,255,255,0.10)' },
  { bg: '#F0EDE6', text: '#3A3A35', accent: '#D6D6D1', labelBg: 'rgba(0,0,0,0.04)', border: 'rgba(0,0,0,0.06)' },
];

function SkillStackCards() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const displaySkills = skills.slice(0, 4);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    displaySkills.forEach((_, i) => {
      timers.push(setTimeout(() => {
        setVisibleCount(i + 1);
      }, 800 + i * 600));
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative w-full max-w-[360px] h-[460px] mx-auto">
      {displaySkills.map((skill, index) => {
        const style = cardStyles[index];
        /* Cards fan out, alternating tilt */
        const offsets = [
          { x: 0, y: 0, rotate: 0 },       // top card: straight
          { x: 24, y: 68, rotate: -2.5 },  // second: tilt left
          { x: 48, y: 136, rotate: 3 },    // third: tilt right
          { x: 72, y: 204, rotate: -4 },   // bottom: tilt left
        ];
        const { x: baseX, y: baseY, rotate: baseRotate } = offsets[index];
        const isVisible = index < visibleCount;

        return (
          <div
            key={skill.id}
            className="absolute rounded-2xl overflow-hidden cursor-pointer group"
            style={{
              background: style.bg,
              color: style.text,
              border: `1px solid ${style.border}`,
              width: '100%',
              height: '74%',
              top: 0,
              left: 0,
              transform: `translateX(${isVisible ? baseX : baseX - 40}px) translateY(${isVisible ? (hoveredIndex !== null && hoveredIndex !== index ? baseY + 20 : hoveredIndex === index ? baseY - 40 : baseY) : baseY + 100}px) rotate(${isVisible ? (hoveredIndex === index ? baseRotate * 0.3 : baseRotate) : -8}deg)${hoveredIndex === index ? ' scale(1.04)' : ''}`,
              opacity: isVisible ? (hoveredIndex !== null && hoveredIndex !== index ? 0.5 : 1) : 0,
              zIndex: hoveredIndex === index ? index + 10 : index,
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              boxShadow: hoveredIndex === index
                ? '0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)'
                : isVisible
                  ? '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.05)'
                  : 'none',
            }}
            onClick={() => { window.location.href = `/skills#${skill.id}`; }}
            onMouseEnter={() => {
              if (!isVisible) return;
              setHoveredIndex(index);
            }}
            onMouseLeave={() => {
              if (!isVisible) return;
              setHoveredIndex(null);
            }}
          >
            <div className="p-5 h-full flex flex-col justify-between">
              <div>
                <div
                  className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium tracking-widest mb-3"
                  style={{ backgroundColor: style.labelBg }}
                >
                  {skill.stage} · {skill.type}
                </div>

                <h3 className="text-lg font-semibold leading-tight tracking-[-0.02em] mb-2">
                  {skill.name}
                </h3>
                <p className="text-xs leading-relaxed opacity-70 line-clamp-2">
                  {skill.context[0]}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t mt-3" style={{ borderColor: 'rgba(0,0,0,0.10)' }}>
                <span className="text-xs opacity-50 tracking-wider font-medium">
                  {skill.frameworks[0]}
                </span>
                <ArrowRight className="w-3.5 h-3.5 opacity-35 group-hover:opacity-65 group-hover:translate-x-0.5 transition-all duration-300" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ArchitecturePanel() {
  const [hovered, setHovered] = useState<string>('frameworks');

  const tabs = [
    {
      id: 'frameworks',
      title: 'Frameworks',
      desc: 'A way of thinking.',
      detail: (
        <>
          <span className="font-semibold">Mental models</span> that shape how you approach design problems. They provide <span className="font-semibold">structure</span> for analyzing complex situations, from <span className="font-semibold">JTBD</span> for understanding user motivations to <span className="font-semibold">Systems Thinking</span> for mapping interconnections. Each framework is backed by <span className="font-semibold">core concepts</span> and linked to the skills that put them into practice.
        </>
      ),
      color: '#DBAEBB',
      bg: 'bg-[#DBAEBB]/10',
      text: 'text-[#C4909D]',
      items: frameworks.map((f) => ({ name: f.name, desc: f.description })),
      href: '/frameworks',
    },
    {
      id: 'skills',
      title: 'Skills',
      desc: 'A reusable capability.',
      detail: (
        <>
          <span className="font-semibold">Executable AI-powered capabilities</span> — each one is a <span className="font-semibold">prompt template</span> with defined inputs, process steps, and outputs. Think of them as <span className="font-semibold">reusable design micro-services</span>: interview analysis, opportunity mapping, agent design, and more. They follow a <span className="font-semibold">consistent structure</span> so you can chain them together.
        </>
      ),
      color: '#8F9951',
      bg: 'bg-[#8F9951]/10',
      text: 'text-[#8F9951]',
      items: skills.slice(0, 5).map((s: any) => ({ name: s.name, desc: s.context?.[0] || '' })),
      href: '/skills',
    },
    {
      id: 'workflows',
      title: 'Workflows',
      desc: 'A sequence of skills.',
      detail: (
        <>
          <span className="font-semibold">Compose skills</span> into <span className="font-semibold">end-to-end design processes</span>. From research synthesis to AI feature discovery, each workflow strings together skills in a <span className="font-semibold">logical sequence</span> — defining what to do, in what order, and what <span className="font-semibold">artifacts</span> each step produces.
        </>
      ),
      color: '#D6D6D1',
      bg: 'bg-[#D6D6D1]/30',
      text: 'text-[#6B6B62]',
      items: workflows.map((w) => ({ name: w.name, desc: w.goal })),
      href: '/workflows',
    },
  ];

  const active = tabs.find((t) => t.id === hovered) || tabs[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12">
      {/* Left: Accordion-style hover list */}
      <div className="divide-y divide-border/40">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onMouseEnter={() => setHovered(tab.id)}
            className="py-4 cursor-pointer group"
          >
            <div className={`transition-colors duration-200 ${hovered === tab.id ? '' : 'opacity-60'}`}>
              <h3 className="text-2xl font-medium tracking-[-0.02em] leading-tight">{tab.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{tab.desc}</p>
              {hovered === tab.id && (
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-300">{tab.detail}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Right: Cards */}
      <div className="space-y-3">
        {active.id === 'skills'
          ? skills.slice(0, 5).map((s: any) => (
              <a
                key={s.id}
                href={active.href}
                className="block rounded-xl px-5 py-4 bg-white border border-border/30 transition-all duration-200 hover:opacity-80"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-base font-medium tracking-[-0.01em]">{s.name}</p>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full border ${stageColors[s.stage]}`}>{s.stage}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{s.context?.[0]}</p>
                <div className="flex gap-1.5 mt-2.5 flex-wrap">
                  {s.frameworks?.map((fw: string) => (
                    <span key={fw} className="text-[10px] text-muted-foreground">{fw}</span>
                  ))}
                </div>
              </a>
            ))
          : active.items.map((item) => (
              <a
                key={item.name}
                href={active.href}
                className="block rounded-xl px-5 py-4 bg-white border border-border/30 transition-all duration-200 hover:opacity-80"
              >
                <p className="text-base font-medium tracking-[-0.01em]">{item.name}</p>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">{item.desc}</p>
              </a>
            ))
        }
        <a href={active.href} className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors pt-1">
          View all {active.title.toLowerCase()} <ArrowRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero — Command Center with Stacked Cards */}
      <section className="pt-24 pb-20 px-6 lg:pt-32 lg:pb-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-muted-foreground text-xs font-medium mb-8 tracking-wider">
                Reusable AI Design Kit
              </div>

              <h1 className="text-[2.75rem] leading-[1.08] tracking-[-0.03em] font-medium mb-6 text-balance lg:text-[3rem]">
                Design methods,
                <br />
                <span className="text-muted-foreground">ready to execute.</span>
              </h1>

              <p className="text-base text-muted-foreground max-w-md mb-10 leading-relaxed lg:text-lg">
                From JTBD analysis to Agent UX design,
                <br />
                turn frameworks into reusable skills. 
                workflows — systematically.
              </p>

              {/* CTA */}
              <a href="/skills" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-foreground/70 transition-colors">
                <span>Browse Skills</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-all duration-200" />
              </a>
            </div>

            {/* Right: Stacked Cards */}
            <div className="hidden lg:block">
              <SkillStackCards />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement — Full Screen */}
      <section className="min-h-screen pt-32 pb-16 px-6 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          {/* Top: Text */}
          <div className="mb-12">
            <h2 className="text-3xl lg:text-[2.75rem] leading-tight tracking-[-0.02em] font-medium mb-6 text-balance">
              Design knowledge is scattered.
            </h2>
            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              Most designers collect information.<br />
              Few build reusable capabilities.
            </p>
          </div>

          {/* Bottom: Three cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                title: 'Prompts',
                desc: 'Live in chats.',
                shape: (
                  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(50,50) scale(1.05) translate(8,0)">
                      <polygon points="-18,-25 8,20 -44,20" fill="#DBAEBB" />
                      <polygon points="0,-25 26,20 -26,20" fill="#DBAEBB" opacity="0.6" />
                    </g>
                  </svg>
                ),
              },
              {
                title: 'Frameworks',
                desc: 'Live in notes.',
                shape: (
                  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(50,50) scale(0.85)">
                      {[...Array(10)].map((_, i) => {
                        const angle = (i * 36) * Math.PI / 180;
                        return (
                          <circle key={i} cx={22 * Math.cos(angle)} cy={22 * Math.sin(angle)} r="12" fill="#8F9951" />
                        );
                      })}
                    </g>
                  </svg>
                ),
              },
              {
                title: 'Methods',
                desc: 'Disappear between projects.',
                shape: (
                  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(50,50) scale(0.82)">
                      {[...Array(3)].map((_, row) =>
                        [...Array(3)].map((_, col) => (
                          <circle key={`${row}-${col}`} cx={col * 18 - 18} cy={row * 18 - 18} r="8" fill="#D6D6D1" />
                        ))
                      )}
                    </g>
                  </svg>
                ),
              },
            ].map((item) => (
              <div key={item.title} className="group p-6 rounded-2xl bg-white/70 backdrop-blur-sm transition-all duration-200 hover:bg-white/90 hover:shadow-sm cursor-default">
                <div className="w-full aspect-square mb-4 overflow-hidden rounded-xl">
                  {item.shape}
                </div>
                <p className="text-sm font-medium text-foreground mb-1">{item.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Overview — Full Width */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl lg:text-[2.75rem] leading-tight tracking-[-0.02em] font-medium mb-6 text-balance">
              Turn methods into reusable tools.
            </h2>
            <p className="text-base text-muted-foreground max-w-md leading-relaxed">
              Instead of collecting prompts,<br />
              capture repeatable ways of working.
            </p>
          </div>

          <ArchitecturePanel />
        </div>
      </section>

      {/* Skills Preview */}
      <section className="py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-medium tracking-widest text-muted-foreground mb-4">Skill Inventory</p>
              <h2 className="text-2xl font-medium tracking-[-0.02em]">
                {skills.length} skills across 4 stages
              </h2>
            </div>
            <a href="/skills" className="hidden sm:inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {skills.slice(0, 6).map((skill) => (
              <a
                key={skill.id}
                href={`/skills#${skill.id}`}
                className="group p-5 bg-card border rounded-2xl hover:border-foreground/15 transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-medium text-sm">{skill.name}</h3>
                  <Badge 
                    className={`text-xs font-normal border ${stageColors[skill.stage]}`}
                    variant="outline"
                  >
                    {skill.stage}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                  {skill.context[0]}
                </p>
                <div className="flex items-center gap-1.5">
                  {skill.frameworks.slice(0, 2).map((f) => (
                    <span key={f} className="text-xs text-muted-foreground/70">
                      {f}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Button variant="outline" asChild>
              <a href="/skills">
                View all skills <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 bg-white/40 border-t">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-medium tracking-[-0.02em] mb-4">
            Start with a skill
          </h2>
          <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
            Browse the skill library, find what you need, and compose it into your workflow.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild>
              <a href="/skills">Browse Skills</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/workflows">View Workflows</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
