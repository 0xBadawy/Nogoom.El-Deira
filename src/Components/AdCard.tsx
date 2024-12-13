import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";

interface Ad {
  id: number;
  title: string;
  description: string;
  images: string[];
  category: string;
  startDate: string;
  endDate: string;
}

interface AdCardProps {
  ad: Ad;
}

export default function AdCard({ ad }: AdCardProps) {
  return (
    <Link to={`/ad/${ad.id}`} className="block">
      <Card className="h-full transition-all hover:shadow-lg">
        <CardHeader className="p-0">
          <img
            className="w-full h-48 object-cover rounded-t-lg"
            src={ad.images[0]}
            alt={ad.title}
          />
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl mb-2">{ad.title}</CardTitle>
          <p className="text-muted-foreground">
            {ad.description.substring(0, 100)}...
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 p-4">
          <Badge variant="secondary">{ad.category}</Badge>
          <Badge variant="outline">
            {new Date(ad.startDate).toLocaleDateString()} -{" "}
            {new Date(ad.endDate).toLocaleDateString()}
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
