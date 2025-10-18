export interface BaseResponse<T> {
  code: number;
  message: string;
  data: string; // <-- SỬA LỖI: Thêm thuộc tính data để chứa URL
  id?: string;
}