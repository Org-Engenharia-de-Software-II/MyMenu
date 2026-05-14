import { useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';

import { OnboardingScreen } from '@/screens/OnboardingScreen';
import { SignUpScreen } from '@/screens/SignUpScreen';
import { WelcomeScreen } from '@/screens/WelcomeScreen';
import { DashboardScreen } from './DashboardScreen';
import { RecipeDiscoveryScreen } from './RecipeDiscoveryScreen';
import { ShoppingListScreen } from './ShoppingListScreen';

type FlowStep = 'welcome' | 'signup' | 'onboarding' | 'dashboard' | 'shopping-list' | 'recipes';

const flowOrder: FlowStep[] = ['welcome', 'signup', 'onboarding', 'dashboard', 'shopping-list', 'recipes'];

export function AppFlowScreen() {
  const [step, setStep] = useState<FlowStep>('welcome');
  const [transition, setTransition] = useState<{
    from: FlowStep;
    to: FlowStep;
    direction: 1 | -1;
  } | null>(null);
  const progress = useRef(new Animated.Value(0)).current;
  const isTransitioning = useRef(false);

  const animateTo = (nextStep: FlowStep) => {
    if (isTransitioning.current || nextStep === step) {
      return;
    }

    const fromIndex = flowOrder.indexOf(step);
    const toIndex = flowOrder.indexOf(nextStep);
    const direction: 1 | -1 = toIndex > fromIndex ? 1 : -1;

    isTransitioning.current = true;
    setTransition({ from: step, to: nextStep, direction });
    progress.setValue(0);

    Animated.timing(progress, {
      toValue: 1,
      duration: 240,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setStep(nextStep);
        setTransition(null);
      }

      isTransitioning.current = false;
    });
  };

  const renderStep = (currentStep: FlowStep) => {
    if (currentStep === 'signup') {
      return <SignUpScreen onSubmit={() => animateTo('onboarding')} />;
    }

    if (currentStep === 'onboarding') {
      return <OnboardingScreen onFinish={() => animateTo('dashboard')} />;
    }

    if (currentStep === 'dashboard') {
      return <DashboardScreen onOpenShoppingList={() => { animateTo('shopping-list') }} 
      onOpenRecipes={() => { animateTo('recipes') }} />;
    }

    if(currentStep === 'shopping-list') {
      return <ShoppingListScreen onBack={() => animateTo('dashboard')} onAddProduct={() => {}} />
    }

    if(currentStep === 'recipes') {
      return <RecipeDiscoveryScreen onBack={() => animateTo('dashboard')} />
    }

    return <WelcomeScreen onPressEnter={() => animateTo('onboarding')} onPressSignUp={() => animateTo('signup')} />;
  };

  if (!transition) {
    return <View style={styles.container}>{renderStep(step)}</View>;
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.screen,
          styles.absoluteFill,
          {
            opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
            transform: [
              {
                translateX: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -transition.direction * 24],
                }),
              },
            ],
          },
        ]}>
        {renderStep(transition.from)}
      </Animated.View>

      <Animated.View
        style={[
          styles.screen,
          styles.absoluteFill,
          {
            opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [0, 1] }),
            transform: [
              {
                translateX: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [transition.direction * 24, 0],
                }),
              },
            ],
          },
        ]}>
        {renderStep(transition.to)}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
});
