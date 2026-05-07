import { useState } from 'react';
import sc from 'styled-components/native';

import { FilterBottomSheet } from '@/components/organisms/FilterBottomSheet';
import { BottomNavigationBar } from '@/components/organisms/BottomNavigationBar';
import { AddProductScreen, type AddProductTarget } from '@/screens/AddProductScreen';
import { DashboardScreen } from '@/screens/DashboardScreen';
import { FridgeScreen } from '@/screens/FridgeScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';
import { RecipeDetailScreen } from '@/screens/RecipeDetailScreen';
import { RecipeDiscoveryScreen } from '@/screens/RecipeDiscoveryScreen';
import { ShoppingListScreen } from '@/screens/ShoppingListScreen';
import { WeeklyMenuScreen } from '@/screens/WeeklyMenuScreen';

type RootTab = 'home' | 'menu' | 'profile' | 'fridge';
type Route =
  | { screen: 'dashboard' }
  | { screen: 'weekly_menu' }
  | { screen: 'profile' }
  | { screen: 'shopping_list' }
  | { screen: 'add_product'; target: AddProductTarget }
  | { screen: 'recipes' }
  | { screen: 'recipe_detail' }
  | { screen: 'fridge' };

const Container = sc.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Body = sc.View`
  flex: 1;
`;

export function AppFlowScreen() {
  const [activeTab, setActiveTab] = useState<RootTab>('home');
  const [route, setRoute] = useState<Route>({ screen: 'dashboard' });
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  const handleTabChange = (tab: RootTab) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setRoute({ screen: 'dashboard' });
      return;
    }
    if (tab === 'menu') {
      setRoute({ screen: 'weekly_menu' });
      return;
    }
    if (tab === 'profile') {
      setRoute({ screen: 'profile' });
      return;
    }
    setRoute({ screen: 'fridge' });
  };

  const handleSaveToShoppingList = (payload: { name: string; productAmount: string; unit: string }) => {
    setRoute({ screen: 'shopping_list' });
    setActiveTab('home');
    console.log('Saved to shopping list', payload);
  };

  const handleSaveToFridge = (payload: { name: string; productAmount: string; unit: string }) => {
    setRoute({ screen: 'fridge' });
    setActiveTab('fridge');
    console.log('Saved to fridge', payload);
  };

  return (
    <Container>
      <Body>
        {route.screen === 'dashboard' ? (
          <DashboardScreen
            onOpenShoppingList={() => setRoute({ screen: 'shopping_list' })}
            onOpenRecipes={() => {
              setActiveTab('menu');
              setRoute({ screen: 'weekly_menu' });
            }}
          />
        ) : null}

        {route.screen === 'shopping_list' ? (
          <ShoppingListScreen
            onBack={() => setRoute({ screen: 'dashboard' })}
            onAddProduct={() => setRoute({ screen: 'add_product', target: 'shopping_list' })}
          />
        ) : null}

        {route.screen === 'weekly_menu' ? (
          <WeeklyMenuScreen
            onOpenRecipe={() => setRoute({ screen: 'recipe_detail' })}
            onOpenFilters={() => setShowFilterSheet(true)}
          />
        ) : null}

        {route.screen === 'recipes' ? (
          <RecipeDiscoveryScreen onBack={() => setRoute({ screen: 'weekly_menu' })} />
        ) : null}

        {route.screen === 'recipe_detail' ? <RecipeDetailScreen onBack={() => setRoute({ screen: 'weekly_menu' })} /> : null}

        {route.screen === 'profile' ? <ProfileScreen /> : null}

        {route.screen === 'fridge' ? (
          <FridgeScreen onAddProduct={() => setRoute({ screen: 'add_product', target: 'fridge' })} />
        ) : null}

        {route.screen === 'add_product' ? (
          <AddProductScreen
            target={route.target}
            onBack={() => setRoute(route.target === 'fridge' ? { screen: 'fridge' } : { screen: 'shopping_list' })}
            onSaveToShoppingList={handleSaveToShoppingList}
            onSaveToFridge={handleSaveToFridge}
          />
        ) : null}
      </Body>

      <BottomNavigationBar activeTab={activeTab} onChangeTab={handleTabChange} />
      <FilterBottomSheet visible={showFilterSheet} onClose={() => setShowFilterSheet(false)} onApply={() => {}} />
    </Container>
  );
}
