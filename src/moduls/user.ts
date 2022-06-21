export class User {
  name: string;
  phone: string;
  email: string;
  userStatus: number;
  _id: string;
      constructor(name: string, email: string, phone: string, userStatus: number,_id: string) {
      this.name = name;
      this.email = email;
      this.phone = phone;
      this.userStatus = userStatus;
      this._id = _id
        }
}

