import { useState } from 'react';
import { GitBranch, ChevronRight, ArrowRight, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { workflows } from '@/data/workflows';
import { skills } from '@/data/skills';
import type { Workflow } from '@/types';

export default function WorkflowsPage() {
  const [selected, setSelected] = useState<Workflow | null>(null);

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-medium tracking-widest text-muted-foreground mb-4">Composition Layer</p>
          <h1 className="text-[2.25rem] leading-[1.15] tracking-[-0.03em] font-medium mb-3">
            Workflows
          </h1>
          <p className="text-muted-foreground max-w-lg text-sm leading-relaxed">
            End-to-end design processes composed from atomic skills. Each workflow 
            connects frameworks, skills, and outputs into a coherent sequence.
          </p>
        </div>

        {/* Workflow Cards */}
        <div className="space-y-6">
          {workflows.map((wf) => (
            <button
              key={wf.id}
              onClick={() => setSelected(wf)}
              className="w-full text-left group p-8 bg-card border rounded-2xl hover:border-foreground/15 transition-all duration-200"
            >
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center shrink-0 group-hover:bg-accent transition-colors">
                  <GitBranch className="w-6 h-6 text-foreground/50" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-medium tracking-[-0.02em] mb-2">{wf.name}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{wf.goal}</p>

                  {/* Step preview */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {wf.steps.map((step, i) => {
                      const skill = skills.find((s) => s.id === step.skillId);
                      return (
                        <div key={i} className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs font-normal">
                            {skill?.name || step.skillId}
                          </Badge>
                          {i < wf.steps.length - 1 && (
                            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-foreground/40 group-hover:translate-x-1 transition-all shrink-0 mt-2" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Workflow Detail Sheet */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-6">
          {selected && (
            <ScrollArea className="h-full">
              <SheetHeader className="mb-8 p-0">
                <div className="flex items-center gap-2 mb-3">
                  <GitBranch className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-medium tracking-widest text-muted-foreground">Workflow</span>
                </div>
                <SheetTitle className="text-xl font-medium tracking-[-0.02em]">
                  {selected.name}
                </SheetTitle>
              </SheetHeader>

              <div className="space-y-8">
                {/* Goal */}
                <div>
                  <div className="flex items-start gap-3 p-4 bg-accent/50 rounded-lg">
                    <Target className="w-4 h-4 text-accent-foreground mt-0.5 shrink-0" />
                    <p className="text-sm leading-relaxed">{selected.goal}</p>
                  </div>
                </div>

                {/* Frameworks */}
                <div>
                  <h4 className="text-xs font-medium tracking-widest text-muted-foreground mb-3">
                    Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.frameworks.map((f) => (
                      <Badge key={f} variant="outline" className="text-xs font-normal">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Steps */}
                <div>
                  <h4 className="text-xs font-medium tracking-widest text-muted-foreground mb-4">
                    Steps ({selected.steps.length})
                  </h4>
                  <div className="space-y-4">
                    {selected.steps.map((step, i) => {
                      const skill = skills.find((s) => s.id === step.skillId);
                      return (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                              <span className="text-xs font-medium text-muted-foreground">{i + 1}</span>
                            </div>
                            {i < selected.steps.length - 1 && (
                              <div className="w-px flex-1 bg-border my-1" />
                            )}
                          </div>
                          <div className="pb-4 flex-1">
                            <p className="text-sm font-medium mb-1">
                              {skill?.name || step.skillId}
                            </p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {step.description}
                            </p>
                            {skill && (
                              <div className="flex flex-wrap gap-1 mt-2">
                                <Badge variant="secondary" className="text-xs font-normal">
                                  {skill.stage}
                                </Badge>
                                <Badge variant="secondary" className="text-xs font-normal">
                                  {skill.type}
                                </Badge>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <Separator />

                {/* Outputs */}
                <div>
                  <h4 className="text-xs font-medium tracking-widest text-muted-foreground mb-3">
                    Deliverables
                  </h4>
                  <ul className="space-y-1.5">
                    {selected.output.map((o, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="w-1 h-1 rounded-full bg-foreground/30 shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollArea>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
