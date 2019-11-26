import { Model } from "radiks";

export class Relation extends Model {
  static className = "Relation";
  static validateUsername = true;
  static schema = {
    follower: { type: String, decrypted: true },
    followee: { type: String, decrypted: true }
  };
}
