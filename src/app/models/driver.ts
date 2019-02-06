export class Driver {
  uid: string;
  name: string;
  occupation: number;
  email: string;
  password: string;
  phone: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
