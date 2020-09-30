import { UniqueEntityID } from "./unique-entity-id";

function isEntity(value: unknown): value is Entity {
  return value instanceof Entity;
}

export abstract class Entity {
  private readonly _id: UniqueEntityID;

  public get id(): UniqueEntityID {
    return this._id;
  }

  public constructor(id?: UniqueEntityID | null) {
    this._id = id ? id : new UniqueEntityID();
  }

  public equals(object: Entity | null): boolean {
    if (object === null) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (isEntity(object) === false) {
      return false;
    }

    return this._id.equals(object._id);
  }
}
