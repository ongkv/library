import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Automatically run on database migration
const seedUsers = async () => {
  const count = await prisma.user.count();
  if (count === 0) {
    await prisma.user.createMany({
      data: [
        {
          f_name: "John",
          l_name: "Doe",
          email: "john_doe@email.com",
          phone: "+6512345678",
          password:
            "$2a$10$NaNJn4Vk/cCXf0QIW99AtOKCyBXlIPhTuqz6sLocUWsqcTYBojYIm",
          address: "Fake Address, Singapore 123456",
        },
      ],
    });
  }
};

const seedBookFormats = async () => {
  const count = await prisma.bookFormat.count();
  if (count === 0) {
    await prisma.bookFormat.createMany({
      data: [
        {
          id: 1,
          name: "Paperback",
        },
        {
          id: 2,
          name: "Hardcover",
        },
      ],
    });
  }
};

const seedBooks = async () => {
  const count = await prisma.book.count();
  if (count === 0) {
    await prisma.book.createMany({
      data: [
        {
          book_format_id: 1,
          title: "Book title",
          author: "Book author",
          year: new Date("2026-01-01"),
          isbn: "978-3-16-148410-0",
          description: "Paperback book",
          page_count: 300,
        },
        {
          book_format_id: 2,
          title: "Book title",
          author: "Book author",
          year: new Date("2026-01-01"),
          isbn: "978-3-16-148410-1",
          description: "Hardcover book",
          page_count: 300,
        },
      ],
    });
  }
};

// Run seed if needed
await seedUsers();
await seedBookFormats();
await seedBooks();
