export class Notification {
  id: string;
  type: string;
  message: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
