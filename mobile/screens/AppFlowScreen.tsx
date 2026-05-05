import { useState } from 'react';

import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { SignUpScreen } from '@/screens/SignUpScreen';
import { WelcomeScreen } from '@/screens/WelcomeScreen';

type FlowStep = 'welcome' | 'signup' | 'onboarding';

export function AppFlowScreen() {
  const [step, setStep] = useState<FlowStep>('welcome');

  if (step === 'signup') {
    return <SignUpScreen onSubmit={() => setStep('onboarding')} />;
  }

  if (step === 'onboarding') {
    return <OnboardingScreen onFinish={() => setStep('welcome')} />;
  }

  return (
    <WelcomeScreen
      onPressEnter={() => setStep('onboarding')}
      onPressSignUp={() => setStep('signup')}
    />
  );
}
