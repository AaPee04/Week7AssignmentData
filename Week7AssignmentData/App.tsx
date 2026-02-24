import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image
} from "react-native";

export default function App() {

  const [memeUrl, setMemeUrl] = useState("");
  const [title, setTitle] = useState("Press Get Meme");
  const [memeType, setMemeType] = useState("short");


  const getMeme = async () => {

    try {

      let attempts = 0;
      let found = false;

      while (!found && attempts < 20) {

        const response = await fetch(
          "https://meme-api.com/gimme"
        );

        const data = await response.json();

        const length = data.title.length;

        if (
          (memeType === "short" && length < 20) ||
          (memeType === "medium" && length >= 20 && length <= 40) ||
          (memeType === "long" && length > 40)
        ) {

          setMemeUrl(data.url);
          setTitle(data.title);
          found = true;

        }

        attempts++;
      }

      if (!found) {
        setTitle("No meme found, try again");
      }

    } catch (error) {

      setTitle("Error loading meme");

    }

  };


  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Meme Generator App
      </Text>


      <Text style={styles.label}>
        Select meme length:
      </Text>


      <View style={styles.buttons}>

        <Button
          title="Short"
          onPress={() => setMemeType("short")}
        />

        <Button
          title="Medium"
          onPress={() => setMemeType("medium")}
        />

        <Button
          title="Long"
          onPress={() => setMemeType("long")}
        />

      </View>


      <Button
        title="Get Meme"
        onPress={getMeme}
      />


      <Text style={styles.memeTitle}>
        {title}
      </Text>


      {memeUrl !== "" && (

        <Image
          source={{ uri: memeUrl }}
          style={styles.image}
          resizeMode="contain"
        />

      )}

    </View>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#e6f2ff",
    alignItems: "center",
    justifyContent: "center"
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20
  },

  label: {
    fontSize: 16,
    marginBottom: 5
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginBottom: 15
  },

  memeTitle: {
    marginTop: 15,
    marginBottom: 10,
    fontSize: 16,
    textAlign: "center",
    width: "90%"
  },

  image: {
    width: "95%",
    height: 400
  }

});