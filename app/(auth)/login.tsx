import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import Checkbox from "expo-checkbox";
import { useEffect, useState } from "react";

const schema = yup.object({
  username: yup.string().required(),
  password: yup.string().required()
});

export default function Login() {

  const [rememberMe, setRememberMe] = useState(false);

  const { control, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(()=>{
    checkAuth();
  },[]);

  const checkAuth = async()=>{
    const token = await AsyncStorage.getItem("token");
    if(token) router.replace("/(tabs)");
  };

  const onSubmit = async(data:any)=>{

    try{

      const response = await fetch(
        "https://fakestoreapi.com/auth/login",
        {
          method:"POST",
          headers:{ "Content-Type":"application/json" },
          body: JSON.stringify(data)
        }
      );

      const result = await response.json();

      if(!response.ok) throw new Error();

      if(rememberMe){
        await AsyncStorage.setItem("token", result.token);
      }

      router.replace("/(tabs)");

    }catch{
      Alert.alert("Login failed");
    }
  };

  return(
    <View style={{flex:1, justifyContent:"center", padding:20}}>

      <Text style={{fontSize:26, marginBottom:20}}>Login</Text>

      <Controller
        control={control}
        name="username"
        render={({field:{onChange,value}})=>(
          <TextInput
            placeholder="Username"
            value={value}
            onChangeText={onChange}
            style={{borderWidth:1,padding:12,marginBottom:10}}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({field:{onChange,value}})=>(
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            style={{borderWidth:1,padding:12}}
          />
        )}
      />

      <Checkbox value={rememberMe} onValueChange={setRememberMe}/>
      <Text>Remember me</Text>

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={{backgroundColor:"#4A6CF7", padding:15, marginTop:20}}
      >
        <Text style={{color:"#fff", textAlign:"center"}}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={()=>router.push("/(auth)/register")}
        style={{marginTop:20}}
      >
        <Text style={{textAlign:"center", color:"#2437AB"}}>
          Register
        </Text>
      </TouchableOpacity>

    </View>
  );
}

