import { Hero } from "@/components/sections/Hero";
import { VerticalsGrid } from "@/components/sections/VerticalsGrid";
import { ServicesBento } from "@/components/sections/ServicesBento";
import { Philosophy } from "@/components/sections/Philosophy";
import { ContactForm } from "@/components/sections/ContactForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <VerticalsGrid />
      <ServicesBento />
      <Philosophy />
      <ContactForm />
    </>
  );
}
