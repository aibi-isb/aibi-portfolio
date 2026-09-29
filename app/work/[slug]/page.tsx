import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { getProjectBySlug, projects } from '../../../src/data/projects';
import { projectStatuses } from '../../../src/content/project-status';
import { createPageMetadata } from '../../../src/lib/metadata';
import { buttonVariants } from '../../../src/components/primitives/Button';
import { GlassSurface } from '../../../src/components/primitives/GlassSurface';

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return createPageMetadata(
      'Project not found',
      'This project page is not available.',
      true,
    );
  }

  return createPageMetadata(
    project.title,
    project.shortDescription,
    project.contentStatus !== 'approved',
  );
}

function CaseStudySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-border py-8">
      <h2 className="display-lg mb-5">{title}</h2>
      {children}
    </section>
  );
}

function ProjectMedia({ media }: { media: (typeof projects)[number]['media'][number] }) {
  if (media.status !== 'approved' || !media.src) return null;

  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="relative" style={{ aspectRatio: `${media.width} / ${media.height}` }}>
        {media.kind === 'video' ? (
          <video
            src={media.src}
            controls
            preload="none"
            aria-label={media.alt || media.label}
            className="h-full w-full object-contain"
          />
        ) : (
          <img
            src={media.src}
            width={media.width}
            height={media.height}
            alt={media.decorative ? '' : media.alt}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      {media.caption && <figcaption className="p-4 text-sm text-muted-foreground">{media.caption}</figcaption>}
    </figure>
  );
}

export default async function WorkSlugPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const status = projectStatuses[project.status];
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const previous = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const next = projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;
  const approvedMedia = project.media.filter(
    (media) => media.status === 'approved' && media.src,
  );

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className={`relative overflow-hidden border-b border-border bg-gradient-to-br ${project.gradientClass}`}>
        <div className="section-shell relative z-10 py-28 md:py-36">
          <Link href="/" className={buttonVariants({ variant: 'textArrow', size: 'small', className: 'mb-10' })}>
            Back to portfolio
          </Link>
          <p className="eyebrow">{project.category}</p>
          <h1 className="display-xl mb-4 max-w-4xl">{project.title}</h1>
          <p className="text-lg text-foreground/70 max-w-2xl leading-relaxed">{project.shortDescription}</p>
          <GlassSurface variant="strong" className="mt-10 grid gap-5 p-5 sm:grid-cols-3">
            <div>
              <p className="eyebrow mb-1">Role</p>
              <p>{project.role}</p>
            </div>
            <div>
              <p className="eyebrow mb-1">Timeline</p>
              <p>{project.dates}</p>
            </div>
            <div>
              <p className="eyebrow mb-1">Status</p>
              <span className={`status-badge ${status.cls}`}>{status.label}</span>
            </div>
          </GlassSurface>
        </div>
      </header>

      <article className="section-shell max-w-4xl py-10 md:py-16">
        {approvedMedia.length > 0 && (
          <div className="mb-10 grid gap-6">
            {approvedMedia.map((media) => <ProjectMedia key={media.id} media={media} />)}
          </div>
        )}

        {project.challenge && (
          <CaseStudySection title="The challenge">
            <p className="text-foreground/75 leading-relaxed">{project.challenge}</p>
          </CaseStudySection>
        )}

        <CaseStudySection title="Contribution">
          <ul className="grid gap-3">
            {project.contribution.map((item) => (
              <li key={item} className="flex gap-3 text-foreground/75 leading-relaxed">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Tools and technologies">
          <ul className="flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <li key={technology} className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground">
                {technology}
              </li>
            ))}
          </ul>
        </CaseStudySection>

        {project.personalOwnership && (
          <CaseStudySection title="What I personally owned">
            <p className="text-foreground/75 leading-relaxed">{project.personalOwnership}</p>
          </CaseStudySection>
        )}

        {project.teamContributions && project.teamContributions.length > 0 && (
          <CaseStudySection title="Team contributions">
            <ul className="grid gap-2 text-foreground/75">
              {project.teamContributions.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CaseStudySection>
        )}

        {project.aiAssisted && (
          <CaseStudySection title="AI-assisted workflow">
            <GlassSurface variant="standard" className="p-5 text-foreground/75 leading-relaxed">
              {project.aiAssisted}
            </GlassSurface>
          </CaseStudySection>
        )}

        {project.constraints && project.constraints.length > 0 && (
          <CaseStudySection title="Constraints">
            <ul className="grid gap-2 text-foreground/75">
              {project.constraints.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CaseStudySection>
        )}

        {project.testing && project.testing.length > 0 && (
          <CaseStudySection title="Testing and feedback">
            <ul className="grid gap-2 text-foreground/75">
              {project.testing.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </CaseStudySection>
        )}

        {project.outcome && (
          <CaseStudySection title="Outcome">
            <p className="text-foreground/75 leading-relaxed">{project.outcome}</p>
          </CaseStudySection>
        )}

        {project.lessons && (
          <CaseStudySection title="Lessons and next steps">
            <p className="text-foreground/75 leading-relaxed">{project.lessons}</p>
          </CaseStudySection>
        )}

        {project.process?.map((section) => (
          <CaseStudySection key={section.heading} title={section.heading}>
            {section.type === 'text' && section.body.map((paragraph) => (
              <p key={paragraph} className="mb-3 text-foreground/75 leading-relaxed">{paragraph}</p>
            ))}
            {section.type === 'process' && (
              <ol className="grid gap-5">
                {section.steps.map((step) => (
                  <li key={step.title}>
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="text-foreground/70">{step.description}</p>
                  </li>
                ))}
              </ol>
            )}
            {section.type === 'gallery' && (
              <div className="grid gap-6">
                {section.media.map((media) => <ProjectMedia key={media.id} media={media} />)}
              </div>
            )}
          </CaseStudySection>
        ))}
      </article>

      {(previous || next) && (
        <nav className="border-t border-border py-8" aria-label="Project navigation">
          <div className="section-shell flex justify-between gap-6">
            {previous ? (
              <Link href={`/work/${previous.slug}`} className={buttonVariants({ variant: 'textArrow', size: 'small' })}>
                Previous: {previous.title}
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/work/${next.slug}`} className={buttonVariants({ variant: 'textArrow', size: 'small' })}>
                Next: {next.title}
              </Link>
            )}
          </div>
        </nav>
      )}
    </main>
  );
}
