import { Step, Button, Stepper } from "@material-tailwind/react";
import React from "react";


function StepperComponent({
    activeStep,
    isLastStep,
    isFirstStep,
    handleNext,
    handlePrev,
    setIsLastStep,
    setIsFirstStep,
    setActiveStep
}:{
    activeStep: number,
    isLastStep: boolean,
    isFirstStep: boolean,
    handleNext: () => void,
    handlePrev: () => void,
    setIsLastStep: React.Dispatch<React.SetStateAction<boolean>>,
    setIsFirstStep: React.Dispatch<React.SetStateAction<boolean>>,
    setActiveStep: React.Dispatch<React.SetStateAction<number>>
}) {
    return (
        <div className="mt-8">
            <Stepper
                activeStep={activeStep}
                isLastStep={(value) => setIsLastStep(value)}
                isFirstStep={(value) => setIsFirstStep(value)}
                placeholder={""}
            >
                <Step
                    onClick={() => setActiveStep(0)}
                    placeholder={""}
                    className="cursor-pointer"
                >
                    1
                </Step>
                <Step
                    onClick={() => setActiveStep(1)}
                    placeholder={""}
                    className="cursor-pointer"
                >
                    2
                </Step>
                <Step
                    onClick={() => setActiveStep(2)}
                    placeholder={""}
                    className="cursor-pointer"
                >
                    3
                </Step>
            </Stepper>
            <div className="mt-16 flex justify-between">
                <Button
                    onClick={handlePrev}
                    disabled={isFirstStep}
                    placeholder={""}
                >
                    Prev
                </Button>
                {activeStep !== 2 ? (
                    <Button
                        onClick={handleNext}
                        disabled={isLastStep}
                        placeholder={""}
                    >
                        Next
                    </Button>
                ) : (
                    <Button
                        onClick={handleNext}
                        type="submit"
                        disabled={!isLastStep}
                        placeholder={""}
                    >
                        Submit
                    </Button>
                )}
            </div>
        </div>
    );
}

export default StepperComponent;
