import safe from "safe-typeorm";
import { Singleton } from "tstl/thread/Singleton";

import { IBbsArticle } from "../../../api/structures/bbs/articles/IBbsArticle";

import { __MvBbsArticleLastContent } from "../../../models/material/bbs/__MvBbsArticleLastContent";
import { AttachmentFileProvider } from "../../misc/AttachmentFileProvider";
import { BbsArticle } from "../../../models/tables/bbs/articles/BbsArticle";
import { BbsArticleContent } from "../../../models/tables/bbs/articles/BbsArticleContent";
import { BbsArticleContentFile } from "../../../models/tables/bbs/articles/BbsArticleContentFile";
import { AttachmentFile } from "../../../models/tables/misc/AttachmentFile";

export namespace BbsArticleContentProvider
{
    export function json()
    {
        return json_builder.get();
    }
    const json_builder = new Singleton(() => BbsArticleContent.createJsonSelectBuilder
    (
        {
            files: AttachmentFileProvider.json(),
        }
    ));

    export async function collect
        (
            collection: safe.InsertCollection, 
            article: BbsArticle,
            input: IBbsArticle.IStore,
            newbie: boolean
        ): Promise<BbsArticleContent>
    {
        // THE CONTENT
        const content: BbsArticleContent = BbsArticleContent.initialize({
            id: safe.DEFAULT,
            article,
            title: input.title,
            body: input.body,
            created_at: safe.DEFAULT
        });
        collection.push(content);

        // ATTACHMENT FILES
        const files: AttachmentFile[] = AttachmentFileProvider.collectList
        (
            collection, 
            input.files, 
            (file, sequence) => BbsArticleContentFile.initialize({
                id: safe.DEFAULT,
                content,
                file,
                sequence
            })
        );
        await content.files.set(files);

        // LAST CONTENT PAIRING
        if (newbie === true)
            collection.push(__MvBbsArticleLastContent.initialize({
                article,
                content
            }));
        else
            collection.after(() => __MvBbsArticleLastContent.emplace(article, content));

        return content;
    }

    export async function update
        (
            article: BbsArticle, 
            input: IBbsArticle.IStore
        ): Promise<BbsArticleContent>
    {
        const collection: safe.InsertCollection = new safe.InsertCollection();
        const content: BbsArticleContent = await collect(collection, article, input, false);

        await collection.execute();
        return content;
    }
}