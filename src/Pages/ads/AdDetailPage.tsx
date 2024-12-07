import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface Ad {
  id: number;
  title: string;
  description: string;
  images: string[];
  category: string;
  startDate: string;
  endDate: string;
  governorates: string[];
  links: { url: string; region: string }[];
  stars: { Uid: string; name: string }[];
  video: string;
  views: number;
}

export default function AdDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [ad, setAd] = useState<Ad | null>(null);

  useEffect(() => {
    // In a real application, you would fetch the data from an API
    // For this example, we'll use mock data
    const mockData: Ad = {
      id: 13,
      category: "home_supplies",
      description: "Pariatur Libero vol",
      endDate: "2008-10-21",
      governorates: [
        "مكة المكرمة",
        "جدة",
        "الطائف",
        "القنفذة",
        "الليث",
        "الخرمة",
        "رنية",
        "تربة",
        "الكامل",
        "خليص",
      ],
      images: [
        "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
      ],
      links: [
        {
          url: "http://localhost:5173/dashboard/createAd",
          region: "مكة المكرمة",
        },
      ],
      stars: [
        { Uid: "E7uCdzY25gTFaN9wSJgQn94LCMr2", name: "Aline Hoover r1" },
        { Uid: "v8VphL7Gg1TsXKSBF5UreVTGuoG2", name: "Reece Cabrera" },
        { Uid: "wDM2CTFxVngIyNFlk0jHLNTJ2zH3", name: "Ivory Miranda" },
      ],
      startDate: "1979-04-05",
      title: "حملة",
      video:
        "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fvideos%2FiPhone-14-Plus-localhost-yxv431tvgx2n68.mp4?alt=media&token=ada85fcf-f16d-417e-822c-72ca2bea6777",
      views: 0,
    };

    setAd(mockData);
  }, [id]);

  if (!ad) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/">
        <Button variant="outline" className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Ads
        </Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{ad.title}</CardTitle>
          <Badge className="mt-2">{ad.category}</Badge>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src={ad.images[0]}
                alt={ad.title}
                className="w-full rounded-lg shadow-lg"
              />
              {ad.video && (
                <video controls className="w-full mt-4 rounded-lg shadow-lg">
                  <source src={ad.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            <div>
              <p className="text-xl mb-4">{ad.description}</p>
              <div className="space-y-2">
                <p>
                  <strong>Start Date:</strong>{" "}
                  {new Date(ad.startDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>End Date:</strong>{" "}
                  {new Date(ad.endDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Views:</strong> {ad.views}
                </p>
              </div>
              <Separator className="my-4" />
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold mb-2">Governorates:</h2>
                  <div className="flex flex-wrap gap-2">
                    {ad.governorates.map((governorate, index) => (
                      <Badge key={index} variant="secondary">
                        {governorate}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Links:</h2>
                  <ul className="list-disc list-inside">
                    {ad.links.map((link, index) => (
                      <li key={index}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {link.region}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Stars:</h2>
                  <ul className="list-disc list-inside">
                    {ad.stars.map((star, index) => (
                      <li key={index}>{star.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
