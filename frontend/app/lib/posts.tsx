import { GraphQLClient } from "graphql-request";
import { getSdkWithHooks } from "../types/generated/graphql";

export async function getSortedPostsData() {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    const sdk = getSdkWithHooks(
        new GraphQLClient(`${process.env.API_ENDPOINT}` + '/query', {
            headers
        })
    );

    const response = await sdk.getDrinks();

    return response.drinks;
};

export async function getPostData(id: string) {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    const sdk = getSdkWithHooks(
        new GraphQLClient(`${process.env.API_ENDPOINT}` + '/query', {
            headers
        })
    );

    const response = await sdk.getDrinkID({
        id,
    });

    return response.drinkID;
}

export async function getAllPostIds() {
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    const sdk = getSdkWithHooks(
        new GraphQLClient(`${process.env.API_ENDPOINT}` + '/query', {
            headers
        })
    );

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


