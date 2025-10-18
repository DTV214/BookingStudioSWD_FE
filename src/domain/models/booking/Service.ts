export interface Service {
  id: string;
  serviceName: string;
  description: string;
  serviceFee: number;
  status: "AVAILABLE" | "UNAVAILABLE";
}
