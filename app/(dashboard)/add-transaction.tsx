import Button from '@/components/button'
import DatePicker from '@/components/date-picker'
import Dropdown from '@/components/dropdown'
import Input from '@/components/input'
import fonts from '@/constants/fonts'
import { HORIZONTAL_PADDING } from '@/constants/sizes'
import useFormFields from '@/hooks/use-form-fields'
import { handleAPIError } from '@/utils/error-handler'
import { showToast } from '@/utils/toast'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const AddTransaction = () => {
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState(false)
    const { fields, errors, onChange } = useFormFields({
        amount: "",
        date: new Date(),
        category: ""
    })
    const handleAddTransaction = async () => {
        if (loading) return;
        setLoading(true);
        try {
            // remove this when you want to integrate the API. I am just using it for simulation
            await new Promise((resolve) => {
                setTimeout(resolve, 2000)
            })
            showToast("success", "Transaction added successfully")
            router.replace("/(tabs)/dashboard")
        } catch (error: any) {
            handleAPIError(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <SafeAreaView style={
            [styles.container]} >
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.header}>Add Transaction</Text>
            </View>
            <View style={{ paddingHorizontal: HORIZONTAL_PADDING, paddingVertical: 20, rowGap: 20 }}>
                {/* I want a input of amount and date picker and dropdown of categories */}
                <Input
                    value={fields.amount}
                    onChangeText={(text: string) => {
                        onChange("amount", text)
                    }}
                    label={"Amount"}
                    placeholder="Enter amount"
                    error={errors.amount}
                    inputMode='decimal'
                    accessibilityHint='Enter your firstname'
                />
                <Dropdown
                    value={fields.category}
                    onChangeText={(text: string) => {
                        onChange("category", text)
                    }}
                    label={"Category"}
                    placeholder="Select Category"
                    error={errors.category}
                    items={[
                        { label: 'Groceries', value: 'Groceries' },
                        { label: 'Salary', value: 'Salary' },
                        { label: 'Transport', value: 'Transport' },
                        { label: 'Utilities', value: 'Utilities' },
                        { label: 'Rent', value: 'Rent' },
                    ]}
                />
                <DatePicker
                    value={fields.date}
                    onChangeText={(date: Date) => {
                        onChange("date", date)
                    }}
                    label={"Date"}
                    error={errors.date}
                    accessibilityHint='Pick date'
                />
                <Button
                    title='Add Transaction'
                    loading={loading}
                    onPress={handleAddTransaction}
                    buttonStyle={{
                        marginTop: 20
                    }}
                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    headerContainer: {
        height: 70,
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: HORIZONTAL_PADDING,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        columnGap: 16
    },
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        fontSize: 18,
        fontFamily: fonts.manrope.bold,
        paddingRight: 40
    },
    backBtn: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
});

export default AddTransaction
