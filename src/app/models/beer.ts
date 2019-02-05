export class Beer {
  id: string;
  type: string;
  minTemp: number;
  maxTemp: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
