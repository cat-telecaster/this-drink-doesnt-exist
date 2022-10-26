import { GraphQLClient } from "graphql-request";
import { getSdkWithHooks, UpsertDrinkMutation, NewDrink } from "../types/generated/graphql";

const API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_ENDPOINT}`;
const headers: Record<string, string> = {
    "Content-Type": "application/json"
};
const sdk = getSdkWithHooks(
    new GraphQLClient(API_ENDPOINT, {
        headers
    })
);

export async function getSortedPostsData() {
    const response = await sdk.getDrinks();

    return response.drinks;
};

export async function getPostData(id: string) {
    const response = await sdk.getDrinkID({
        id,
    });

    return response.drinkID;
}

export async function getAllPostIds() {
    // idk how to get only ids with graphql-codegen
    const response = await sdk.getDrinks();

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]

    return response.drinks.map((post) => {
        return {
            params: {
                id: post?.id
            },
        };
    });
}

export async function upsertNewPost(newData: NewDrink): Promise<UpsertDrinkMutation> {
    const response = await sdk.upsertDrink({
        name: newData.name,
        flavour: newData.flavour,
        type: newData.type,
        mL: newData.mL,
        price: newData.price,
    });
    return response;
}
