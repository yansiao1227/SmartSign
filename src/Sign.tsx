import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useData} from './model/DataContext';
import {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';

function Sign() {
  const {bledata}: any = useData();
  const [currentOne, setCurrentOne] = useState([]);
  const [currentTwo, setCurrentTwo] = useState([]);
  const [currentThree, setCurrentThree] = useState([]);
  const [currentFour, setCurrentFour] = useState([]);
  const [currentFive, setCurrentFive] = useState([]);
  const [currentSix, setCurrentSix] = useState([]);

  const [recording, setRecording] = useState(false);

  const startRecord = () => {
    bledata.current = {
      one: [],
      two: [],
      three: [],
      four: [],
      five: [],
      six: [],
    };
    setCurrentOne([]);
    setCurrentTwo([]);
    setCurrentThree([]);
    setCurrentFour([]);
    setCurrentFive([]);
    setCurrentSix([]);
    setRecording(true);
  };
  const stopRecord = () => {
    setCurrentOne(bledata.current.one);
    setCurrentTwo(bledata.current.two);
    setCurrentThree(bledata.current.three);
    if (bledata.current.four && bledata.current.five && bledata.current.six) {
      setCurrentFour(bledata.current.four);
      setCurrentFive(bledata.current.five);
      setCurrentSix(bledata.current.six);
    }

    setRecording(false);
  };

  return (
    <View style={{marginTop: 10}}>
      <TouchableOpacity
        style={[styles.buttonStyle, {marginBottom: 0}]}
        onPress={recording ? stopRecord : startRecord}>
        <Text style={styles.buttonText}>{recording ? '停止' : '开始'}录制</Text>
      </TouchableOpacity>
      <View style={{margin: 10, marginTop: 0}}>
        {recording ? (
          <Text style={[styles.text]}> 正在录制中...</Text>
        ) : (
          <ScrollView style={{marginTop: 10, maxHeight: 1000}}>
            <Text style={[styles.text]}>
              通道1: {JSON.stringify(currentOne)}
            </Text>
            <Text style={[styles.text]}>
              通道2: {JSON.stringify(currentTwo)}
            </Text>
            <Text style={[styles.text]}>
              通道3: {JSON.stringify(currentThree)}
            </Text>
            <Text style={[styles.text]}>
              通道4: {JSON.stringify(currentFour)}
            </Text>
            <Text style={[styles.text]}>
              通道5: {JSON.stringify(currentFive)}
            </Text>
            <Text style={[styles.text]}>
              通道6: {JSON.stringify(currentSix)}
            </Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: 'rgb(33, 150, 243)',
    margin: 10,
    justifyContent: 'center',
    borderColor: 'rgb(33, 150, 243)',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  text: {
    color: 'black',
  },
});
export default Sign;
