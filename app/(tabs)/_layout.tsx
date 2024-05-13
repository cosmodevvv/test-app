import { Tabs, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { privetRoutes, publicRoutes } from '@/routes';
import { useAppSelector } from '@/hooks/useRedux';
import { getFocusedRouteNameFromRoute, useRoute } from '@react-navigation/native';
import { View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

	const { isAuth } = useAppSelector(state => state.auth)

	const navigation = useNavigation()

	const route = useRoute();
	const currentRoute = getFocusedRouteNameFromRoute(route); 



	useEffect(() => {		
		console.log(currentRoute)
		const unsubscribe = navigation.addListener('state', () => {
			if (!isAuth && privetRoutes.some(route => route.name === currentRoute)) {
			navigation.navigate(publicRoutes[0].name)
		}});
	
			if (isAuth) {
				if (publicRoutes.some(route => route.name === currentRoute)) {
					navigation.navigate(privetRoutes[0].name)
				}
			} else {
				if (privetRoutes.some(route => route.name === currentRoute)) {
					navigation.navigate(publicRoutes[0].name)
				}
			}
		return unsubscribe;
	}, [navigation, isAuth, currentRoute]);
	
  return (
			<Tabs
			
      screenOptions={() => ({
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
				tabBarStyle: {
					display: isAuth ? 'flex' : 'none',
				}
      })}>
					{publicRoutes.map((route) => (
						<Tabs.Screen
							name={route.name}
							key={route.name}
							options={{
								title: route.title,
								tabBarIcon: ({ color }) => <TabBarIcon name={route.icon} color='#ff0080' />,
								href: null,
							}}
						/>
					))}
						{privetRoutes.map((route) => (
								<Tabs.Screen
									name={route.name}
									key={route.name}
									options={{
										title: route.title,
										tabBarIcon: ({ color }) => <TabBarIcon name={route.icon} color={route.name === currentRoute ? '#ff0080' : 'black'} />,
										href: !isAuth ? null : route.path,
									}}
								/>
						))}
			</Tabs>	
  );
}
