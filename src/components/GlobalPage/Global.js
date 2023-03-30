import { apiKey, globalStatsUrl, singleCoinUrl } from "../../Api.js";
import React, { useEffect, useContext } from "react";
import { AppContext } from "../../App";
import GlobalStat from "./GlobalStat.js";
import Global3BestCoins from "./Global3BestCoins.js";
import Global3NewestCoins from "./Global3NewestCoins.js";

export const Global = () => {
    const {
        globalStatData,
        setGlobalStatData,
        setBest3CoinsData,
        setNewest3CoinsData,
    } = useContext(AppContext);

    const options = {
        headers: {
            "x-access-token": `${apiKey}`,
        },
    };

    let temp3BestCoinsArray = [];
    let temp3NewestCoinsArray = [];
    async function fetchGlobalStats() {
        const response = await fetch(globalStatsUrl, options);
        const result = await response.json();
        setGlobalStatData(result.data);
    }
    const fetch3BestCoins = async () => {
        await Promise.all(
            globalStatData?.bestCoins?.map(async (singleCoin) => {
                const response = await fetch(
                    singleCoinUrl + singleCoin.uuid,
                    options
                );
                const result = await response.json();
                temp3BestCoinsArray.push(result.data.coin);
            })
        );
        setBest3CoinsData(temp3BestCoinsArray);
    };
    const fetch3NewestCoins = async () => {
        await Promise.all(
            globalStatData?.newestCoins?.map(async (singleCoin) => {
                const response = await fetch(
                    singleCoinUrl + singleCoin.uuid,
                    options
                );
                const result = await response.json();
                temp3NewestCoinsArray.push(result.data.coin);
            })
        );
        setNewest3CoinsData(temp3NewestCoinsArray);
    };

    useEffect(() => {
        fetchGlobalStats();
    }, []);

    useEffect(() => {
        fetch3BestCoins();
        fetch3NewestCoins();
    }, [globalStatData]);

    return (
        <>
            {/*Global Stats Section*/}
            <section id="globalStatSection" className="pb-5">
                <h2 className="globalStatPageTitle ps-5 my-5">
                    Global Crypto Statistics
                </h2>
                <GlobalStat />
            </section>

            {/*Current 3 Best Coins Section */}
            <section id="current3BestCoins" className="pb-5">
                <h2 className="globalStatPageTitle ps-5 my-5">
                    Current 3 Best Coins
                </h2>
                <Global3BestCoins />
            </section>

            {/*Current 3 Newest Coins Section */}
            <section
                id="current3NewestCoins"
                className="current3NewestCoinsSection"
            >
                <h2 className="globalStatPageTitle ps-5 my-5">
                    Current 3 Newest Coins
                </h2>
                <Global3NewestCoins />
            </section>
        </>
    );
};
