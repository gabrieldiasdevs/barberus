import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "../../_components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const BarbershopPage = async (props: PageProps<"/barbershops/[id]">) => {
  const { id } = await props.params;
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
  });
  if (!barbershop) {
    notFound();
  }
  return (
    <main>
      <div className="relative h-[297px] w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />
        <Button
          asChild
          variant="default"
          size="icon"
          className="bg-background text-foreground hover:bg-primary/80 hover:text-background absolute top-4 left-4 cursor-pointer rounded-full"
        >
          <Link href="/">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default BarbershopPage;
