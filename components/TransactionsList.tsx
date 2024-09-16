import { TouchableOpacity, View, Text } from 'react-native';
import { Category, Transaction } from "../types"
import TransactionListItem from './TransactionListItem';

export default function TrasactionList({
    transactions,
    categories,
    deleteTransaction,
} : {
    categories: Category[];
    transactions: Transaction[];
    deleteTransaction: (id: number) => Promise<void>;
}) {
    return (
        <View style = {{ gap: 15}}>
            {transactions.map((transaction) => {
                const categoryCurrentItem = categories.find(
                    (category) => category.id === transaction.category_id
                )
                return (
                    <TouchableOpacity
                        key={transaction.id}
                        activeOpacity={.7}
                        onLongPress={() => deleteTransaction(transaction.id)}
                    >
                        <TransactionListItem 
                            transaction={transaction} 
                            categoryInfo={categoryCurrentItem}>

                        </TransactionListItem>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}