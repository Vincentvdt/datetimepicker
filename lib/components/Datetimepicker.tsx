import React, { ReactElement, useState } from "react";
import styled from "@emotion/styled";
import Header from "./Header";
import Body from "./Body";
import defaultOptions from "../assets/data/locales";

const DatetimePicker = styled.div`
    position: relative;
    width: 244px;
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
    box-sizing: border-box;

    * {
        font-family: 'Inter', sans-serif;
        font-optical-sizing: auto;
        font-style: normal;
        box-sizing: border-box;
    }
`;

const DateInputWrapper = styled.div<{ isPickerOpen: boolean }>`
    display: flex;
    align-items: center;
    background: #FFF;
    border-radius: 5px;
    border: 1px solid #E3E3E3;
    padding: 0;
    width: 100%;

    input {
        cursor: pointer;
        padding: 10px;
        border: none;
        width: 100%;
        border-radius: 5px;
        background: #FFF;
        color: #0C3667;
        font-size: 12px;
        font-weight: 700;

        outline: ${ ({ isPickerOpen }) => isPickerOpen ? "2px solid #0E7AF8" : "none" };
    }
`;

const CalendarWrapper = styled.div`
    position: absolute;
    top: 54px;
    display: flex;
    width: 100%;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    align-self: stretch;
    border-radius: 7px;
    background: white;
    border: 1px solid #E3E3E3;
`;

/**
 * Custom styles and events for the DateTimePicker component
 */
interface DateTimePickerProps {
    locale?: "en" | "fr";
    customStyles?: { [key: string]: string };
    onDateChange?: (date: Date) => void;
    onMonthChange?: (month: number, year: number) => void;
    onYearChange?: (year: number) => void;
}

/**
 * Datepicker with calendar functionality.
 *
 * @returns {ReactElement} The Button component with a datepicker.
 */
const DateTimepicker = ({
    locale = "en",
}: DateTimePickerProps): ReactElement => {
    const options = defaultOptions[locale];
    const [ selectedDateTime, setSelectedDateTime ] = useState<Date>(new Date());
    const [ currentDate, setCurrentDate ] = useState<Date>(new Date());
    const [ navigationYear, setNavigationYear ] = useState<number>(new Date().getFullYear());
    const [ isPickerOpen, setIsPickerOpen ] = useState<boolean>(false);
    const [ viewMode, setViewMode ] = useState<"date" | "month">("date");
    const [ inputValue, setInputValue ] = useState<string>(new Date().toLocaleDateString(options.locale));

    // Toggle between "date" and "month" view modes
    const toggleViewMode = (view: "date" | "month") => setViewMode(view);


    // Function to move to the previous month (viewMode: date)
    const handlePrevMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    // Function to move to the next month (viewMode: date)
    const handleNextMonth = () => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

    //Function to select a date from the calendar (viewMode: date)
    const handleSelectDate = (date: Date) => {
        setCurrentDate(date);
        setSelectedDateTime(date);
        setInputValue(date.toLocaleDateString(options.locale));
        setIsPickerOpen(false);
    };


    // Function to move to the previous year (viewMode: month)
    const handlePrevYear = () => setNavigationYear(prev => prev - 1);
    // Function to move to the next year (viewMode: month)
    const handleNextYear = () => setNavigationYear(prev => prev + 1);

    //Function to select a month and a year from the calendar (viewMode: month)
    const handleSelectMonth = (monthIndex: number) => {
        const newDate = new Date(navigationYear, monthIndex, 1); // Create new date with selected year and month
        setCurrentDate(newDate); // Update the currentDate to reflect selection
        setViewMode("date"); // Switch back to date view
    };

    return (
        <DatetimePicker>
            <DateInputWrapper isPickerOpen={ isPickerOpen }
                              onClick={ () => setIsPickerOpen(prev => !prev) }>
                <input type="text" value={ inputValue } readOnly/>
            </DateInputWrapper>

            { isPickerOpen && (
                <CalendarWrapper>
                    <Header
                        viewMode={ viewMode }
                        options={ options }
                        currentDate={ currentDate }
                        toggleViewMode={ toggleViewMode }
                        handlePrevMonth={ handlePrevMonth }
                        handleNextMonth={ handleNextMonth }
                        navigationYear={ navigationYear }
                        handlePrevYear={ handlePrevYear }
                        handleNextYear={ handleNextYear }
                    />
                    <Body
                        viewMode={ viewMode }
                        options={ options }
                        selectedDateTime={ selectedDateTime }
                        currentDate={ currentDate }
                        handleSelectDate={ handleSelectDate }
                        handleSelectMonth={ handleSelectMonth }
                    />
                </CalendarWrapper>
            ) }

        </DatetimePicker>
    );
};

export default DateTimepicker;
