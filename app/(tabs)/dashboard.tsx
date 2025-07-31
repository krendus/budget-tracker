import Text from '@/components/text';
import colors from '@/constants/colors';
import fonts from '@/constants/fonts';
import { getCategoryIcon } from '@/utils/get-category-icon';
import { Link } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const budgetData = [
  {
    name: 'Groceries',
    amount: 300,
    color: '#4CAF50',
    legendFontColor: '#333',
    legendFontSize: 15,
  },
  {
    name: 'Salary',
    amount: 1000,
    color: '#F44336',
    legendFontColor: '#333',
    legendFontSize: 15,
  },
  {
    name: 'Transport',
    amount: 150,
    color: '#2196F3',
    legendFontColor: '#333',
    legendFontSize: 15,
  },
  {
    name: 'Utilities',
    amount: 200,
    color: '#FF9800',
    legendFontColor: '#333',
    legendFontSize: 15,
  },
  {
    name: 'Rent',
    amount: 100,
    color: '#9C27B0',
    legendFontColor: '#333',
    legendFontSize: 15,
  },
];
const transactions = [
  { category: 'Salary', amount: 2500, date: '2025-07-25', type: 'income' },
  { category: 'Groceries', amount: -120, date: '2025-07-24', type: 'expense' },
  { category: 'Transport', amount: -45, date: '2025-07-23', type: 'expense' },
  { category: 'Rent', amount: -700, date: '2025-07-01', type: 'expense' },
  { category: 'Utilities', amount: -90, date: '2025-07-20', type: 'expense' },
];

const Dashboard = () => {
  const insets = useSafeAreaInsets();
  const renderItem: any = ({ item }: any) => {
    const isIncome = item.type === 'income';
    return (
      <View style={styles.item}>
        <View style={styles.icon}>{getCategoryIcon(item.category, isIncome ? '#4CAF50' : '#F44336')}</View>
        <View style={styles.details}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={[styles.amount, { color: isIncome ? '#4CAF50' : '#F44336' }]}>
          {isIncome ? '+' : '-'}€{Math.abs(item.amount)}
        </Text>
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top + 10,
      }}
    >
      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <>
            <View style={styles.headerSection}>
              <View style={styles.profileWrapper}>
                <Image
                  source={require("@/assets/images/dummy/profile.jpg")}
                  style={styles.profile}
                />
                <View>
                  <Text style={styles.name}>Uchenna</Text>
                </View>
              </View>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={{ fontSize: 16, color: "#444" }}>Current Balance</Text>
              <Text
                style={{
                  fontSize: 40,
                  color: "#000",
                  fontFamily: fonts.manrope.semiBold,
                }}
              >
                € 200
              </Text>
            </View>

            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <View style={{ position: "relative" }}>
                <PieChart
                  data={budgetData}
                  width={220}
                  height={220}
                  chartConfig={{
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                  }}
                  accessor={"amount"}
                  backgroundColor={"transparent"}
                  paddingLeft={"55"}
                  hasLegend={false}
                />
              </View>

              <View style={styles.legendContainer}>
                {budgetData.map((item, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View
                      style={[styles.legendColor, { backgroundColor: item.color }]}
                    />
                    <Text style={styles.legendText}>{item.name}</Text>
                  </View>
                ))}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  color: "#000",
                  fontFamily: fonts.manrope.semiBold,
                }}
              >
                Recent Transactions
              </Text>
              <Link href={"/(dashboard)/add-transaction"} style={{
                color: colors.primary,
                fontFamily: fonts.manrope.semiBold,
                fontSize: 16
              }}>Add +</Link>
            </View>
          </>
        }
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 150,
        }}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "#fff" }}
      />


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
    marginVertical: 4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  headerSection: {
    height: 70,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "space-between",
  },
  profile: {
    height: 55,
    width: 55,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: colors.primary
  },
  profileWrapper: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 8
  },
  name: {
    fontFamily: fonts.manrope.bold,
    fontSize: 16
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: '#eee',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  details: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
})

export default Dashboard
