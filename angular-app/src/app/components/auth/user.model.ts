export class User {
  public email?: string;
  public password?: string;
  public repass?: string;
  public firstName?: string;
  public surName?: string;
  public lastName?: string;
  public school_class?: string;
  public number?: string;

  constructor(
    public username?: string,
    private token?: string
  ) {};

  get userToken() {
    return this.token;
  }
}
