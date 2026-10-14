import { View, Text, Button, StyleSheet } from 'react-native';

export default function SubjectsScreen({ navigation }) {
    return ( 
        <View >
            <Text style={styles.heading}>Subjects Screen</Text>
            <Button 
                title="Add Subject" 
                onPress={() => navigation.navigate('Details')} 
                style={styles.button}
                />
            <Text style={styles.text}>Shule Bora Subjects List Below. </Text>
            
        </View>
    )
} 

const styles = StyleSheet.create({
    heading: { fontSize: 34, marginBottom: 20, color: 'pink' },
    text: { fontSize: 24, marginBottom: 20 },
    button: { fontSize: 24, marginBottom: 20, backgroundColor: 'pink', color: 'white' },
    student: { fontSize: 20, marginBottom: 10, backgroundColor: '#FFf0F5', padding: 10, borderRadius: 5, marginTop: 10, borderWidth: 1, borderColor: 'pink' }
})