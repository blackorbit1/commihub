import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const steps = [
  {
    label: 'Ask a deadline',
    description: (
      <>
        <Typography variant='body1'>
          Please specify the deadline for your commission.
        </Typography>
      </>
    ),
  },
  {
    label: 'Give a mean of contact',
    description: (
      <>
        <Typography variant='body1'>
          Provide a way for the commissioner to contact you.
        </Typography>
      </>
    ),
  },
  {
    label: 'Confirm!',
    description: (
      <>
        <Typography variant='body1'>
          Review and confirm your commission request.
        </Typography>
      </>
    ),
  },
];

export default function VerticalStepper({ activeStep, setActiveStep, onNext, onBack, onReset }) {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
            <StepContent>
              {step.description}
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant='contained'
                    onClick={onNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Finish' : 'Continue'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={onBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you're finished</Typography>
          <Button onClick={onReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
