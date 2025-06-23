
import HeroSection from "@/components/sections/HeroSection";
// import AboutSection from "@/components/sections/AboutSection";
// import ContactSection from "@/components/sections/ContactSection";
// import Footer from "@/components/layout/Footer";
// Use the enhanced version
// import ServicesSection from "@/components/sections/ServicesSection";
import SkillsSection from "@/components/sections/SkillsSection";
// import TimelineSection from "@/components/sections/TimelineSection";
// import dynamic from "next/dynamic";

export default function Home() {
  // const ProjectsSection = dynamic(() => import('@/components/sections/ProjectSection'), {
  //   loading: () => <div className="h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
  // })

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full viewport with proper navigation spacing */}
      <section id='home' className="relative min-h-screen pt-16 sm:pt-16 md:pt-20 lg:pt-8">
        <HeroSection />
      </section>

      {/* About Section */}
      {/* <section id='about' className="relative">
        <AboutSection />
      </section> */}

      {/* Skills Section */}
      <section id='skills' className="relative">
        <SkillsSection />
      </section>

      {/* Projects Section */}
      {/* <section id='projects' className="relative">
        <ProjectsSection />
      </section> */}

      {/* Experience/Timeline Section */}
      {/* <section id='experience' className="relative">
        <TimelineSection />
      </section>
      <ServicesSection/> */}

      {/* Contact Section */}
      {/* <section id='contact' className="relative">
        <ContactSection />
      </section> */}

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
