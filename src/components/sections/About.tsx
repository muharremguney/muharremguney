import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section id="about" className="py-20">
      <Container>
        <SectionHeading eyebrow="Hakkımda" title="Kim olduğumu tanıyın" />
        <div className="max-w-3xl space-y-5">
          {profile.about.map((paragraph, index) => (
            <p key={index} className="text-base leading-relaxed text-muted">
              {paragraph}
            </p>
          ))}
        </div>
      </Container>
    </section>
  );
}
