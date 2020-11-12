import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, Button } from 'react-native';
import { Picker } from '@react-native-community/picker'

{/**
Installation
expo install @react-native-community/picker  cung cấp quyền truy cập vào giao diện người dùng hệ thống để chọn giữa một số tùy chọn.
 */}

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [status, setStatus] = useState("Active");
  let obj = {
    name: name,
    email: email,
    gender: gender,
    status: status
  }
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://www.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" }}
        style={
          {
            width: 100,
            height: 100
          }
        }></Image>
      <TextInput
        style={styles.textInput}
        placeholder="Name"
        onChangeText={
          (text) => {
            setName(text)
          }
        }></TextInput>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        textContentType="emailAddress"
        onChangeText={
          (text) => {
            setEmail(text)
          }
        }></TextInput>

      <Picker
        onValueChange={
          (itemValue) => {
            setGender(itemValue);
            // Alert.alert(gender)
          }
        }
        selectedValue={gender}
        style={
          {
            height: 50,
            width: `80%`
          }

        }>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
      </Picker>

      <Picker
        onValueChange={
          (itemValue) => {
            setStatus(itemValue);
          }
        }
        selectedValue={status}
        style={
          {
            height: 50,
            width: `80%`
          }

        }>
        <Picker.Item label="Active" value="Active" />
        <Picker.Item label="Inactive" value="Inactive" />
      </Picker>
      <Button
        title="Register"
        onPress={
          () => {
            fetch('https://gorest.co.in/public-api/users', {
              method: 'POST', // or 'PUT'
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 3625e9e67dd73f52fbc4c37e6af186d9ca6759a3ba5a0dfd444602b5c1d8c2ee'
              },
              body: JSON.stringify(obj),
            })
              .then(response => response.json())
              .then(data => {
                if (data.code == '422') {
                  Alert.alert(`Đăng ký thất bại`, ` Email đã tồn tại hoặc nhập sai định dạng email`)
                }
                else if (data.code == '201') {
                  Alert.alert("Thêm dữ liệu thành công")
                }
                else {
                  Alert.alert("Lỗi không xác định: " + data.code)
                }
              })
              .catch((error) => {
                console.error('Error:', error);
              });
          }
        }
      ></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    width: `80%`,
    borderWidth: 1,
    borderColor: "cyan",
    borderRadius: 5,
    padding: 10,
    margin: 10,

  }
});
