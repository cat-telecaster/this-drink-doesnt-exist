import { GraphQLClient } from "graphql-request";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";

import { getSdkWithHooks } from "../types/generated/graphql";

export const useGetAuthorizedSdk = () => {
    //const { getAccessTokenSilently } = useAuth0();
    // const { show: showDialog } = useDialogMutation();
    // const { logout } = useUserMutation();

    const router = useRouter();
    const routerRef = useRef(router);
    useEffect(() => {
        routerRef.current = router;
    }, [router]);

    const getAuthorizedSdk = useCallback(async () => {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        try {
            // const token = await getAccessTokenSilently();
            // if (token) {
            //     headers["x-gig-worker-authorization"] = `Bearer ${token}`;
            // }
            return getSdkWithHooks(
                new GraphQLClient(`${process.env.API_ENDPOINT}`, {
                    headers,
                })
            );
        } catch (e) {
            // @ts-expect-error
            if (e?.error === "login_required") {
                // routerRef.current.replace("/");
                // logout({ localOnly: true });
                // showDialog({
                //     type: "error",
                //     title: "ログインエラー",
                //     message:
                //         "ログインセッションの有効期限が過ぎました。再度ログインしてください。",
                // });
            }
            throw e;
        }
    }, [/*getAccessTokenSilently, logout, showDialog*/]);

    return getAuthorizedSdk;
};
