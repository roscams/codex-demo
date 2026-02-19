import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hln.be' },
    update: {},
    create: {
      email: 'admin@hln.be',
      password: 'admin123', // In production, hash this!
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  const journalist = await prisma.user.upsert({
    where: { email: 'journalist@hln.be' },
    update: {},
    create: {
      email: 'journalist@hln.be',
      password: 'journalist123',
      name: 'Jan De Schrijver',
      role: 'JOURNALIST',
    },
  });

  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'nieuws' },
      update: {},
      create: { name: 'Nieuws', slug: 'nieuws', color: '#EF4444', description: 'Algemeen nieuws' },
    }),
    prisma.category.upsert({
      where: { slug: 'sport' },
      update: {},
      create: { name: 'Sport', slug: 'sport', color: '#22C55E', description: 'Sportnieuws' },
    }),
    prisma.category.upsert({
      where: { slug: 'showbizz' },
      update: {},
      create: { name: 'Showbizz', slug: 'showbizz', color: '#A855F7', description: 'Entertainment nieuws' },
    }),
    prisma.category.upsert({
      where: { slug: 'binnenland' },
      update: {},
      create: { name: 'Binnenland', slug: 'binnenland', color: '#3B82F6', description: 'Belgisch nieuws' },
    }),
    prisma.category.upsert({
      where: { slug: 'buitenland' },
      update: {},
      create: { name: 'Buitenland', slug: 'buitenland', color: '#F59E0B', description: 'Internationaal nieuws' },
    }),
    prisma.category.upsert({
      where: { slug: 'economie' },
      update: {},
      create: { name: 'Economie', slug: 'economie', color: '#6366F1', description: 'Economisch nieuws' },
    }),
  ]);

  // Create tags
  const tags = await Promise.all([
    prisma.tag.upsert({ where: { slug: 'breaking' }, update: {}, create: { name: 'Breaking', slug: 'breaking' } }),
    prisma.tag.upsert({ where: { slug: 'politiek' }, update: {}, create: { name: 'Politiek', slug: 'politiek' } }),
    prisma.tag.upsert({ where: { slug: 'voetbal' }, update: {}, create: { name: 'Voetbal', slug: 'voetbal' } }),
    prisma.tag.upsert({ where: { slug: 'wielrennen' }, update: {}, create: { name: 'Wielrennen', slug: 'wielrennen' } }),
    prisma.tag.upsert({ where: { slug: 'tv' }, update: {}, create: { name: 'TV', slug: 'tv' } }),
  ]);

  // Create sample articles
  const articles = [
    {
      title: 'Regering bereikt akkoord over nieuwe begroting na marathonvergadering',
      slug: 'regering-bereikt-akkoord-begroting',
      excerpt: 'Na meer dan 48 uur onderhandelen hebben de coalitiepartners eindelijk een akkoord bereikt over de federale begroting.',
      content: `<p>Na meer dan 48 uur onderhandelen hebben de coalitiepartners eindelijk een akkoord bereikt over de federale begroting. De onderhandelingen waren moeizaam, maar uiteindelijk kon premier De Croo een doorbraak aankondigen.</p>
      <p>"Dit was geen gemakkelijke oefening", aldus de premier op een persconferentie. "Maar we hebben een evenwichtig akkoord bereikt dat goed is voor alle Belgen."</p>
      <h2>Belangrijkste maatregelen</h2>
      <p>Het akkoord bevat onder meer een verhoging van het minimumloon, extra investeringen in klimaat en een hervorming van de pensioenen.</p>`,
      categoryId: categories[0].id,
      authorId: journalist.id,
      featured: true,
      breaking: true,
      image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800',
      readingTime: 4,
      status: 'PUBLISHED',
      publishedAt: new Date(),
    },
    {
      title: 'Club Brugge wint met ruime cijfers van Anderlecht in topper',
      slug: 'club-brugge-wint-topper-anderlecht',
      excerpt: 'Club Brugge heeft de topper tegen Anderlecht met 3-0 gewonnen. Doelpunten van Vanaken, Jutgla en Lang bezorgden blauw-zwart de zege.',
      content: `<p>Club Brugge heeft de topper tegen Anderlecht met 3-0 gewonnen. Het was een eenzijdige wedstrijd waarin de thuisploeg duidelijk de betere was.</p>
      <p>Hans Vanaken opende de score in de eerste helft met een knappe vrije trap. Na de rust maakten Jutgla en Lang de buit helemaal compleet.</p>`,
      categoryId: categories[1].id,
      authorId: journalist.id,
      featured: true,
      image: 'https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=800',
      readingTime: 3,
      status: 'PUBLISHED',
      publishedAt: new Date(Date.now() - 3600000),
    },
    {
      title: 'K3 kondigt nieuwe tournee aan voor 2025',
      slug: 'k3-nieuwe-tournee-2025',
      excerpt: 'De populaire meidengroep K3 gaat weer op tournee! In het voorjaar van 2025 staan er twintig shows gepland in België en Nederland.',
      content: `<p>K3 heeft vandaag aangekondigd dat ze in het voorjaar van 2025 opnieuw op tournee gaan. De drie dames - Hanne, Marthe en Julia - zullen twintig shows spelen verspreid over België en Nederland.</p>
      <p>"We kunnen niet wachten om onze fans weer te zien", aldus Hanne. "De nieuwe show wordt spectaculairder dan ooit!"</p>`,
      categoryId: categories[2].id,
      authorId: journalist.id,
      featured: false,
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
      readingTime: 2,
      status: 'PUBLISHED',
      publishedAt: new Date(Date.now() - 7200000),
    },
    {
      title: 'Nieuwe snelheidscontroles op Antwerpse Ring: duizenden boetes uitgedeeld',
      slug: 'snelheidscontroles-antwerpse-ring',
      excerpt: 'De politie heeft afgelopen weekend meer dan 2.000 snelheidsovertredingen vastgesteld op de Antwerpse Ring.',
      content: `<p>De politie heeft afgelopen weekend grootschalige snelheidscontroles uitgevoerd op de Antwerpse Ring. Daarbij werden meer dan 2.000 overtredingen vastgesteld.</p>
      <p>De snelste overtreder reed maar liefst 187 km/u waar 100 km/u is toegestaan. Zijn rijbewijs werd onmiddellijk ingetrokken.</p>`,
      categoryId: categories[3].id,
      authorId: journalist.id,
      featured: false,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800',
      readingTime: 3,
      status: 'PUBLISHED',
      publishedAt: new Date(Date.now() - 10800000),
    },
    {
      title: 'Storm verwacht in België: KMI waarschuwt voor zware windstoten',
      slug: 'storm-verwacht-belgie-kmi-waarschuwing',
      excerpt: 'Het KMI heeft code oranje afgekondigd voor heel België. Morgen worden windstoten tot 120 km/u verwacht.',
      content: `<p>Het Koninklijk Meteorologisch Instituut (KMI) waarschuwt voor een zware storm die morgen over België trekt. Er is code oranje van kracht voor het hele land.</p>
      <p>Windstoten kunnen oplopen tot 120 km/u, vooral aan de kust en in het binnenland. Het KMI raadt aan om losse voorwerpen vast te zetten en niet de weg op te gaan tenzij noodzakelijk.</p>`,
      categoryId: categories[0].id,
      authorId: admin.id,
      featured: true,
      breaking: true,
      image: 'https://images.unsplash.com/photo-1527482937786-6f7be5f99f5a?w=800',
      readingTime: 2,
      status: 'PUBLISHED',
      publishedAt: new Date(Date.now() - 1800000),
    },
    {
      title: 'Europese Centrale Bank verlaagt rente: goed nieuws voor huizenkopers',
      slug: 'ecb-verlaagt-rente-huizenkopers',
      excerpt: 'De ECB heeft besloten de rente met 0,25 procentpunt te verlagen. Dit is goed nieuws voor wie een hypotheek wil afsluiten.',
      content: `<p>De Europese Centrale Bank heeft vandaag besloten om de basisrente te verlagen met 0,25 procentpunt. Dit is de eerste renteverlaging in meer dan twee jaar.</p>
      <p>Voor huizenkopers betekent dit dat hypotheekleningen weer iets goedkoper worden. Economen verwachten dat de woningmarkt hierdoor een impuls krijgt.</p>`,
      categoryId: categories[5].id,
      authorId: journalist.id,
      featured: false,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
      readingTime: 4,
      status: 'PUBLISHED',
      publishedAt: new Date(Date.now() - 14400000),
    },
  ];

  for (const articleData of articles) {
    await prisma.article.upsert({
      where: { slug: articleData.slug },
      update: {},
      create: articleData,
    });
  }

  console.log('Database seeded successfully!');
  console.log(`Created ${categories.length} categories`);
  console.log(`Created ${tags.length} tags`);
  console.log(`Created ${articles.length} articles`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
