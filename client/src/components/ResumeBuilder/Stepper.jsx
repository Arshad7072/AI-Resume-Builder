import "./Stepper.css";

const steps = [
  "Personal",
  "Education",
  "Experience",
  "Skills",
  "Projects",
  "Certificates",
  "Languages",
  "Review",
];

const Stepper = ({ currentStep }) => {
  return (
    <div className="stepper">
      {steps.map((step, index) => {
        const stepNumber = index + 1;

        return (
          <div className="step-item" key={step}>
            <div
              className={
                currentStep >= stepNumber ? "step-circle active" : "step-circle"
              }
            >
              {stepNumber}
            </div>

            <span>{step}</span>

            {index !== steps.length - 1 && (
              <div
                className={
                  currentStep > stepNumber ? "step-line active" : "step-line"
                }
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Stepper;
