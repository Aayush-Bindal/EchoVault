import { Badge } from "@/components/ui/badge";
import Navbar from "./_components/Navbar";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import FeatureCard from "./_components/FeatureCard";
import Link from "next/link";

function page() {
  return (
    <div className="text-lg">
      <div className="pt-48 flex flex-col items-center">
        <Badge
          variant="outline"
          className="w-max text-white border-[#d1d5db] rounded-xl mb-3 bg-white/5 font-thin lg:text-lg md:text-lg"
        >
          ✨ Helps decode what you feel!
        </Badge>

        <p className="pt font-bold lg:text-8xl text-7xl text-center px-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
          Your Voice, Your Story
        </p>
        <p className="text-center px-12 text-[#d1d5db] pt-3 lg:text-lg lg:p-7">
          Transform your spoken thoughts into emotional insights with Al-powered
          journaling
        </p>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-4 mt-10">
          <Button className="py-6 px-8 w-52 text-lg" asChild>
            <Link href="/journaling">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="outline"
            className="py-6 px-12 w-52 text-lg bg-transparent border-[1px] border-primary text-white hover:bg-primary hover:text-white"
          >
            Learn More
          </Button>
        </div>

        <div className="mt-40 grid grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-3 mb-32">
          <FeatureCard
            header={"Voice recording"}
            content={
              "Simply speak your thoughts and let EchoVault transform them into written journal entries."
            }
          />
          <FeatureCard
            header={"Emotion Analysis"}
            content={
              "Our AI detects the emotions in your voice, helping you understand your emotional patterns."
            }
          />
          <FeatureCard
            header={"Voice recording"}
            content={
              "Simply speak your thoughts and let EchoVault transform them into written journal entries."
            }
          />
        </div>
      </div>
    </div>
  );
}

export default page;
