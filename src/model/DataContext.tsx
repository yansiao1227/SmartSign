import React, {createContext, useContext, useRef, useState} from 'react';
import BleProtocol from '../utils/BleProtocol';
import BleModule from '../utils/BleModule';

// 创建一个Context
const DataContext: any = createContext({
  bledata: {},
  bleProtocol: null,
  setBleProtocol: () => {},
  bleModule: null,
  setBleModule: () => {},
  bleState: false,
  setBleState: () => {},
});

// 创建一个Provider组件，用于在父组件中提供数据
export const DataProvider = ({children}: any) => {
  const bledata = useRef({
    one: [],
    two: [],
    three: [],
    four: [],
    five: [],
    six: [],
  });

  const [bleState, setBleState] = useState(false);
  // 注意: 需要确保全局只有一个实例，因为BleModule类保存着蓝牙的连接信息
  const [bleModule, setBleModule] = useState<any>(new BleModule());
  const [bleProtocol, setBleProtocol] = useState<any>(new BleProtocol());

  return (
    <DataContext.Provider
      value={{
        bledata,
        bleProtocol,
        setBleProtocol,
        bleModule,
        setBleModule,
        bleState,
        setBleState,
      }}>
      {children}
    </DataContext.Provider>
  );
};

// 创建一个自定义hook，方便在组件中使用上下文
export const useData = () => {
  return useContext(DataContext);
};
