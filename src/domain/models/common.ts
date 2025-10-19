// src/domain/models/common.ts

export type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};
