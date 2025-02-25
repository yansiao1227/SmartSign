import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useData} from './DataContext';
import {useEffect, useState} from 'react';
import axios from 'axios';

function Sign() {
  const {
    formatDataOne,
    setFormatDataOne,
    formatDataTwo,
    setFormatDataTwo,
    formatDataThree,
    setFormatDataThree,
  }: any = useData();
  const [currentOne, setCurrentOne] = useState([]);
  const [currentTwo, setCurrentTwo] = useState([]);
  const [currentThree, setCurrentThree] = useState([]);
  const [recording, setRecording] = useState(false);
  const [requesting, setRequesting] = useState(false);
  const [result, setResult] = useState('');
  const startRecord = () => {
    setResult('');
    setFormatDataOne([]);
    setFormatDataTwo([]);
    setFormatDataThree([]);
    setRecording(true);
  };
  const stopRecord = () => {
    setCurrentOne(formatDataOne);
    setCurrentTwo(formatDataTwo);
    setCurrentThree(formatDataThree);
    setRecording(false);
  };
  function transposeMatrix(matrix: any) {
    return matrix[0].map((_: any, colIndex: any) =>
      matrix.map((row: any) => row[colIndex]),
    );
  }
  const sendData = () => {
    setRequesting(true);
    if (currentOne.length < 5) {
      Alert.alert('录制时间过短');
      return;
    }

    const tempDt = [
      currentOne,
      currentTwo,
      currentThree,
      Array.from({length: currentOne.length}, () => '0'),
      Array.from({length: currentOne.length}, () => '0'),
    ];
    const matrix = transposeMatrix(tempDt);
    // 接口
    axios
      .post('http://211.159.224.160:8000/predict/', {
        matrix: matrix,
      })
      .then(res => {
        setResult(res.data.result);
        setRequesting(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={{marginTop: 10}}>
      <TouchableOpacity
        style={[styles.buttonStyle, {marginBottom: 0}]}
        onPress={recording ? stopRecord : startRecord}>
        <Text style={styles.buttonText}>{recording ? '停止' : '开始'}录制</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonStyle]} onPress={sendData}>
        <Text style={styles.buttonText}>{'发送请求'}</Text>
      </TouchableOpacity>
      <View style={{margin: 10, marginTop: 0}}>
        {requesting ? (
          <ActivityIndicator size="large" color="rgb(33, 150, 243)" />
        ) : result ? (
          <Text>{result}</Text>
        ) : recording ? (
          <Text> 正在录制中...</Text>
        ) : (
          <View>
            <Text>通道1: {JSON.stringify(currentOne)}</Text>
            <Text>通道2: {JSON.stringify(currentTwo)}</Text>
            <Text>通道3: {JSON.stringify(currentThree)}</Text>
          </View>
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
});
export default Sign;
