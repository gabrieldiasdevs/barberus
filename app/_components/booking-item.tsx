"use client";

import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Booking } from "../generated/prisma/client";

interface BookingItemProps {
  booking: {
    id: string;
    date: Date;
    cancelled: boolean | null;
    service: {
      name: string;
      priceInCents: number;
    };
    barbershop: {
      id: string;
      name: string;
      imageUrl: string;
      address: string;
      phones: string[];
    };
  };
}

const getStatus = (booking: Pick<Booking, "date">) => {
  const date = new Date(booking.date);
  const now = new Date();
  return date >= now ? "confirmed" : "finished";
};

const BookingItem = ({ booking }: BookingItemProps) => {
  const status = getStatus(booking);

  return (
    <Card className="flex h-full w-full min-w-full flex-row items-center justify-between p-0">
      <div className="flex flex-1 flex-col gap-4 p-4">
        <Badge
          className={
            status === "confirmed"
              ? "bg-primary/10 text-primary uppercase"
              : "bg-muted text-muted-foreground uppercase"
          }
        >
          {status === "confirmed" ? "Confirmado" : "Finalizado"}
        </Badge>

        <div className="flex flex-col gap-2">
          <p className="font-bold">{booking.service.name}</p>

          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={booking.barbershop.imageUrl} />
            </Avatar>
            <p className="text-sm">{booking.barbershop.name}</p>
          </div>
        </div>
      </div>

      <div className="flex h-full w-[106px] flex-col items-center justify-center border-l py-3">
        <p className="text-xs capitalize">
          {booking.date.toLocaleDateString("pt-BR", { month: "long" })}
        </p>
        <p className="text-2xl">
          {booking.date.toLocaleDateString("pt-BR", { day: "2-digit" })}
        </p>
        <p className="text-xs">
          {booking.date.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </Card>
  );
};

export default BookingItem;
