import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "../../_components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarImage } from "../../_components/ui/avatar";
import { PageContainer, PageSectionTitle } from "@/app/_components/ui/page";
import { Separator } from "../../_components/ui/separator";
import Footer from "@/app/_components/footer";
import { ServiceItem } from "../../_components/service-item";
import { PhoneItem } from "../../_components/phone-item";

const BarbershopPage = async (props: PageProps<"/barbershops/[id]">) => {
  const { id } = await props.params;
  const barbershop = await prisma.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        <Button
          asChild
          variant="default"
          size="icon"
          className="bg-background text-foreground hover:bg-primary hover:text-background absolute top-4 left-4 cursor-pointer rounded-full"
        >
          <Link href="/">
            <ChevronLeft className="h-6 w-6" />
          </Link>
        </Button>
      </div>
      <div className="bg-background relative z-10 -mt-6 rounded-t-3xl p-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={barbershop.imageUrl} />
            </Avatar>
            <p className="text-xl font-bold">{barbershop.name}</p>
          </div>
          <p className="text-muted-foreground text-xs">{barbershop.address}</p>
        </div>
      </div>
      <Separator className="bg-zinc-100" />
      <PageContainer>
        <PageSectionTitle>Sobre nós</PageSectionTitle>
        <p>{barbershop.description}</p>
      </PageContainer>
      <Separator className="bg-zinc-100" />
      <div className="space-y-3 p-5">
        <PageSectionTitle>Serviços</PageSectionTitle>
        {barbershop.services.map((service) => (
          <ServiceItem key={service.id} service={{ ...service, barbershop }} />
        ))}
      </div>
      <Separator className="bg-zinc-100" />
      <PageContainer>
        <PageSectionTitle>Contato</PageSectionTitle>

        <div className="flex w-full flex-col gap-3">
          {barbershop.phones.map((phone, index) => (
            <PhoneItem key={index} phone={phone} />
          ))}
        </div>
      </PageContainer>
      <Footer />
    </main>
  );
};

export default BarbershopPage;
