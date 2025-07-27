import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { UrlObject } from "url";

const BLUR_FADE_DELAY = 0.01;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh]">
      <section id="hero">
        <div className="mx-auto w-full max-w-3xl space-y-8">
          <div className="gap-2 flex justify-between flex-col-reverse md:flex-row">
            <div className="justify-center flex-col flex flex-1 space-y-1.5">
              {/* <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className=""
                yOffset={8}
                text={}
              /> */}
              <p className="mx-auto md:mx-0 text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none">
                Hi, I&apos;m {DATA.name} 👋
              </p>
              <Markdown className="text-center md:text-start max-w-[600px] text-pretty font-sans md:text-lg">
                {DATA.description}
              </Markdown>
            </div>
            <div className="relative size-36 mx-auto">
              {/* Professional tech visual */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 backdrop-blur-sm shadow-2xl"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-500/20 animate-pulse"></div>
              
              {/* Modern code symbol */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <div className="w-16 h-16 border-2 border-blue-500/60 rounded-lg rotate-45 animate-pulse"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-blue-400 font-mono text-2xl font-bold">
                    &lt;/&gt;
                  </div>
                </div>
              </div>
              
              {/* Subtle accent elements */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500/60 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-cyan-500/60 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              
              {/* Professional glow */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>
      <section id="about" className="pt-6">
        <h2 className="text-xl font-bold">About</h2>
        {/* <BlurFade delay={BLUR_FADE_DELAY}> */}
        <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
          {DATA.summary}
        </Markdown>
        {/* </BlurFade> */}
      </section>
      <section id="skills" className="pt-6">
        <div className="flex min-h-0 flex-col gap-y-6">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 bg-clip-text text-transparent">
                Skills & Technologies
              </h2>
              <p className="text-muted-foreground text-sm">
                Technologies I work with to build amazing applications
              </p>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY + 0.1}>
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {DATA.skills.map((skill, id) => (
                <div
                  key={skill}
                  className="group relative"
                  style={{ animationDelay: `${id * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-cyan-400/20 to-blue-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <Badge 
                    className="relative bg-background/80 backdrop-blur-sm border border-border/50 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 text-sm font-medium px-4 py-2 cursor-default group-hover:scale-105"
                    variant="outline"
                  >
                    {skill}
                  </Badge>
                </div>
              ))}
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="projects" className="pt-6">
        <div className="space-y-8 w-full">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-xl font-bold tracking-tighter sm:text-3xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground text-sm/relaxed xl:text-base/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications. Here are a few of my
                  favorites.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="leetcode" className="pt-6">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">LeetCode</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="flex items-center justify-between p-4 bg-background/30 border border-border/50 rounded-lg hover:border-blue-500/50 transition-all duration-300">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                  <span className="text-white font-bold text-sm">LC</span>
                </div>
                <div>
                  <h3 className="font-medium">@{DATA.leetcode.username}</h3>
                  <p className="text-muted-foreground text-xs">Problem-solving practice</p>
                </div>
              </div>
              <Link 
                href={DATA.leetcode.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 text-sm font-medium transition-colors duration-200"
              >
                View Profile →
              </Link>
            </div>
          </BlurFade>
        </div>
      </section>
      <section id="education" className="pt-6">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 7}>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          {DATA.education.map((education, id) => (
            <BlurFade
              key={education.school}
              delay={BLUR_FADE_DELAY * 8 + id * 0.05}
            >
              <ResumeCard
                key={education.school}
                href={education.href}
                icon={education.icon}
                logoUrl={education.logoUrl}
                altText={education.school}
                title={education.school}
                subtitle={education.degree}
                period={`${education.start} - ${education.end}`}
              />
            </BlurFade>
          ))}
        </div>
      </section>
      {/* <section id="hackathons" className="pt-6">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Hackathons
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like building things
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  During my time in university, I attended{" "}
                  {DATA.hackathons.length}+ hackathons. People from around the
                  country would come together and build incredible things in 2-3
                  days. It was eye-opening to see the endless possibilities
                  brought to life by a group of motivated and passionate
                  individuals.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
              {DATA.hackathons.map((project, id) => (
                <BlurFade
                  key={project.title + project.dates}
                  delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                >
                  <HackathonCard
                    title={project.title}
                    description={project.description}
                    location={project.location}
                    dates={project.dates}
                    image={project.image}
                    links={project.links}
                  />
                </BlurFade>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section> */}
      <section id="contact" className="pt-6">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="space-y-7">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Contact
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Get in Touch
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;m always open to new opportunities and collaborations.
                  Feel free to reach out to me if you have any questions or just
                  want to chat.
                </p>
              </div>
              <div className="flex justify-center">
                <BlurFade delay={0.1} inView>
                  <div className="flex gap-5 flex-wrap">
                    {Object.entries(DATA.contact.social)
                      .filter(([_, social]) => social.contact)
                      .map(([name, social], index) => (
                        <>
                          <Tooltip key={index}>
                            <TooltipTrigger asChild>
                              <Link href={social.url as unknown as UrlObject}>
                                <social.icon className="size-7" />
                              </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </>
                      ))}
                  </div>
                </BlurFade>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
