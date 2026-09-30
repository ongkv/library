import { beforeEach, expect, test } from "@jest/globals";
import { createBookFormat } from "../../helpers/dbUtils";
import { BookFormats } from "../../../../lib/types/BookFormat";
import { Context, createMockContext, MockContext } from "../../helpers/context";

let mockCtx: MockContext;
let ctx: Context;

beforeEach(() => {
  mockCtx = createMockContext();
  ctx = mockCtx as unknown as Context;
});

test("should create new book format ", async () => {
  const bookFormat = {
    id: BookFormats.Paperback,
    name: BookFormats[BookFormats.Paperback],
  };

  mockCtx.prisma.bookFormat.create.mockResolvedValue(bookFormat);

  await expect(createBookFormat(bookFormat, ctx)).resolves.toEqual({
    id: BookFormats.Paperback,
    name: BookFormats[BookFormats.Paperback],
  });
});
