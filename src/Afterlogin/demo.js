import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';


const CheckBox = ({ isChecked, onPress, size = 15 }) => {
  return (
    <TouchableOpacity style={{ width: size, height: size }} onPress={onPress}>
      {isChecked ? (
        <Image
          style={{ width: size, height: size }}
          source={require('./assets/green.png')}
        />
      ) : (
        <Image
          style={{ width: size, height: size }}
          source={require('./assets/grey.png')}
        />
      )}
    </TouchableOpacity>
  );
};

const CheckBoxWithoutSquare = ({ isChecked, onPress, size = 20 }) => {
  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      {isChecked ? (
        <Image
          style={{ width: size, height: size }}
          source={require('./assets/green.png')}
        />
      ) : (
        <Image
          style={{ width: size, height: size }}
          source={require('./assets/grey.png')}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginTop: 100,
  },

  checkContainer: {
    marginHorizontal: 15,
  },
  checkBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkText: {
    marginLeft: 10,
    fontSize: 13,
    fontWeight: 'normal',
    color: 'black',
  },
  underline: {
    textDecorationLine: 'underline',
    fontSize: 13,
    fontWeight: 'normal',
    color: 'black',
  },
});

const agreements = [
  {
    content: 'test1',
    checked: false,
  },
  {
    content: 'test2',
    checked: false,
  },
];

const AuthJoin = (props) => {
  const [data, setData] = useState(agreements);
  const [isChecked, setIsChecked] = useState(true);
  const [selectAll, setSelectAll] = useState(
    data.filter((item) => item.checked).length === data.length
  );
  const checkAll = () => {
    let newValue = data.filter((item) => item.checked).length === data.length;
    let temp = data.map((item) => {
      return { ...item, checked: !newValue };
    });
    setData(temp);

    console.log(temp);
  };
  const checkOne = (newValue, index) => {
    let temp = data.map((item, i) => {
      return index === i ? { ...item, checked: newValue } : item;
    });
    setData(temp);
    setIsChecked(!isChecked);
  };

  return (
    <>
      <View style={[styles.container]}>
        <View style={[styles.checkContainer]}>
          <View style={[styles.checkBox, { marginBottom: 20 }]}>
            <CheckBox
              isChecked={
                data.filter((item) => item.checked).length === data.length
              }
              onPress={checkAll}
              size={20}
            />
            <Text style={[styles.checkText]}>Select All</Text>
          </View>

          {data.map((item, index) => (
            <View
              style={[styles.checkBox, { justifyContent: 'space-between' }]}>
              <View style={[styles.checkBox, { marginBottom: 10 }]}>
                <CheckBoxWithoutSquare
                  isChecked={item.checked}
                  onPress={() => checkOne(!item.checked, index)}
                />
                <Text style={[styles.checkText]}>{item.content}</Text>
              </View>
              <TouchableOpacity>
                <Text style={[styles.underline]}>보기</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </>
  );
};

export default demo;