export enum BookStatuses {
  Available = 1,
  Borrowed,
  Reserved,
}

export type BookStatusType = keyof typeof BookStatuses;
