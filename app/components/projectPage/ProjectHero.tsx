import { PROJECT_DETAIL_DATA } from '../../data/projectData'

export function ProjectHero() {
  const { hero } = PROJECT_DETAIL_DATA
  return (
    <header className="mb-12">
      <div className="flex flex-col gap-2">
        <span className="text-primary font-headline tracking-widest uppercase text-xs font-bold">
          {hero.tag}
        </span>
        <h1 className="text-5xl md:text-6xl font-headline font-bold text-foreground tracking-tighter">
          {hero.title}
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed">
          {hero.description}
        </p>
        <div className="mt-6">
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-full font-headline font-bold text-lg hover:brightness-110 transition-all neon-glow-primary active:scale-95">
            Back this project
          </button>
        </div>
      </div>
    </header>
  )
}
