import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Pressable,
} from 'react-native'

export default function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')
  const [selectedId, setSelectedId] = useState()

  const renderItem = ({ item }) => <Item text={item.text} id={item.id} />
  const Item = ({ text, id }) => (
    <View style={styles.item}>
      <Pressable
        onPress={() => {
          setSelectedId(id)
          removeTodo(id)
        }}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
    </View>
  )
  function addTodo() {
    const newTodo = { id: Date.now(), text: todo }
    setTodos([...todos, newTodo])
    setTodo('')
  }

  function removeTodo(id) {
    const newTodos = todos.filter(todo => todo.id !== id)
    console.log(newTodos)
    setTodos(newTodos)
  }
  return (
    <View style={styles.container}>
      <Text>Enter your Todo</Text>
      <StatusBar style="auto" />
      <TextInput
        style={styles.input}
        onChangeText={text => setTodo(text)}
        value={todo}
        placeholder="Enter the Todo"
        keyboardType="default"
      />
      <Button title="Add Todo" onPress={() => addTodo()} />

      <FlatList
        data={todos}
        renderItem={renderItem}
        extraData={selectedId}
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    padding: 5,
    borderWidth: 2,
    height: 40,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 12,
    width: '100%',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  item: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 4,
    marginVertical: 4,
    borderRadius: 4,
  },
})
