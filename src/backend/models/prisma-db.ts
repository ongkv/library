import { PrismaClient } from "@/generated/prisma/client";
import { LOREM_IPSUM } from "@/lib/helpers/placeholders";
import { BookFormats } from "@/lib/types/BookFormat";

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
          id: BookFormats.Paperback,
          name: `${BookFormats[BookFormats.Paperback]}`,
        },
        {
          id: BookFormats.Hardcover,
          name: `${BookFormats[BookFormats.Hardcover]}`,
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
        // Science Fiction
        {
          book_format_id: BookFormats.Paperback,
          title: "The Stellar Horizon",
          author: "Gene Rodriquez",
          year: new Date("1982-07-08"),
          isbn: "978-3-16-148410-0",
          description: LOREM_IPSUM,
          page_count: 393,
        },
        // Fantasy
        {
          book_format_id: BookFormats.Hardcover,
          title: "Realm",
          author: "Mortimer Hersey",
          year: new Date("1985-01-03"),
          isbn: "978-2-9768-9758-7",
          description: LOREM_IPSUM,
          page_count: 717,
        },
        // Horror
        {
          book_format_id: BookFormats.Paperback,
          title: "Dead In Grave",
          author: "Estelle Fennimore",
          year: new Date("1987-11-13"),
          isbn: "978-5-7591-8307-5",
          description: LOREM_IPSUM,
          page_count: 644,
        },
        // Romance
        {
          book_format_id: BookFormats.Hardcover,
          title: "Dog Beyond Love",
          author: "Jefferson Jacobs",
          year: new Date("2001-02-23"),
          isbn: "978-8-1234-5095-7",
          description: LOREM_IPSUM,
          page_count: 852,
        },
        // Mystery
        {
          book_format_id: BookFormats.Paperback,
          title: "Peculiar",
          author: "Obadiah Bush",
          year: new Date("2010-06-15"),
          isbn: "978-2-9609-0527-4",
          description: LOREM_IPSUM,
          page_count: 408,
        },
        // Thriller/Suspense
        {
          book_format_id: BookFormats.Hardcover,
          title: "Secret Protocol",
          author: "Erin Ferguson",
          year: new Date("2010-09-03"),
          isbn: "978-6-9285-3457-5",
          description: LOREM_IPSUM,
          page_count: 691,
        },
        // Historical Fiction
        {
          book_format_id: BookFormats.Paperback,
          title: "Chronicle",
          author: "Timothy Cummings",
          year: new Date("2014-07-22"),
          isbn: "978-9-8637-6374-1",
          description: LOREM_IPSUM,
          page_count: 541,
        },
        // Literary
        {
          book_format_id: BookFormats.Hardcover,
          title: "Studies in Economics",
          author: "Dwight Burgess",
          year: new Date("2023-09-29"),
          isbn: "978-8-0705-9831-3",
          description: LOREM_IPSUM,
          page_count: 165,
        },
      ],
    });
  }
};

// Run seed if needed
await seedUsers();
await seedBookFormats();
await seedBooks();
