/**
 * @packageDocumentation
 * @module models.tables.common
 */
//================================================================
import orm from "@modules/typeorm";
import safe from "safe-typeorm";

@orm.Entity()
export class AttachmentFile extends safe.Model
{
    /* -----------------------------------------------------------
        COLUMNS
    ----------------------------------------------------------- */
    @orm.PrimaryGeneratedColumn("uuid")
    public readonly id!: string;

    @orm.Column("varchar")
    public readonly name!: string;

    @orm.Column("varchar", { nullable: true })
    public readonly extension!: string | null;

    @orm.Index()
    @orm.Column("varchar", { length: 1024 })
    public readonly url!: string;
}
