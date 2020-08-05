import { Position as PositionModel } from "../database/models/position";
import { Position } from "../entities/position";
import { PositionMapper } from "../mappers/position-mapper";

export interface IPositionRepository {
  findPositions(): Promise<Position[]>;
  save(position: Position): Promise<void>;
  exists(position: Position): Promise<boolean>;
}

export class PositionRepository implements IPositionRepository {
  public async findPositions(): Promise<Position[]> {
    const rawCities = await PositionModel.find().lean();

    return rawCities.map((rawPosition) => PositionMapper.toEntity(rawPosition));
  }

  public async save(position: Position): Promise<void> {
    const positionExists = await this.exists(position);
    const positionPersistence = PositionMapper.toPersistence(position);

    if (positionExists) {
      await PositionModel.update(
        { _id: position.id.value },
        positionPersistence
      );
    } else {
      await PositionModel.create(positionPersistence);
    }
  }

  public async exists(position: Position): Promise<boolean> {
    const rawPosition = await PositionModel.findById(position.id.value).lean();

    if (rawPosition === null) {
      return false;
    }

    return true;
  }
}
