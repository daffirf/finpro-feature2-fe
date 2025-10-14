import { Card, CardContent, CardFooter } from "@/components/Card";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { MapPin, Calendar, Users, Star } from "lucide-react";
import Image from "next/image";
import { Accommodation } from "@/data/accommodations";

interface AccommodationCardProps {
  accommodation: Accommodation;
}

export default function AccommodationCard({ accommodation }: AccommodationCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getLowestPrice = () => {
    if (!accommodation.roomTypes || accommodation.roomTypes.length === 0) return 0;
    return Math.min(...accommodation.roomTypes.map(room => room.price));
  };

  return (
    <Card className="overflow-hidden bg-white border hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group rounded-xl">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={(accommodation as unknown as { image?: string }).image || "/window.svg"}
          alt={accommodation.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {(accommodation as unknown as { isFeatured?: boolean }).isFeatured && (
          <Badge className="absolute top-2 left-2" variant="info">
            Unggulan
          </Badge>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">
            {accommodation.name}
          </h3>
          <Badge variant="info" className="ml-2">
            {accommodation.category}
          </Badge>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {accommodation.description}
        </p>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              Check-in: {new Date(accommodation.checkInDate).toLocaleDateString()} • 
              Check-out: {new Date(accommodation.checkOutDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{accommodation.location}</span>
          </div>
          {(accommodation as unknown as { totalGuests?: number }).totalGuests && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{(accommodation as unknown as { totalGuests?: number }).totalGuests} tamu</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{accommodation.averageRating || 0} ({accommodation.totalReviews || 0} ulasan)</span>
          </div>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="p-5 pt-0">
        <div className="flex justify-between items-center w-full">
          <div className="text-lg font-bold text-primary">
            {`${formatPrice(getLowestPrice())} / malam`}
          </div>
          <Button size="sm" variant="primary" className="hover:opacity-90 active:scale-[0.98]">
            Lihat Detail
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
