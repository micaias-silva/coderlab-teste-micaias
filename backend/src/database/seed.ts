import { PrismaClient } from '../../prisma/generated/prisma';

const database = new PrismaClient();

async function seed() {
  const seedCategories = [
    {
      id: 'cd7ae3bd-5e3d-4110-bd0d-e2a41a999919',
      name: 'Hardware',
      parentId: null,
    },
    {
      id: '20593d48-5e34-4ec9-9cd4-2c6e278aae9e',
      name: 'Placas-Mãe',
      parentId: 'cd7ae3bd-5e3d-4110-bd0d-e2a41a999919',
    },
    {
      id: '96cfe444-9802-4edd-8b58-7d4d14f5c760',
      name: 'Processadores',
      parentId: 'cd7ae3bd-5e3d-4110-bd0d-e2a41a999919',
    },
    {
      id: 'ed38101e-e3fe-425b-a814-38f1aca9ac5f',
      name: 'Memórias RAM',
      parentId: 'cd7ae3bd-5e3d-4110-bd0d-e2a41a999919',
    },
    {
      id: 'b044b2f1-e851-40a7-a005-9c5130178b44',
      name: 'Placas de Vídeo',
      parentId: 'cd7ae3bd-5e3d-4110-bd0d-e2a41a999919',
    },
    {
      id: 'bacbf7bf-0f98-4962-987f-e3ffa5717be7',
      name: 'Armazenamento',
      parentId: 'cd7ae3bd-5e3d-4110-bd0d-e2a41a999919',
    },
    {
      id: '71237a02-9cd7-4c1a-b9af-7f72167f76c1',
      name: 'SSDs',
      parentId: 'bacbf7bf-0f98-4962-987f-e3ffa5717be7',
    },
    {
      id: 'f41efd8a-3c39-4f94-a5ec-6cb439d0432e',
      name: 'HDs',
      parentId: 'bacbf7bf-0f98-4962-987f-e3ffa5717be7',
    },
    {
      id: 'a30b66b6-a757-4052-a31f-14db2a2f1579',
      name: 'Gabinetes',
      parentId: 'cd7ae3bd-5e3d-4110-bd0d-e2a41a999919',
    },
    {
      id: 'fde3c394-ab79-4deb-b5b0-98d28a5d6b2f',
      name: 'Fontes de Alimentação',
      parentId: 'cd7ae3bd-5e3d-4110-bd0d-e2a41a999919',
    },
    {
      id: '912fe87b-761f-46fc-bbb5-53c10ca359d6',
      name: 'Coolers e Refrigeração',
      parentId: 'cd7ae3bd-5e3d-4110-bd0d-e2a41a999919',
    },
    {
      id: 'f8110ffb-3b2f-4208-a4bc-08afc6cb2643',
      name: 'Watercoolers',
      parentId: '912fe87b-761f-46fc-bbb5-53c10ca359d6',
    },
    {
      id: 'fa17c6bd-09e8-4140-9fd8-a6214b9d6b6d',
      name: 'Acessórios',
      parentId: 'cd7ae3bd-5e3d-4110-bd0d-e2a41a999919',
    },
    {
      id: '47c6358a-b7dd-4f57-b508-eba5503e9c05',
      name: 'Cabos e Adaptadores',
      parentId: 'fa17c6bd-09e8-4140-9fd8-a6214b9d6b6d',
    },
    {
      id: '6decae29-0553-4597-856e-422ca95433e7',
      name: 'Fans',
      parentId: '912fe87b-761f-46fc-bbb5-53c10ca359d6',
    },
  ];

  console.log("SEEDING... 🌱")

  await database.category.createMany({ data: seedCategories });
}

seed().finally(() => {
    console.log("SEEDED SUCESSESFULLY 🪴")
    database.$disconnect()
}).catch(error => {
    console.log("SEEDING FAILED 🚯")
    console.log(error)
    database.$disconnect()
})