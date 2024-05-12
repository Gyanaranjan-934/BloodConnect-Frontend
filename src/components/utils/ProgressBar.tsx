import { Progress } from "@material-tailwind/react";
import React from "react";

export default function ProgressBar() {
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prevProgress) => prevProgress < 100 ? prevProgress + 1 : 1);
        }, 80);
        return () => clearInterval(interval);
    }, []);
    return <Progress placeholder={""} value={progress} color={"red"} />;
}
