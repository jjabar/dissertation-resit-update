import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, Platform } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import  {AntDesign} from "@expo/vector-icons"

const DropDown = ({sensors, handleSelect}) => {
  const [expanded, setExpanded] = useState(false);
 
  const toggleExpanded = useCallback(() => {setExpanded(!expanded)},[expanded])
  
  
  const onSelect = useCallback(async (item) => {
      await handleSelect(item);
      setExpanded(false);
  },[])

  const buttonRef = useRef(null)

  const [top, setTop] = useState(0)

  
  return (
    <View ref={buttonRef} 
      onLayout={event => {
        const layout = event.nativeEvent.layout;
        const topOffset = layout.y;
        const heightOffComponent = layout.height;

        const finalValue = topOffset + heightOffComponent + (Platform.OS === 'android'? -32 : 3)

        setTop(finalValue);
      }}
    >
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.8}
        onPress={toggleExpanded}
      >
        <Text>Select Animal</Text>
        <AntDesign name={expanded ? "caretup" : "caretdown"} />
      </TouchableOpacity>
      {expanded ? (
        <Modal visible={expanded} transparent>
          <TouchableOpacity onPress={() => setExpanded(false)}>
            <View style={styles.backdrop}>
              <View style={[styles.options, {top}]}>
                <FlatList
                  keyExtractor={(item) => item}
                  data={sensors}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      style={styles.optionItem}
                      onPress={() => onSelect(item)}
                    >
                      <Text>{item.toUpperCase()}</Text>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => (
                    <View style={styles.separator} />
                  )}
                />
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      ) : null}
    </View>
  );
}

export default DropDown

const styles = StyleSheet.create({
  options : {
    position: "absolute",
    //top: 53,
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    borderRadius: 6,
    zIndex: 1,
    maxHeight: 350,
  },
  backdrop : {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  optionItem: {
    marginBottom: 20,
    height: 40,
    justifyContent: "center",
  },
  separator: {
    height: 4,
  },
  text: {
    fontSize: 16,
    opacity: 0.8,
  },
  button: {
    height: 50,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 15,
    borderRadius: 8,
  }
})