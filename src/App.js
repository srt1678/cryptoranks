import "./App.css";
import { NavigationBar } from "./components/NavigationBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./components/Homepage/Home";
import { Global } from "./components/GlobalPage/Global";
import { News } from "./components/NewsPage/News";
import { CryptoDetail } from './components/CyrptoDetailPage/CryptoDetail'
import { Comparison } from './components/ComparisonPage/Comparison'

import { useState, createContext } from "react";
export const AppContext = createContext();

function App() {
    const [allCoins, setAllCoins] = useState([]);
    const [selectSingleCoin, setSelectSingleCoin] = useState('');
    const [globalStatData, setGlobalStatData] = useState(null);
    const [best3CoinsData, setBest3CoinsData] = useState([]);
    const [newest3CoinsData, setNewest3CoinsData] = useState([]);
    const [singleCoinDetail, setSingleCoinDetail] = useState(null);
    const [selectTimePeriod, setSelectTimePeriod] = useState("24h");
    const [displayCoinChartList, setDisplayCoinChartList] = useState([]);
    const [coinChartAlert, setCoinChartAlert] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [chartDataPriceHistory, setChartDataPriceHistory] = useState([])

    return (
        <AppContext.Provider
            value={{
                allCoins,
                setAllCoins,
                selectSingleCoin,
                setSelectSingleCoin,
                globalStatData,
                setGlobalStatData,
                best3CoinsData,
                setBest3CoinsData,
                newest3CoinsData,
                setNewest3CoinsData,
                singleCoinDetail,
                setSingleCoinDetail,
                selectTimePeriod,
                setSelectTimePeriod,
                displayCoinChartList,
                setDisplayCoinChartList,
                coinChartAlert,
                setCoinChartAlert,
                chartData,
                setChartData,
                chartDataPriceHistory,
                setChartDataPriceHistory
            }}
        >
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/global" element={<Global />} />
                    <Route path="/news" element={<News />} />
                    <Route path="/comparison" element={<Comparison />} />
                    <Route path="/detail/:uuid" element={<CryptoDetail/>} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    );
}

export default App;
