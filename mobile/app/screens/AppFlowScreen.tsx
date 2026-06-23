import { useCallback, useEffect, useRef, useState } from 'react';
import Constants from 'expo-constants';
import { Animated, Easing, Platform, StyleSheet, View } from 'react-native';

import { identifyFoodCategory } from '@/app/services/identifyFoodCategory';
import { AddProductScreen, AddProductTarget } from '@/app/screens/AddProductScreen';
import { OnboardingScreen } from '@/app/screens/OnboardingScreen';
import { SignUpScreen } from '@/app/screens/SignUpScreen';
import { WelcomeScreen } from '@/app/screens/WelcomeScreen';
import { DashboardScreen } from './DashboardScreen';
import { RecipeDetailScreen } from './RecipeDetailScreen';
import { RecipeDiscoveryScreen } from './RecipeDiscoveryScreen';
import { ShoppingListScreen } from './ShoppingListScreen';
import { WeeklyMenuScreen } from './WeeklyMenuScreen';

type FlowStep = 'welcome' | 'signup' | 'login' | 'onboarding' | 'dashboard' | 'shopping-list' | 'add-product' | 'recipes' | 'recipe-detail' | 'weekly-menu';

type Session = {
  userId: number;
  listId: number;
  name: string;
};

type ShoppingItem = {
  id: string;
  name: string;
  quantity: string;
  checked: boolean;
  category: string;
};

type MealEntry = {
  period: string;
  meal: string;
};

type RecipeItem = {
  id: string;
  title: string;
  image: string;
  time: string;
  difficulty: string;
};

type SelectedRecipe = RecipeItem | null;

type BackendRecipe = {
  id?: number;
  nome?: string;
  imagemUrl?: string;
  tempoPreparo?: number;
  nivelDificuldade?: string;
};

type BackendMealItem = {
  diaDaSemana?: string;
  tipoRefeicao?: string;
  receita?: BackendRecipe;
};

type ExpoHostUri = {
  hostUri?: string;
};

type ExpoManifest = {
  debuggerHost?: string;
};

const flowOrder: FlowStep[] = ['welcome', 'signup', 'login', 'onboarding', 'dashboard', 'shopping-list', 'add-product', 'recipes', 'recipe-detail', 'weekly-menu'];
const API_PORT = 8080;
const FALLBACK_LIST_ID = 1;
const RECIPE_FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=60';

export function AppFlowScreen() {
  const [step, setStep] = useState<FlowStep>('welcome');
  const [transition, setTransition] = useState<{
    from: FlowStep;
    to: FlowStep;
    direction: 1 | -1;
  } | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [shoppingItems, setShoppingItems] = useState<ShoppingItem[]>([]);
  const [menuMeals, setMenuMeals] = useState<MealEntry[]>([]);
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<SelectedRecipe>(null);
  const [recipeDetailBackStep, setRecipeDetailBackStep] = useState<FlowStep>('recipes');
  const addTarget: AddProductTarget = 'shopping_list';
  const [authLoading, setAuthLoading] = useState(false);
  const [onboardingLoading, setOnboardingLoading] = useState(false);
  const [shoppingLoading, setShoppingLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [menuLoading, setMenuLoading] = useState(false);
  const [recipeActionLoading, setRecipeActionLoading] = useState(false);
  const [recipesLoading, setRecipesLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [onboardingError, setOnboardingError] = useState('');
  const [shoppingError, setShoppingError] = useState('');
  const [addError, setAddError] = useState('');
  const [menuError, setMenuError] = useState('');
  const [recipeActionError, setRecipeActionError] = useState('');
  const [recipesError, setRecipesError] = useState('');
  const progress = useRef(new Animated.Value(0)).current;
  const isTransitioning = useRef(false);

  const animateTo = useCallback((nextStep: FlowStep) => {
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
  }, [progress, step]);

  const resolveApiBaseUrl = useCallback(() => {
    if (Platform.OS === 'web') {
      return `http://localhost:${API_PORT}`;
    }

    if (Platform.OS === 'android') {
      return `http://10.0.2.2:${API_PORT}`;
    }

    const hostFromExpoConfig = (Constants.expoConfig?.hostUri ?? '') as string;
    if (hostFromExpoConfig) {
      const host = hostFromExpoConfig.split(':')[0];
      if (host) {
        return `http://${host}:${API_PORT}`;
      }
    }

    const manifest = Constants.manifest as ExpoHostUri & ExpoManifest;
    const debuggerHost = manifest?.debuggerHost ?? manifest?.hostUri ?? '';
    if (debuggerHost) {
      const host = debuggerHost.split(':')[0];
      if (host) {
        return `http://${host}:${API_PORT}`;
      }
    }

    return `http://localhost:${API_PORT}`;
  }, []);

  const normalizeUnit = useCallback((unit: string): string => {
    if (unit === 'unidades') {
      return 'unidade';
    }
    return unit;
  }, []);

  const resolveUserListId = useCallback(async (userId: number): Promise<number> => {
    const response = await fetch(`${resolveApiBaseUrl()}/listas/usuario/${userId}`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Falha ao localizar lista do usuário.');
    }
    const lista = await response.json();
    return Number(lista.id || FALLBACK_LIST_ID);
  }, [resolveApiBaseUrl]);

  const mapListResponseToItems = useCallback((lista: any): ShoppingItem[] => {
    if (!lista || !Array.isArray(lista.itens)) {
      return [];
    }

    return lista.itens.map((item: any) => ({
      id: String(item.id),
      name: item.ingrediente?.nome ?? '',
      quantity: `${item.quantidade} ${item.unidadeMedida}`,
      checked: Boolean(item.comprado),
      category: item.categoria || identifyFoodCategory(item.ingrediente?.nome ?? ''),
    }));
  }, []);

  const mapRecipe = useCallback((recipe: BackendRecipe): RecipeItem => ({
    id: String(recipe.id ?? Math.random()),
    title: recipe.nome ?? 'Receita',
    image: recipe.imagemUrl ?? RECIPE_FALLBACK_IMAGE,
    time: `${recipe.tempoPreparo ?? 0} minutos`,
    difficulty: recipe.nivelDificuldade ?? 'médio',
  }), []);

  const syncRecipes = useCallback(async (sessionData?: Session) => {
    const currentSession = sessionData ?? session;
    if (!currentSession) {
      return;
    }

    setRecipesLoading(true);
    setRecipesError('');
    try {
      const response = await fetch(`${resolveApiBaseUrl()}/receitas/sugestoes/${currentSession.userId}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Falha ao carregar receitas.');
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        setRecipes([]);
        return;
      }
      setRecipes(data.map((item: BackendRecipe) => mapRecipe(item)));
    } catch (error) {
      setRecipesError(error instanceof Error ? error.message : 'Erro inesperado ao carregar receitas.');
    } finally {
      setRecipesLoading(false);
    }
  }, [mapRecipe, resolveApiBaseUrl, session]);

  const getLatestCardapio = useCallback((cardapios: any[]) => {
    if (!Array.isArray(cardapios) || cardapios.length === 0) {
      return null;
    }

    return [...cardapios].sort((a, b) => {
      const left = new Date(b?.dataInicio ?? 0).getTime();
      const right = new Date(a?.dataInicio ?? 0).getTime();
      return left - right;
    })[0] ?? null;
  }, []);

  const getTodayDayAbbreviation = useCallback((): string => {
    const days = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    const today = new Date().getDay();
    return days[today];
  }, []);

  const mapMenuItems = useCallback((items: BackendMealItem[]): MealEntry[] => {
    const refeicoes = ['café da manhã', 'almoço', 'jantar'];
    const todayDay = getTodayDayAbbreviation();
    console.log("Unfiltered: ", items)
    console.log("Filtered: ", items
      .filter((item) => item.receita?.nome && item.diaDaSemana?.substring(0, 3).toUpperCase() === todayDay))
    return items
      .filter((item) => item.receita?.nome && item.diaDaSemana?.substring(0, 3).toUpperCase() === todayDay)
      .sort((a, b) => {
        const refA = refeicoes.indexOf((a.tipoRefeicao ?? '').toLowerCase());
        const refB = refeicoes.indexOf((b.tipoRefeicao ?? '').toLowerCase());
        return refA - refB;
      })
      .map((item) => ({
        period: item.tipoRefeicao ?? 'Refeição',
        meal: item.receita?.nome ?? '',
      }));
  }, [getTodayDayAbbreviation]);

  useEffect(() => {
    if (!session?.userId) {
      setMenuMeals([]);
      return;
    }

    const userId = session.userId;

    async function fetchCardapios() {
      try {
        const response = await fetch(`${resolveApiBaseUrl()}/usuarios/${userId}/cardapio`);
        console.log("RESPONSE CARDAPIO", response)
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'Falha ao carregar cardápios.');
        }
        const data = await response.json();
        const latestCardapio = getLatestCardapio(data);
        setMenuMeals(mapMenuItems(latestCardapio?.itensCardapio || []));
      } catch (err) {
        setMenuError(err instanceof Error ? err.message : 'Erro ao carregar cardápios.');
      }
    }

    fetchCardapios();
  }, [getLatestCardapio, mapMenuItems, resolveApiBaseUrl, session?.userId]);

  const generateWeeklyMenu = useCallback(async () => {
    if (!session) {
      setMenuError('Sessão inválida. Faça login novamente.');
      return;
    }

    setMenuLoading(true);
    setMenuError('');
    try {
      const response = await fetch(`${resolveApiBaseUrl()}/usuarios/${session.userId}/cardapio/gerar`, {
        method: 'POST',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Falha ao gerar cardápio semanal.');
      }

      const cardapio = await response.json();
      const itens = Array.isArray(cardapio?.itensCardapio) ? cardapio.itensCardapio : [];
      setMenuMeals(mapMenuItems(itens));
      await syncRecipes();
      animateTo('weekly-menu');
    } catch (error) {
      setMenuError(error instanceof Error ? error.message : 'Erro inesperado ao gerar cardápio.');
    } finally {
      setMenuLoading(false);
    }
  }, [animateTo, mapMenuItems, resolveApiBaseUrl, session, syncRecipes]);

  const addRecipeToMenu = useCallback(async (recipe: RecipeItem, day: string) => {
    if (!session) {
      setRecipeActionError('Sessão inválida. Faça login novamente.');
      return;
    }

    setRecipeActionLoading(true);
    setRecipeActionError('');

    try {
      const response = await fetch(`${resolveApiBaseUrl()}/usuarios/${session.userId}/cardapio/itens`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receitaId: Number(recipe.id),
          diaDaSemana: day,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Falha ao adicionar receita ao cardápio.');
      }

      const cardapio = await response.json();
      const itens = Array.isArray(cardapio?.itensCardapio) ? cardapio.itensCardapio : [];
      setMenuMeals(mapMenuItems(itens));
      animateTo('weekly-menu');
    } catch (error) {
      setRecipeActionError(error instanceof Error ? error.message : 'Erro inesperado ao adicionar receita ao cardápio.');
    } finally {
      setRecipeActionLoading(false);
    }
  }, [animateTo, mapMenuItems, resolveApiBaseUrl, session]);

  const syncShoppingList = useCallback(async (sessionData?: Session) => {
    const currentSession = sessionData ?? session;
    if (!currentSession) {
      return;
    }

    setShoppingLoading(true);
    setShoppingError('');
    try {
      const response = await fetch(`${resolveApiBaseUrl()}/listas/${currentSession.listId}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Falha ao sincronizar lista.');
      }
      const data = await response.json();
      setShoppingItems(mapListResponseToItems(data));
    } catch (error) {
      setShoppingError(error instanceof Error ? error.message : 'Erro inesperado ao sincronizar lista.');
    } finally {
      setShoppingLoading(false);
    }
  }, [mapListResponseToItems, resolveApiBaseUrl, session]);

  const renderStep = (currentStep: FlowStep) => {
    if (currentStep === 'signup') {
      return (
        <SignUpScreen
          mode="signup"
          isLoading={authLoading}
          errorMessage={authError}
          onBack={() => animateTo('welcome')}
          onSubmit={async ({ name, email, password, goal }) => {
            setAuthLoading(true);
            setAuthError('');
            try {
              const response = await fetch(`${resolveApiBaseUrl()}/usuarios`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome: name, email, senha: password, objetivo: goal }),
              });
              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Falha no cadastro.');
              }
              const user = await response.json();
              let listId = FALLBACK_LIST_ID;
              try {
                listId = await resolveUserListId(Number(user.id));
              } catch {
                listId = FALLBACK_LIST_ID;
              }
              setSession({ userId: Number(user.id), listId, name: user.nome ?? name });
              animateTo('onboarding');
            } catch (error) {
              setAuthError(error instanceof Error ? error.message : 'Erro inesperado no cadastro.');
            } finally {
              setAuthLoading(false);
            }
          }}
        />
      );
    }

    if (currentStep === 'login') {
      return (
        <SignUpScreen
          mode="login"
          isLoading={authLoading}
          errorMessage={authError}
          onBack={() => animateTo('welcome')}
          onSubmit={async ({ email, password }) => {
            setAuthLoading(true);
            setAuthError('');
            try {
              const response = await fetch(`${resolveApiBaseUrl()}/usuarios/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha: password }),
              });
              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Falha no login.');
              }
              const user = await response.json();
              let listId = FALLBACK_LIST_ID;
              try {
                listId = await resolveUserListId(Number(user.id));
              } catch {
                listId = FALLBACK_LIST_ID;
              }
              const nextSession = { userId: Number(user.id), listId, name: user.nome ?? '' };
              setSession(nextSession);

              await syncShoppingList(nextSession);
              animateTo('dashboard');
            } catch (error) {
              setAuthError(error instanceof Error ? error.message : 'Erro inesperado no login.');
            } finally {
              setAuthLoading(false);
            }
          }}
        />
      );
    }

    if (currentStep === 'onboarding') {
      return (
        <OnboardingScreen
          isLoading={onboardingLoading}
          errorMessage={onboardingError}
          onFinish={async (payload) => {
            if (!session) {
              setOnboardingError('Sessão inválida. Faça login novamente.');
              return;
            }
            setOnboardingLoading(true);
            setOnboardingError('');
            try {
              const response = await fetch(`${resolveApiBaseUrl()}/usuarios/${session.userId}/preferencias`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
              });
              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Falha ao salvar onboarding.');
              }
              await syncShoppingList(session);
              animateTo('dashboard');
            } catch (error) {
              setOnboardingError(error instanceof Error ? error.message : 'Erro inesperado no onboarding.');
            } finally {
              setOnboardingLoading(false);
            }
          }}
        />
      );
    }

    if (currentStep === 'dashboard') {
      return (
        <DashboardScreen
          menuMeals={menuMeals}
          isGeneratingMenu={menuLoading}
          menuError={menuError}
          onGenerateWeeklyMenu={generateWeeklyMenu}
          onOpenShoppingList={() => {
            animateTo('shopping-list');
          }}
          onOpenRecipes={async () => {
            await syncRecipes();
            animateTo('recipes');
          }}
          onOpenWeeklyMenu={() => {
            animateTo('weekly-menu');
          }}
          name={session?.name ?? 'Usuário'}
        />
      );
    }

    if (currentStep === 'shopping-list') {
      return (
        <ShoppingListScreen
          onBack={() => animateTo('dashboard')}
          onAddProduct={() => animateTo('add-product')}
          onRefresh={syncShoppingList}
          onToggleItem={async (itemId) => {
            if (!session) {
              return;
            }
            setShoppingLoading(true);
            setShoppingError('');
            try {
              const response = await fetch(`${resolveApiBaseUrl()}/listas/${session.listId}/itens/${itemId}/comprado`, {
                method: 'PATCH',
              });
              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Falha ao atualizar item.');
              }
              const data = await response.json();
              setShoppingItems(mapListResponseToItems(data));
            } catch (error) {
              setShoppingError(error instanceof Error ? error.message : 'Erro ao atualizar item.');
            } finally {
              setShoppingLoading(false);
            }
          }}
          isLoading={shoppingLoading}
          errorMessage={shoppingError}
          items={shoppingItems}
        />
      );
    }

    if (currentStep === 'add-product') {
      return (
        <AddProductScreen
          target={addTarget}
          isLoading={addLoading}
          errorMessage={addError}
          onBack={() => animateTo('shopping-list')}
          onSaveToShoppingList={async ({ name, productAmount, unit }) => {
            if (!session) {
              setAddError('Sessão inválida.');
              return;
            }
            setAddLoading(true);
            setAddError('');
            try {
              const response = await fetch(`${resolveApiBaseUrl()}/listas/${session.listId}/itens`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    nomeIngrediente: name,
                    quantidade: Number(productAmount),
                    unidade: normalizeUnit(unit),
                    categoria: identifyFoodCategory(name),
                  }),

              });
              if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || 'Falha ao adicionar item na lista.');
              }
              const data = await response.json();
              setShoppingItems(mapListResponseToItems(data));
              animateTo('shopping-list');
            } catch (error) {
              setAddError(error instanceof Error ? error.message : 'Erro inesperado ao adicionar item.');
            } finally {
              setAddLoading(false);
            }
          }}
          onSaveToFridge={() => {}}
        />
      );
    }

    if (currentStep === 'recipes') {
      return (
        <RecipeDiscoveryScreen
          onBack={() => animateTo('dashboard')}
          recipes={recipes}
          isLoading={recipesLoading}
          errorMessage={recipesError}
          onRefresh={syncRecipes}
          onViewRecipe={(recipe) => {
            setSelectedRecipe(recipe);
            setRecipeDetailBackStep('recipes');
            animateTo('recipe-detail');
          }}
        />
      );
    }

    if (currentStep === 'recipe-detail') {
      return (
        <RecipeDetailScreen
          onBack={() => animateTo(recipeDetailBackStep)}
          recipe={selectedRecipe}
          onAddToMenu={addRecipeToMenu}
          isAddingToMenu={recipeActionLoading}
          addToMenuError={recipeActionError}
        />
      );
    }

    if (currentStep === 'weekly-menu') {
      return (
        <WeeklyMenuScreen
          userId={session?.userId ?? 0}
          apiBaseUrl={resolveApiBaseUrl()}
          onOpenFilters={() => {}}
          onGenerateMenu={generateWeeklyMenu}
          onViewDetails={(recipe) => {
            setSelectedRecipe(recipe);
            setRecipeDetailBackStep('weekly-menu');
            animateTo('recipe-detail');
          }}
          onBack={() => animateTo('dashboard')}
        />
      );
    }

    return <WelcomeScreen onPressEnter={() => animateTo('login')} onPressSignUp={() => animateTo('signup')} />;
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
