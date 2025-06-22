import React from 'react';
import { Stepper, Step, StepLabel, Typography } from '@mui/material';

const StepperComponent = ({
    elements = [],
    activeStep,
}) => {
    return (
        <div style={{ width: '100%' }}>
            {/* Stepper */}
            <Stepper activeStep={activeStep} alternativeLabel>
                {elements.map((element, index) => (
                    <Step key={index}>
                        <StepLabel
                            sx={{
                                '& .MuiStepIcon-root.Mui-active': {
                                    color: '#495361',
                                },
                                '& .MuiStepIcon-root.Mui-completed': {
                                    color: '#495361',
                                },
                            }}
                        >
                            <Typography>{element.label}</Typography>
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Renderiza el componente del paso activo */}
            <div
                style={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                {elements[activeStep].component}
            </div>

            {/* Botones dinámicos para pasos normales */}
            {activeStep !== elements.length - 1 && (
                <div
                    style={{
                        marginTop: 40,
                        display: 'flex',
                        justifyContent:'space-between',
                        alignItems:'center',
                        gap: 10,
                    }}
                >
                    {elements[activeStep].buttons.map((button, index) => (
                        <React.Fragment key={index}>{button}</React.Fragment>
                    ))}
                </div>
            )}

            {/* Botones dinámicos para el último paso */}
            {activeStep === elements.length - 1 && (
                <div
                    style={{
                        marginTop: 40,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 10,
                    }}
                >
                    <div style={{ marginRight: 'auto' }}>
                        {elements[activeStep].buttons.find((button) => button.props.label === 'Anterior')}
                    </div>
                    <div style={{ display: 'flex', gap: 30 }}>
                        {elements[activeStep].buttons
                            .filter((button) => button.props.label !== 'Anterior')
                            .map((button, index) => (
                                <React.Fragment key={index}>{button}</React.Fragment>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default StepperComponent;
