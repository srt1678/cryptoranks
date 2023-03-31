import React, { useState, useEffect, useContext } from "react";
import { apiKey, searchCoinUrl } from "../../Api";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";

const AutoCompleteSearchBar = () => {
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const { setSelectSingleCoin} = useContext(AppContext);
    const navigate = useNavigate();

    const options = {
        headers: {
            "x-access-token": `${apiKey}`,
        },
    };

    const handleCryptoSelect = (uuid) => {
        setSelectSingleCoin(uuid);
        navigate(`detail/${uuid}`);
    };

    const renderDropDown = () => {
        const dropDownClass = search ? "show" : null;
        return (
            <ul className={`dropdown-menu ${dropDownClass} dropDownMenu`}>
                {result.map((result) => {
                    return (
                        <li key={result.symbol} className='dropdown-item'
                        onClick={() => handleCryptoSelect(result.uuid)}>{result.name} ({result.symbol})</li>
                    )
                })}
            </ul>
        );
    };

    useEffect(() => {
        let isMounted = true;
        const fetchSearchData = async () => {
            const response = await fetch(searchCoinUrl + search, options);
            const result = await response.json();
            console.log(result.data.coins);
            if (isMounted) {
                setResult(result.data.coins);
            }
        };
        if (search.length > 0) {
            fetchSearchData();
        } else {
            setResult([]);
        }
        return () => (isMounted = false);
    }, [search]);

    return (
        <div className="my-4 mx-auto" style={{width: '20rem'}}>
            <div className="form-floating dropdown">
                <input
                    className="form-control searchBar"
                    style={{backgroundColor: 'rgb(34, 39, 44)', color:'white'}}
                    id="search"
                    type="text"
                    placeholder="Search Coin"
                    autoComplete="off"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                ></input>
                <label htmlFor="search">Search</label>
                {renderDropDown()}
            </div>
        </div>
    );
};

export default AutoCompleteSearchBar;
