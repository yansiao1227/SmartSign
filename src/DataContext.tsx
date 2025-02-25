import React, {createContext, useContext, useState} from 'react';

// 创建一个Context
const DataContext: any = createContext({
  bleState: false,
  setBleState: () => {},
  formatDataOne: [],
  setFormatDataOne: () => {},
  formatDataTwo: [],
  setFormatDataTwo: () => {},
  formatDataThree: [],
  setFormatDataThree: () => {},
});

// 创建一个Provider组件，用于在父组件中提供数据
export const DataProvider = ({children}: any) => {
  const [formatDataOne, setFormatDataOne] = useState([]);
  const [formatDataTwo, setFormatDataTwo] = useState([]);
  const [formatDataThree, setFormatDataThree] = useState([]);
  const [bleState, setBleState] = useState(false);
  return (
    <DataContext.Provider
      value={{
        bleState,
        setBleState,
        formatDataOne,
        setFormatDataOne,
        formatDataTwo,
        setFormatDataTwo,
        formatDataThree,
        setFormatDataThree,
      }}>
      {children}
    </DataContext.Provider>
  );
};

// 创建一个自定义hook，方便在组件中使用上下文
export const useData = () => {
  return useContext(DataContext);
};
