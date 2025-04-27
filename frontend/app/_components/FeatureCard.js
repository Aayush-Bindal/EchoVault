import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function FeatureCard({ header, content }) {
  return (
    <div className="mt-10">
      <Card className="border-[1px] border-[#0a0519] bg-gradient-to-b from-[#11092a] from-55% to-indigo-900 w-[400px] text-[#ddd5f6] py-4">
        <CardHeader>
          <p className="text-2xl text-sky-300 font-bold">{header}</p>
        </CardHeader>
        <CardContent>
          <p className="text-wrap break-words text-lg">{content}</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default FeatureCard;
