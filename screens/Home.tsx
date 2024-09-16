import * as React from 'react';
import { ScrollView, Text, View } from "react-native";
import { Category, Transaction } from '../types';
import { useSQLiteContext } from 'expo-sqlite';
import TransactionsList from '../components/TransactionsList';

export default function Home() {
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);

    const db = useSQLiteContext();

    React.useEffect(() => {
        db.withTransactionAsync(async () => {
            await getData();
        });
    }, [db]);

    async function getData() {
        const result = await db.getAllAsync<Transaction>(`SELECT * FROM TRANSACTIONS ORDER BY date DESC;`);
        setTransactions(result);

        const categoryResult = await db.getAllAsync<Category>(`SELECT * FROM Categories;`);
        setCategories(categoryResult);
    }

    async function deleteTransaction(id: number) {
        db.withTransactionAsync(async () => {
            await db.runAsync(`DELETE FROM Transactions WHERE id = ?;`, [id]);
            await getData();
        });
    }

    return (
        <ScrollView contentContainerStyle={{padding: 15, paddingVertical: 170}}>
            <TransactionsList 
                categories={categories}
                transactions={transactions}
                deleteTransaction={deleteTransaction}
            />
        </ScrollView>
    );
}