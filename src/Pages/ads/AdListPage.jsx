import { useState, useEffect } from "react";
import AdCard from "../../Components/AdCard";
import { Input } from "@/components/ui/input";

export default function AdListPage() {
  const [ads, setAds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // In a real application, you would fetch the data from an API
    // For this example, we'll use a mock data
    const mockData = [
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      {
        id: 13,
        category: "home_supplies",
        description: "Pariatur Libero vol",
        endDate: "2008-10-21",
        images: [
          "https://firebasestorage.googleapis.com/v0/b/nogoomel-deira.firebasestorage.app/o/mohamedbadawysayed02%2Fimages%2FCardArtboard-1-copy-3.png?alt=media&token=5d27b60e-1266-4dbc-a00c-c48bf7bcf5e3",
        ],
        startDate: "1979-04-05",
        title: "حملة",
      },
      // Add more mock data here...
    ];

    setAds(mockData);
  }, []);

  const filteredAds = ads.filter(
    (ad) =>
      ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Advertisements</h1>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search advertisements..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md mx-auto"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAds.map((ad) => (
          <AdCard key={ad.id} ad={ad} />
        ))}
      </div>
    </div>
  );
}
