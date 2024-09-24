import React from "react";
import ArrowIcon from "../assets/icons/ArrowIcon";
import styled from "@emotion/styled";

const CalendarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    align-self: stretch;
`;

const CalendarNavigation = styled.div<{ direction: "left" | "right" }>`
    display: flex;
    padding: 7px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    background: rgba(151, 202, 238, 0.52);
    cursor: pointer;
    transform: ${ ({ direction }) => direction === "right" ? "rotate(180deg)" : "rotate(0deg)" };

    &:hover, &:focus-visible, &:focus {
        outline: 1px solid #0C3667;
    }

    svg {
        display: flex;
        width: 10px;
        justify-content: center;
        align-items: center;
        gap: 10px;

        path {
            fill: #1961B6;
        }
    }
`;

const CalendarCurrentDate = styled.div<{ viewMode: "date" | "month" }>`
    cursor: pointer;
    color: #000;
    font-size: ${ ({ viewMode }) => viewMode === "date" ? "12px" : "13px" };
    font-weight: 700;
    text-align: center;
`;

// Define the type for the props
interface HeaderProps {
    viewMode: "date" | "month";
    currentDate: Date;
    navigationYear: number;
    options: {
        months: string[];
    };
    toggleViewMode: (view: "date" | "month") => void;
    handlePrevMonth: () => void;
    handleNextMonth: () => void;
    handlePrevYear: () => void;
    handleNextYear: () => void;

}

const Header = ({
    viewMode,
    options,
    navigationYear,
    toggleViewMode,
    currentDate,
    handlePrevMonth,
    handleNextMonth,
    handlePrevYear,
    handleNextYear,
}: HeaderProps) => {


    return (
        <CalendarHeader>
            {
                viewMode === "date" ?
                    <>
                        <CalendarNavigation direction="left" onClick={ handlePrevMonth }>
                            <ArrowIcon/>
                        </CalendarNavigation>
                        <CalendarCurrentDate viewMode={ viewMode } onClick={ () => toggleViewMode("month") }>
                            { options.months[currentDate.getMonth()] } { currentDate.getFullYear() }
                        </CalendarCurrentDate>
                        <CalendarNavigation direction="right" onClick={ handleNextMonth }>
                            <ArrowIcon/>
                        </CalendarNavigation>
                    </>
                    :
                    <>
                        <CalendarNavigation direction="left" onClick={ handlePrevYear }>
                            <ArrowIcon/>
                        </CalendarNavigation>
                        <CalendarCurrentDate viewMode={ viewMode } onClick={ () => toggleViewMode("date") }>
                            { navigationYear }
                        </CalendarCurrentDate>
                        <CalendarNavigation direction="right" onClick={ handleNextYear }>
                            <ArrowIcon/>
                        </CalendarNavigation>
                    </>
            }
        </CalendarHeader>

    );
};

export default Header;