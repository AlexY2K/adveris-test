import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Articles } from "@/components/sections/Articles";
import { ContentSection } from "@/components/sections/ContentSection";
import { Hero } from "@/components/sections/Hero";
import { Statistics } from "@/components/sections/Statistics";

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative">
        <Hero />
        <ContentSection />
        <Articles />
        <Statistics />
      </main>
      <Footer />
    </>
  );
}
