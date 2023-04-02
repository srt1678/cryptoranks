import React, { useState, useEffect, useContext } from "react";
import { apiKey, searchCoinUrl } from "../../Api";
import { AppContext } from "../../App";

const CoinChartSearchBar = () => {
    const [coinChartSearch, setCoinChartSearch] = useState("");
    const [coinchartResult, setCoinChartResult] = useState([]);
    const { displayCoinChartList, setDisplayCoinChartList, setCoinChartAlert } =
        useContext(AppContext);

    const options = {
        headers: {
            "x-access-token": `${apiKey}`,
        },
    };

    const addCoinToChart = (uuid, name) => {
        if (displayCoinChartList >= 5 || displayCoinChartList.find(e => e['uuid'] === uuid)) {
            setCoinChartAlert(true)
        }else {
            setDisplayCoinChartList((displayCoinChartList) => [
                ...displayCoinChartList,
                {'uuid': uuid, 'name': name},
            ]);
        }
    };

    const renderDropDown = () => {
        const dropDownClass = coinChartSearch ? "show" : null;
        return (
            <ul className={`dropdown-menu ${dropDownClass} dropDownMenu`}>
                {coinchartResult.map((result) => {
                    return (
                        <li
                            key={result.symbol}
                            className="dropdown-item"
                            onClick={() => {
                                addCoinToChart(result.uuid, result.name);
                                setCoinChartSearch("");
                            }}
                        >
                            {result.name} ({result.symbol})
                        </li>
                    );
                })}
            </ul>
        );
    };

    useEffect(() => {
        let isMounted = true;
        const fetchSearchData = async () => {
            const response = await fetch(
                searchCoinUrl + coinChartSearch,
                options
            );
            const result = await response.json();
            if (isMounted) {
                setCoinChartResult(result.data.coins);
            }
        };
        if (coinChartSearch.length > 0) {
            fetchSearchData();
        } else {
            setCoinChartResult([]);
        }
        return () => (isMounted = false);
    }, [coinChartSearch]);

    return (
        <div className="my-5 mx-auto" style={{ width: "20rem" }}>
            <div className="form-floating dropdown">
                <input
                    className="form-control searchBar"
                    style={{
                        backgroundColor: "rgb(34, 39, 44)",
                        color: "white",
                    }}
                    id="searchCoinChart"
                    type="text"
                    placeholder="Search Coin to add to chart"
                    autoComplete="off"
                    value={coinChartSearch}
                    onChange={(e) => setCoinChartSearch(e.target.value)}
                ></input>
                <label htmlFor="search">Search Coin</label>
                {renderDropDown()}
            </div>
        </div>
    );
};

export default CoinChartSearchBar;
