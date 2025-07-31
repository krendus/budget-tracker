import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export function getCategoryIcon(name: string, color = '#000', size = 20) {
  switch (name) {
    case 'Groceries':
      return <MaterialCommunityIcons name="cart-outline" size={size} color={color} />;
    case 'Salary':
      return <FontAwesome5 name="money-bill-wave" size={size} color={color} />;
    case 'Transport':
      return <Ionicons name="car-outline" size={size} color={color} />;
    case 'Utilities':
      return <MaterialCommunityIcons name="flash-outline" size={size} color={color} />;
    case 'Rent':
      return <FontAwesome5 name="home" size={size} color={color} />;
    default:
      return <MaterialCommunityIcons name="wallet-outline" size={size} color={color} />;
  }
}
