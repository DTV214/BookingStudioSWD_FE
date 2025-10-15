export interface StudioType {
  id: string;
  name: string;
  description: string;
  minArea: number;
  maxArea: number;
  bufferTime?: string | null;
  selected?: boolean;
  services?: string[];
}
