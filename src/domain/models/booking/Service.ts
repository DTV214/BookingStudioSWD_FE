export interface Service {
  id: string;
  code: string;
  serviceName: string;
  description: string;
  serviceFee: number;
  status: "AVAILABLE" | "UNAVAILABLE";
}
