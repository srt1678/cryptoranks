import React, { useContext } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { AppContext } from "../../App";

const DropDownTimePeriod = () => {
    const { selectTimePeriod, setSelectTimePeriod } = useContext(AppContext);
    const timeVariable = ["1h", "3h", "12h", "24h", "7d", "30d", "3m", "1y"];
    return (
        <Dropdown style={{ marginLeft: "11rem" }}>
            <Dropdown.Toggle
                id="dropdown-button-dark-example1"
                variant="secondary"
            >
                Time Period: {selectTimePeriod}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
                {timeVariable.map((selectedTime) => {
                    return (
                        <Dropdown.Item
                            disabled={
                                selectedTime === selectTimePeriod ? true : false
                            }
                            onClick={() => setSelectTimePeriod(selectedTime)}
                            key={selectedTime}
                        >
                            {selectedTime}
                        </Dropdown.Item>
                    );
                })}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default DropDownTimePeriod;
