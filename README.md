## Background
This is a library web app that handles the following use cases:
* Book catalogue management, with features like adding and removing books
* Lending and returning the books, with features like late fee charges, tracking the days
* Reserve already lent books with features like notification when available
* User management, with features like user profile, history, interests, payments

## Assumptions Made
* There may be multiple copies of the same books, and in different formats (i.e. paperback, hardcover)
* Each book can have multiple genres (i.e. fantasy, mystery, thriller, etc.)
* This web app is used by users and staff / librarians, and the two account types should be treated separately
* A user can have multiple books lent to them but if they have a late book then no new books can be lent until they return the owed books
* When returning a book, the late payment fee should be shown if the return date has passed (late fees should also have interest on top)
* Users should be notified when a book they have previously borrowed becomes available in the catalogue
* Users should be able to reserve books if they are interested and this should be treated separately from borrowing the book
* Users should be able to view their own profile and edit it if needed
* Users should be able to view their previous book history
* Users should be able to view their previous payment transaction history
* There may be a few payment fee types such as late fee, interest, and subscription (if the library is using it)
* Staff can also view a list of users and their details
* Staff can manage, add, and remove books, as well as lend, reserve, and return books for users in the system

## Initial Data Model
To serve as the foundation for identifying the web app's features, the following data model was designed:

<img width="1602" height="1562" alt="Library_UML" src="https://github.com/user-attachments/assets/b0d37e46-9f60-4938-a16c-ac8986b645ae" />

## Technology Stack
[TypeScript](https://www.typescriptlang.org/), [Material UI](https://mui.com/material-ui/), [React](https://react.dev/), [Next.js](https://nextjs.org/), [Node.js](https://nodejs.org/), [Prisma ORM](https://www.prisma.io/orm), [SQLite](https://www.sqlite.org/), [Jest](https://jestjs.io/)

## Getting Started

### 1. Install the project dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Initialise the database

```bash
npm run db-init
# or
yarn db-init
# or
pnpm db-init
# or
bun db-init
```

### 3. (Optional) To run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 4. Build the app

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

### 5. To run the production server

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## AI Usage
The VSCode GitHub Copilot extension was primarily used for its inline suggestions as well as an agent for refactoring code and resolving uncertain issues.
With regards to prompt history, here are some of the more common prompts used:
* Refactor this to be more reusable across components
* Refactor the other form components in this file to match the format of this one
* The form is not reading from this field. Diagnose the issue and provide a solution.
