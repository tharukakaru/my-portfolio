import LuxuryNavigation from "@/components/LuxuryNavigation";
import LuxuryHeroSection from "@/components/LuxuryHeroSection";
import LuxuryAboutSection from "@/components/LuxuryAboutSection";
import LuxuryExperienceSection from "@/components/LuxuryExperienceSection";
import LuxuryProjectsSection from "@/components/LuxuryProjectsSection";
import LuxurySkillsSection from "@/components/LuxurySkillsSection";
import LuxuryTechStripSection from "@/components/LuxuryTechStripSection";
import LuxuryEducationSection from "@/components/LuxuryEducationSection";
import LuxuryContactSection from "@/components/LuxuryContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <LuxuryNavigation />
      <LuxuryHeroSection />
      <LuxuryAboutSection />
      <LuxuryExperienceSection />
      <LuxuryProjectsSection />
      <LuxurySkillsSection />
      <LuxuryTechStripSection />
      <LuxuryEducationSection />
      <LuxuryContactSection />
    </div>
  );
};

export default Index;