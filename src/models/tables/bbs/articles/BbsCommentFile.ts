import * as orm from "typeorm";
import safe from "safe-typeorm";

import { BbsComment } from "./BbsComment";
import { FilePairBase } from "../../misc/internal/FilePairBase";

@orm.Unique(["bbs_comment_id", "attachment_file_id"])
@orm.Entity()
export class BbsCommentFile extends FilePairBase
{
    @safe.Belongs.ManyToOne(() => BbsComment,
        "uuid",
        "bbs_comment_id"
    )
    public readonly comment!: safe.Belongs.ManyToOne<BbsComment, "uuid">;
}
