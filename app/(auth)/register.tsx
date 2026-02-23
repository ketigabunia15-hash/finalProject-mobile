import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Register(){

  return(
    <View style={{flex:1, justifyContent:"center", padding:20}}>

      <Text style={{fontSize:26, marginBottom:20}}>Register</Text>

      <TextInput placeholder="Name" style={{borderWidth:1,padding:12,marginBottom:10}}/>
      <TextInput placeholder="Email" style={{borderWidth:1,padding:12,marginBottom:10}}/>
      <TextInput placeholder="Password" secureTextEntry style={{borderWidth:1,padding:12}}/>

      <TouchableOpacity
        onPress={()=>router.back()}
        style={{marginTop:20}}
      >
        <Text style={{color:"#2437AB", textAlign:"center"}}>
          ← Back to Login
        </Text>
      </TouchableOpacity>

    </View>
  );
}

