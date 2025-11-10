import { BarbershopService } from "../generated/prisma/client";
import Image from "next/image";
import { Badge } from "./ui/badge";

interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <div className="bg-zinc-100 flex items-center gap-4 rounded-lg border-1 p-3">
      <div className="relative h-25 w-25 flex-shrink-0">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex w-full flex-col justify-between">
        <div>
          <h2 className="font-semibold">{service.name}</h2>
          <p className="text-muted-foreground text-sm">{service.description}</p>
        </div>

        <div className="mt-2 flex items-center justify-between">
          <h3 className="font-bold">
            R$ {(service.priceInCents / 100).toFixed(2)}
          </h3>
          <Badge className="w-24 h-8 hover:bg-primary/60 cursor-pointer transition">
            Reservar
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default ServiceItem;
