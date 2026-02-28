import Navbar from "@/components/Home/Navbar";
import Hero from "@/components/Home/Hero";
import FeaturedJobs from "@/components/Home/FeaturedJobs";
import LatestJobs from "@/components/Home/LatestJobs";
import Footer from "@/components/Home/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedJobs />
      <LatestJobs />
    </>
  );
}
