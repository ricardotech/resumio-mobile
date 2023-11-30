import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function UploadImageScreen(pickImage: any, uploadImage: any) {
  return (
    <SafeAreaView>
        <TouchableOpacity onPress={pickImage}>
            <Text>Upload Image</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}