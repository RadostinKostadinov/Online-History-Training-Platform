export class User {
  public email?: string;
  public password?: string;
  public avatar?: {
    owner?: string,
    image?: string,
    name?: string,
    years?: string,
    description?: string,
    isReviewed?: boolean,
  };
  public repass?: string;
  public firstName?: string;
  public surName?: string;
  public lastName?: string;
  public school_class?: string;
  public number?: string;
  public address?: string;
  public avatars?: [];
  public avatarsPoints?: number;
  public avgGrade?: number;
  public class?: string;
  public classTeacher?: {
    firstName?: string,
    lastName?: string,
    userPhone?: string,
  };
  public competitionPoints?: number;
  public createdAt?: string;
  public isApproved?: boolean;
  public lessonsPoints?: number;
  public practicesPoints?: number;
  public solvedPTCs?: [];
  public testPoints?: 0;
  public type?: string;
  public userPhone?: number;

  constructor(
    public username?: string,
    private token?: string
  ) {};

  get userToken() {
    return this.token;
  }
}
