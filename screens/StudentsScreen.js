import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import {useEffect, useState} from 'react';
export default function StudentsScreen({ navigation }) {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        // Fetch students from the API when the component mounts
        fetch("https://bora.kipchirchir.co.ke/students")
            .then((response) => response.json())
            .then((data) => setStudents(data.students))
            .catch((error) => console.error("Error fetching students:", error));
    }, []);
    return ( 
        <View >
            <Text style={styles.heading}>Students Screen</Text>
            <Button 
                title="Add Student" 
                onPress={() => navigation.navigate('Details')} 
                style={styles.button}
                />
            <Text style={styles.text}>Shule Bora Students List Below. </Text>
            <FlatList
                data={students}
                keyExtractor={(item) => item.student_id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.student}>
                        <Text style={styles.text}>{item.student_name}</Text>
                        <Text style={styles.text}>{item.admission_number}</Text>
                    </View>
                )}
            />
        </View>
    )
} 

const styles = StyleSheet.create({
    heading: { fontSize: 34, marginBottom: 20, color: 'pink' },
    text: { fontSize: 24, marginBottom: 20 },
    button: { fontSize: 24, marginBottom: 20, backgroundColor: 'pink' },
    student: { fontSize: 20, marginBottom: 10, backgroundColor: '#FFf0F5', padding: 10, borderRadius: 5, marginTop: 10, borderWidth: 1, borderColor: 'pink' }
})