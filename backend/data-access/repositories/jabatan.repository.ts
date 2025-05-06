import { Request } from 'express';
import { Model, CreationAttributes, WhereOptions } from 'sequelize';
import db from '../../infrastructure/models';
import { BaseRepository } from '../utility/base.repository';
import { getMessage } from '../../helpers/messages/messagesUtil';
import { MessagesKey } from '../../helpers/messages/messagesKey';
import { JabatanAttributes } from '../../infrastructure/models/jabatan.model';

export class JabatanRepository extends BaseRepository<
  Model<JabatanAttributes>
> {
  constructor() {
    super(db.Jabatan);
  }

  //region Find methods

  /**
   * Retrieves all data.
   * @param req Request object.
   * @returns All data.
   */
  async findAll(req: Request): Promise<Model<JabatanAttributes>[]> {
    try {
      return await this.model.findAll();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          getMessage(req, MessagesKey.ERRORFINDINGALL) + ': ' + error.message,
        );
      }
      throw error;
    }
  }

  /**
   * Finds a data by its primary key ID.
   * @param req
   * @param pkid
   */
  async findByID(
    req: Request,
    pkid: number,
  ): Promise<Model<JabatanAttributes> | null> {
    return await super.findByID(req, pkid);
  }

  /**
   * Finds data that match the given criteria.
   * @param req The request object.
   * @param criteria The criteria to match.
   * @returns An array of matching data.
   */
  async where(
    req: Request,
    criteria: WhereOptions<JabatanAttributes>,
  ): Promise<Model<JabatanAttributes>[]> {
    return super.where(req, criteria);
  }

  /**
   * Checks if there exists a data that matches the given criteria.
   * @param req The request object.
   * @param criteria The criteria to match.
   * @returns A boolean indicating if any matching data exists.
   */
  async whereExisting(
    req: Request,
    criteria: Partial<JabatanAttributes>,
  ): Promise<boolean> {
    return super.whereExisting(req, criteria);
  }

  //endregion

  //region Create methods

  /**
   * Creates a new data.
   * @param req The request object to extract user and host information.
   * @param entity The data data to be created.
   * @returns The created data or an error message.
   */
  async create(
    req: Request,
    entity: CreationAttributes<Model<JabatanAttributes>>,
  ): Promise<Model<JabatanAttributes> | string> {
    return super.create(req, entity);
  }

  /**
   * Bulk creates data.
   * @param req The request object to extract user and host information.
   * @param entities An array of data data to be created.
   * @returns The created data or an error message.
   */
  async bulkCreate(
    req: Request,
    entities: CreationAttributes<Model<JabatanAttributes>>[],
  ): Promise<Model<JabatanAttributes>[] | string> {
    return super.bulkCreate(req, entities);
  }

  //endregion
}
