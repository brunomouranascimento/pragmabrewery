export class Beer {
  id: string;
  number: number;
  type: string;
  minTemp: number;
  maxTemp: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
