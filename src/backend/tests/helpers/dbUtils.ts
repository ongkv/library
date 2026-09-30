import { Context } from "./context";

interface CreateBookFormat {
  name: string;
}

export async function createBookFormat(
  bookformat: CreateBookFormat,
  ctx: Context,
) {
  return await ctx.prisma.bookFormat.create({
    data: bookformat,
  });
}
