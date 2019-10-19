import { Model } from "radiks";

class Relation extends Model {
  static className = "Relation";
  static validateUsername = true;
  static schema = {
    follower: { type: String, decrypted: true },
    followee: { type: String, decrypted: true }
  };
}
