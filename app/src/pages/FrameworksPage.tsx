import { Layers, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { frameworks } from '@/data/frameworks';
import { skills } from '@/data/skills';

export default function FrameworksPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-medium tracking-widest text-muted-foreground mb-4">Thinking Systems</p>
          <h1 className="text-[2.25rem] leading-[1.15] tracking-[-0.03em] font-medium mb-3">
            Frameworks
          </h1>
          <p className="text-muted-foreground max-w-lg text-sm leading-relaxed">
            Mental models and thinking systems that inform how we approach AI product design.
            Each framework connects to a set of skills and workflows.
          </p>
        </div>

        {/* Framework Cards */}
        <div className="space-y-8">
          {frameworks.map((fw) => {
            const relatedSkills = skills.filter((s) => s.frameworks.includes(fw.name));
            return (
              <div
                key={fw.id}
                className="group p-8 bg-card border rounded-2xl hover:border-foreground/15 transition-all duration-200"
              >
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                    <Layers className="w-6 h-6 text-foreground/50" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-2">
                      <h2 className="text-xl font-medium tracking-[-0.02em]">{fw.name}</h2>
                      <span className="text-xs text-muted-foreground">
                        {relatedSkills.length} skills
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-2xl">
                      {fw.description}
                    </p>

                    <Separator className="mb-6" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Core Concepts */}
                      <div>
                        <h4 className="text-xs font-medium tracking-widest text-muted-foreground mb-3">
                          Core Concepts
                        </h4>
                        <ul className="space-y-1.5">
                          {fw.coreConcepts.map((c) => (
                            <li key={c} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span className="w-1 h-1 rounded-full bg-foreground/30 shrink-0" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Connected Skills */}
                      <div>
                        <h4 className="text-xs font-medium tracking-widest text-muted-foreground mb-3">
                          Applied In
                        </h4>
                        <div className="space-y-1.5">
                          {fw.usedInSkills.map((skillId) => {
                            const skill = skills.find((s) => s.id === skillId);
                            if (!skill) return null;
                            return (
                              <a
                                key={skillId}
                                href={`/skills#${skillId}`}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
                              >
                                <span>{skill.name}</span>
                                <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
