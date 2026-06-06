import { useState, useMemo } from 'react';
import { Search, Filter, X, ChevronRight, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { skills, stages, skillTypes, stageColors } from '@/data/skills';
import type { Skill, Stage, SkillType } from '@/types';

export default function SkillsPage() {
  const [search, setSearch] = useState('');
  const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
  const [selectedType, setSelectedType] = useState<SkillType | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [copied, setCopied] = useState(false);

  const filtered = useMemo(() => {
    return skills.filter((s) => {
      if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && 
          !s.context.some(c => c.toLowerCase().includes(search.toLowerCase()))) return false;
      if (selectedStage && s.stage !== selectedStage) return false;
      if (selectedType && s.type !== selectedType) return false;
      return true;
    });
  }, [search, selectedStage, selectedType]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-medium tracking-widest text-muted-foreground mb-4">Skill Library</p>
          <h1 className="text-[2.25rem] leading-[1.15] tracking-[-0.03em] font-medium mb-3">
            Atomic capabilities
          </h1>
          <p className="text-muted-foreground max-w-lg text-sm leading-relaxed">
            Each skill is a reusable module with defined inputs, processes, outputs, and AI prompts. 
            Compose them into workflows.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between gap-4 mb-8">
          {/* Chips — stage + type filters */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setSelectedStage(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                !selectedStage
                  ? 'bg-foreground text-background border-transparent'
                  : 'bg-card text-muted-foreground hover:text-foreground border-border'
              }`}
            >
              All
            </button>
            {stages.map((stage) => {
              return (
                <button
                  key={stage}
                  onClick={() => setSelectedStage(selectedStage === stage ? null : stage)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                    selectedStage === stage
                      ? 'bg-foreground text-background border-transparent'
                      : 'bg-card text-muted-foreground hover:text-foreground border-border'
                  }`}
                >
                  {stage}
                </button>
              );
            })}

            <div className="w-px h-5 bg-border mx-1 hidden sm:block" />

            {skillTypes.map((type) => {
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(selectedType === type ? null : type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border ${
                    selectedType === type
                      ? 'bg-foreground text-background border-transparent'
                      : 'bg-card text-muted-foreground hover:text-foreground border-border'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-56 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card border rounded-full"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-6">
          {filtered.length} skill{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((skill) => (
            <button
              key={skill.id}
              onClick={() => setSelectedSkill(skill)}
              className="group text-left p-5 bg-card border rounded-2xl hover:border-foreground/15 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-sm pr-2">{skill.name}</h3>
                <Badge
                  className={`text-xs font-normal border shrink-0 ${stageColors[skill.stage]}`}
                  variant="outline"
                >
                  {skill.stage}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                {skill.context[0]}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs font-normal">
                  {skill.type}
                </Badge>
                <span className="text-xs text-muted-foreground/70">
                  {skill.frameworks.length} frameworks
                </span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/40 ml-auto group-hover:text-foreground/50 transition-colors" />
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Filter className="w-8 h-8 text-muted-foreground/40 mx-auto mb-4" />
            <p className="text-muted-foreground text-sm">No skills match your filters.</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => { setSearch(''); setSelectedStage(null); setSelectedType(null); }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>

      {/* Skill Detail Sheet */}
      <Sheet open={!!selectedSkill} onOpenChange={() => setSelectedSkill(null)}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto p-6">
          {selectedSkill && (
            <div className="flex flex-col gap-4">
              <SheetHeader className="mb-8 p-0">
                <div className="flex items-center gap-2 mb-3">
                  <Badge
                    className={`text-xs font-normal border ${stageColors[selectedSkill.stage]}`}
                    variant="outline"
                  >
                    {selectedSkill.stage}
                  </Badge>
                  <Badge variant="secondary" className="text-xs font-normal">
                    {selectedSkill.type}
                  </Badge>
                </div>
                <SheetTitle className="text-xl font-medium tracking-[-0.02em]">
                  {selectedSkill.name}
                </SheetTitle>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                  {selectedSkill.context.join(' · ')}
                </p>
              </SheetHeader>

              <div className="space-y-8">
                {/* Frameworks */}
                <div>
                  <h4 className="text-xs font-medium tracking-widest text-muted-foreground mb-3">
                    Frameworks
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSkill.frameworks.map((f) => (
                      <Badge key={f} variant="outline" className="text-xs font-normal">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Input */}
                <div>
                  <h4 className="text-xs font-medium tracking-widest text-muted-foreground mb-3">
                    Input
                  </h4>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {selectedSkill.input.type.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs font-normal">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Format: {selectedSkill.input.format}
                  </p>
                </div>

                <Separator />

                {/* Process */}
                <div>
                  <h4 className="text-xs font-medium tracking-widest text-muted-foreground mb-3">
                    Process
                  </h4>
                  <ol className="space-y-2.5">
                    {selectedSkill.process.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-xs font-semibold text-foreground shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-muted-foreground leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <Separator />

                {/* Output */}
                <div>
                  <h4 className="text-xs font-medium tracking-widest text-muted-foreground mb-3">
                    Output
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">Format: {selectedSkill.output.format}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSkill.output.artifacts.map((a) => (
                      <Badge key={a} variant="secondary" className="text-xs font-normal">
                        {a}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Prompt */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-medium tracking-widest text-muted-foreground">
                      Prompt
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => handleCopy(`${selectedSkill.prompt.system}\n\n---\n\n${selectedSkill.prompt.user}`)}
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span className="ml-1.5">{copied ? 'Copied' : 'Copy'}</span>
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="p-4 bg-secondary rounded-lg border">
                      <p className="text-xs font-medium text-muted-foreground mb-1.5 tracking-wider">System</p>
                      <p className="text-sm leading-relaxed">{selectedSkill.prompt.system}</p>
                    </div>
                    <div className="p-4 bg-secondary rounded-lg border">
                      <p className="text-xs font-medium text-muted-foreground mb-1.5 tracking-wider">User</p>
                      <p className="text-xs leading-relaxed">{selectedSkill.prompt.user}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Examples */}
                {selectedSkill.examples.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium tracking-widest text-muted-foreground mb-3">
                      Example
                    </h4>
                    {selectedSkill.examples.map((ex, i) => (
                      <div key={i} className="space-y-2 mb-4 last:mb-0">
                        <div className="p-4 bg-secondary rounded-lg border">
                          <p className="text-xs font-medium text-muted-foreground mb-1.5 tracking-wider">Input</p>
                          <p className="text-sm leading-relaxed">{ex.input}</p>
                        </div>
                        <div className="p-4 bg-accent/50 rounded-lg border border-accent/20">
                          <p className="text-xs font-medium text-accent-foreground mb-1.5 tracking-wider">Output</p>
                          <p className="text-xs leading-relaxed">{ex.output}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Separator />

                {/* Relations */}
                <div className="grid grid-cols-2 gap-6">
                  {selectedSkill.relatedSkills.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium tracking-widest text-muted-foreground mb-2">
                        Related Skills
                      </h4>
                      <div className="space-y-1.5">
                        {selectedSkill.relatedSkills.map((s) => (
                          <p key={s} className="text-xs text-muted-foreground">{s}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  {selectedSkill.usedInWorkflows.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium tracking-widest text-muted-foreground mb-2">
                        Used In
                      </h4>
                      <div className="space-y-1.5">
                        {selectedSkill.usedInWorkflows.map((w) => (
                          <p key={w} className="text-xs text-muted-foreground">{w}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
