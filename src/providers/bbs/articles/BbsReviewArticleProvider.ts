import * as nest from "@nestjs/common";
import * as orm from "typeorm";
import safe from "safe-typeorm";

import { IBbsReviewArticle } from "../../../api/structures/bbs/articles/IBbsReviewArticle";

import { BbsArticle } from "../../../models/tables/bbs/articles/BbsArticle";
import { BbsArticleContent } from "../../../models/tables/bbs/articles/BbsArticleContent";
import { BbsCustomer } from "../../../models/tables/bbs/actors/BbsCustomer";
import { BbsSection } from "../../../models/tables/bbs/systematic/BbsSection";
import { BbsReviewArticle } from "../../../models/tables/bbs/articles/BbsReviewArticle";
import { Citizen } from "../../../models/tables/members/Citizen";
import { __MvBbsArticleHit } from "../../../models/material/bbs/__MvBbsArticleHit";

import { BbsArticleProvider } from "./BbsArticleProvider";
import { BbsReviewArticleContentProvider } from "./BbsReviewArticleContentProvider";
import { BbsCustomerProvider } from "../actors/BbsCustomerProvider";

export namespace BbsReviewArticleProvider
{
    /* ----------------------------------------------------------------
        INDEX
    ---------------------------------------------------------------- */
    export function statement
        (
            section: BbsSection, 
            input: IBbsReviewArticle.IRequest.ISearch | null
        ): orm.SelectQueryBuilder<BbsReviewArticle>
    {
        const stmt: orm.SelectQueryBuilder<BbsReviewArticle> = BbsReviewArticle
            .createJoinQueryBuilder(review =>
            {
                review.innerJoin("customer")
                    .innerJoin("citizen");
                review.innerJoin("base", article =>
                {
                    article.innerJoin("__mv_hit");
                    article.innerJoin("__mv_last")
                        .innerJoin("content")
                        .innerJoin("reviewContent");
                });
            })
            .andWhere(...BbsArticle.getWhereArguments("section", "=", section))
            .select([
                BbsArticle.getColumn("id"),
                Citizen.getColumn("name", "customer"),
                BbsArticleContent.getColumn("title"),
                BbsReviewArticle.getColumn("brand"),
                BbsReviewArticle.getColumn("manufacturer"),
                BbsReviewArticle.getColumn("product"),
                BbsReviewArticle.getColumn("purchased_at"),
                __MvBbsArticleHit.getColumn("count", "hit"),
                BbsArticle.getColumn("created_at"),
                BbsArticleContent.getColumn("created_at", "updated_at")
            ])
            .orderBy(BbsArticle.getColumn("created_at", null), "DESC");

        if (input !== null)
        {
            if (input.brand)
                stmt.andWhere(...BbsReviewArticle.getWhereArguments("brand", "LIKE", `%${input.brand}%`));
            if (input.manufacturer)
                stmt.andWhere(...BbsReviewArticle.getWhereArguments("manufacturer", "LIKE", `%${input.manufacturer}%`));
            if (input.product)
                stmt.andWhere(...BbsReviewArticle.getWhereArguments("product", "LIKE", `%${input.product}%`));
            
            BbsArticleProvider.search(stmt, input);
        }
        return stmt;
    }

    export function postProcess(summaries: IBbsReviewArticle.ISummary[]): IBbsReviewArticle.ISummary[]
    {
        for (const summary of summaries)
            summary.customer = safe.AesPkcs5.decode
            (
                summary.customer,
                Citizen.ENCRYPTION_PASSWORD.key,
                Citizen.ENCRYPTION_PASSWORD.iv
            );
        return summaries;
    }

    /* ----------------------------------------------------------------
        ACCESSORS
    ---------------------------------------------------------------- */
    export async function find(section: BbsSection, id: string): Promise<BbsReviewArticle>
    {
        return await BbsReviewArticle
            .createJoinQueryBuilder(review => 
            {
                review.innerJoinAndSelect("customer")
                    .innerJoinAndSelect("citizen");
                review.innerJoinAndSelect("base");
            })
            .andWhere(...BbsArticle.getWhereArguments("section", "=", section))
            .andWhere(...BbsArticle.getWhereArguments("id", "=", id))
            .getOneOrFail();
    }

    export async function editable
        (
            section: BbsSection, 
            id: string,
            customer: BbsCustomer<true>,
        ): Promise<BbsReviewArticle>
    {
        // GET ARTICLE
        const review: BbsReviewArticle = await find(section, id);

        // VALIDATE OWNERSHIP
        const writer: Citizen = await (await review.customer.get()).citizen.get();
        const accessor: Citizen = await customer.citizen.get();

        if (writer.id !== accessor.id)
            throw new nest.ForbiddenException("This article is not yours.");

        return review;
    }

    export async function json(review: BbsReviewArticle): Promise<IBbsReviewArticle>
    {
        const base: BbsArticle = await review.base.get();
        const customer: BbsCustomer<true> = await review.customer.get();
        const hit: __MvBbsArticleHit | null = await base.__mv_hit.get();

        __MvBbsArticleHit.increments(orm.getManager(), base).catch(() => {});

        return {
            ...review.toPrimitive(),
            ...await BbsArticleProvider.json(base, BbsReviewArticleContentProvider.json),
            customer: await BbsCustomerProvider.json(customer),
            hit: (hit !== null)
                ? hit.count + 1
                : 1
        };
    }

    /* ----------------------------------------------------------------
        SAVE
    ---------------------------------------------------------------- */
    export function collect
        (
            collection: safe.InsertCollection,
            section: BbsSection, 
            customer: BbsCustomer<true>,
            input: IBbsReviewArticle.IStore
        ): BbsReviewArticle
    {
        // SUPER-TYPE
        const base: BbsArticle = BbsArticleProvider.collect
        (
            collection,
            section,
            input,
            BbsReviewArticleContentProvider.collect,
            true
        );

        // SUB-TYPE
        const review: BbsReviewArticle = BbsReviewArticle.initialize({
            base,
            customer,
            brand: input.brand,
            manufacturer: input.manufacturer,
            product: input.product,
            purchased_at: input.purchased_at
        });
        base.review.set(collection.push(review));

        return review;
    }

    export async function store
        (
            section: BbsSection, 
            customer: BbsCustomer<true>,
            input: IBbsReviewArticle.IStore
        ): Promise<BbsReviewArticle>
    {
        const collection: safe.InsertCollection = new safe.InsertCollection();
        const review: BbsReviewArticle = collect(collection, section, customer, input);
        
        await collection.execute();
        return review;
    }
}