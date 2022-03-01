import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ColumnEntity } from './entities/column.entity';

@EntityRepository(ColumnEntity)
export class ColumnsRepository extends Repository<ColumnEntity> {}
