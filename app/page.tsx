import Image from "next/image";
import Header from "./_components/header";
import SearchInput from "./_components/search-input";
import Banner from "../public/banner.png";
import { prisma } from "@/lib/prisma";
import BarbershopItem from "./_components/barbershop-items";
import Footer from "./_components/footer";
import {
  PageContainer,
  PageSectionTitle,
  PageSection,
  PageSectionScroller
} from "./_components/ui/page";

const Home = async () => {
  const recommendedBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  });
  const popularBarbershops = await prisma.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });
  return (
    <main>
      <Header />
      <PageContainer>
        <SearchInput />
        <Image
          src={Banner}
          alt="Agende agora!"
          sizes="100vw"
          className="h-auto w-full"
        />
        <PageSection>
          <PageSectionTitle>Recomendados</PageSectionTitle>
          <PageSectionScroller>
            {recommendedBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>

        <PageSection>
          <PageSectionTitle>Populares</PageSectionTitle>
          <PageSectionScroller>
            {popularBarbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </PageSectionScroller>
        </PageSection>
      </PageContainer>
      <Footer />
    </main>
  );
};

export default Home;
