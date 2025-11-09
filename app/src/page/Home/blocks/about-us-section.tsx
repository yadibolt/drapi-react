import { MedalIcon, SparklesIcon, StarIcon, TargetIcon } from "lucide-react";
import AboutUs from "../components/about-us";

const stats = [
  {
    icon: SparklesIcon,
    value: "20+",
    description: "Years of Experience",
  },
  {
    icon: TargetIcon,
    value: "70+",
    description: "Successful Projects",
  },
  {
    icon: StarIcon,
    value: "550+",
    description: "Customer Reviews",
  },
  {
    icon: MedalIcon,
    value: "25",
    description: "Achieve Awards",
  },
];

const AboutUsSection = () => {
  return <AboutUs stats={stats} />;
};

export default AboutUsSection;
