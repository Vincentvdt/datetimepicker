import React, { useMemo } from "react";
import { getDaysInMonth } from "../utils/helpers";
import styled from "@emotion/styled";

const CalendarBody = styled.div`
    overflow: auto;
    width: 100%;

    table {
        height: 100%;
        width: 100%;
        table-layout: fixed;
        border: none;
        border-collapse: collapse;
        text-align: center;
    }
`;

const CalendarDaysTable = styled.table`
    th {
        color: rgba(0, 0, 0, 0.49);
        font-size: 10px;
        font-weight: 500;
        padding: 5px 0;
    }
`;

const CalendarDayCell = styled.td<{ isSelected: boolean; currentMonth: boolean }>`
    width: 30px;
    height: 30px;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border-radius: 3px;
    cursor: pointer;
    color: ${ ({ currentMonth }) => (currentMonth ? "#0C3667" : "#797979") };
    opacity: ${ ({ currentMonth }) => (currentMonth ? 1 : 0.3) };
    background: ${ ({ isSelected }) => isSelected && "rgba(151, 202, 238, 0.81)" };

    &:hover {
        background: rgba(151, 202, 238, 0.81);
        opacity: 1;
        color: #0c3667;
    }
`;

const CalendarMonthTable = styled.table`
    tbody {
        border-collapse: separate;
        border-spacing: 10px;
    }

    tr {
        display: flex;
        justify-content: space-around;
    }
`;

const CalendarMonthCell = styled.td<{ isSelected: boolean }>`
    margin: 3px;
    padding: 10px;
    cursor: pointer;
    border-radius: 3px;
    background: ${ ({ isSelected }) => (isSelected ? "#cce5ff" : "rgba(151, 202, 238, 0.17)") };
    color: #1961B6;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    flex: 1;

    &:hover {
        background: rgba(151, 202, 238, 0.52);
    }
`;

// Define the type for the props
interface BodyProps {
    viewMode: "date" | "month";
    options: {
        dayOfWeekShort: string[],
        monthsShort: string[]
    };
    selectedDateTime: Date;
    currentDate: Date;
    handleSelectDate: (date: Date) => void;
    handleSelectMonth: (monthIndex: number) => void;
}


// Interface for the DateObject used in calendar dates.
interface DateObject {
    date: Date;
    currentMonth: boolean;
}


const Body = ({ viewMode, options, selectedDateTime, currentDate, handleSelectDate, handleSelectMonth }: BodyProps) => {

    /**
     * Generates the calendar dates for display.
     *
     * @returns {DateObject[][]} A 2D array of DateObjects representing the calendar days.
     */
    const generateCalendarDates = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const offset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
        const prevMonthDays = getDaysInMonth(year, month - 1);

        const dates = [];
        for (let i = offset - 1; i >= 0; i--) {
            dates.push({ date: new Date(year, month - 1, prevMonthDays - i), currentMonth: false });
        }

        const currentMonthDays = getDaysInMonth(year, month);
        for (let i = 1; i <= currentMonthDays; i++) {
            dates.push({ date: new Date(year, month, i), currentMonth: true });
        }

        const remainingDays = (7 - (dates.length % 7)) % 7;
        for (let i = 1; i <= remainingDays; i++) {
            dates.push({ date: new Date(year, month + 1, i), currentMonth: false });
        }


        return dates.reduce<DateObject[][]>((acc, dateObj, index) => {
            if (index % 7 === 0) acc.push([]);
            acc[acc.length - 1].push(dateObj);
            return acc;
        }, []);
    }, [ currentDate ]);


    /**
     * Generates the months for selection in the calendar.
     *
     * @returns {string[][]} A 2D array representing the months in the calendar.
     */
    const generateCalendarMonths = useMemo(() => {
        return options.monthsShort.reduce((result, month, index) => {
            if (index % 3 === 0) result.push([]);
            result[result.length - 1].push(month);
            return result;
        }, [] as string[][]);
    }, [ options ]);

    return (
        <CalendarBody>
            { viewMode === "date" ? (
                <CalendarDaysTable>
                    <thead>
                    <tr>{ options.dayOfWeekShort.map((day, index) => (
                        <th key={ index }>{ day }</th>)) }</tr>
                    </thead>
                    <tbody>
                    { generateCalendarDates.map((row, rowIndex) => (
                        <tr key={ rowIndex }>
                            { row.map((dateObj, index) => {
                                const isSelected = selectedDateTime.toDateString() === dateObj.date.toDateString();
                                return (
                                    <CalendarDayCell isSelected={ isSelected } currentMonth={ dateObj.currentMonth }
                                                     key={ index }
                                                     onClick={ () => handleSelectDate(dateObj.date) }>
                                        { dateObj.date.getDate() }
                                    </CalendarDayCell>
                                );
                            }) }
                        </tr>
                    )) }
                    </tbody>
                </CalendarDaysTable>
            ) : (
                <CalendarMonthTable>
                    <tbody>
                    { generateCalendarMonths.map((row, rowIndex) => (
                        <tr key={ rowIndex }>
                            { row.map((month, monthIndex) => {
                                const isSelected = monthIndex + (3 * rowIndex) + 1 === currentDate.getMonth() + 1;
                                return (
                                    <CalendarMonthCell isSelected={ isSelected } key={ monthIndex + (3 * rowIndex) }
                                                       onClick={ () => handleSelectMonth(monthIndex + (3 * rowIndex)) }>
                                        { month }
                                    </CalendarMonthCell>
                                );
                            }) }
                        </tr>
                    )) }
                    </tbody>
                </CalendarMonthTable>
            ) }
        </CalendarBody>
    );
};

export default Body;