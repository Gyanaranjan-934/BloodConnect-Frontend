import { Button, IconButton } from "@material-tailwind/react";
import React from "react";

export default function PaginationComponent({
    pageNo,
    setPageNo,
    totalLength,
    totalCount,
}: {
    pageNo: number;
    setPageNo: React.Dispatch<React.SetStateAction<number>>;
    totalLength: number;
    totalCount: number;
}) {
    const handlePrevClick = () => {
        setPageNo((pageNo) => (pageNo <= 0 ? pageNo : pageNo - 1));
    };

    const handleNextClick = () => {
        setPageNo((pageNo) => (totalLength < 5 ? pageNo : pageNo + 1));
    };
    return (
        <>
            <Button
                variant="outlined"
                size="sm"
                placeholder={""}
                disabled={pageNo === 0}
                onClick={handlePrevClick}
            >
                Previous
            </Button>
            <div className="flex items-center gap-2">
                {Array.from(
                    {
                        length: Math.ceil(totalCount / 5),
                    },
                    (_, i) => i + 1
                ).map((page) => (
                    <IconButton
                        key={page}
                        variant={pageNo === page - 1 ? "outlined" : "text"}
                        size="sm"
                        placeholder={""}
                        onClick={() => {
                            setPageNo(page - 1);
                        }}
                    >
                        {page}
                    </IconButton>
                ))}
            </div>
            <Button
                variant="outlined"
                size="sm"
                placeholder={""}
                disabled={pageNo === Math.ceil(totalLength / 5)}
                onClick={handleNextClick}
            >
                Next
            </Button>
        </>
    );
}
