import { Model } from "radiks";
import { Collection } from "blockstack-collections";

export class Relation extends Model {
  static className = "Relation";
  static validateUsername = true;
  static schema = {
    follower: { type: String, decrypted: true },
    followee: { type: String, decrypted: true }
  };
}

export class Relationship extends Collection {
  static get collectionName() {
    return "relationship";
  }

  static schema = {
    identifier: String, // blockstack ID
    followee: String, // blockstack ID same as identifier
  };

  static fromData(data) {
    return this.fromJSON(data);
  }

  static fromJSON(data) {
    return new Relationship(JSON.parse(data));
  }

  constructor(attrs = {}) {
    super(attrs);
  }

  collectionName() {
    return Relationship.collectionName;
  }

  constructIdentifier() {
    // Create identifier based on blockstack id
    return `${this.attrs.followee || ""}`;
  }

  serialize() {
    // Serialize to JSON
    return this.toJSON();
  }

  toJSON() {
    return JSON.stringify(this.attrs);
  }
}
