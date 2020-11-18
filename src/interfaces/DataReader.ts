export interface DataReader {
  read(): Promise<void>;
  data: string[][];
}
