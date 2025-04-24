import {  NativeModules } from 'react-native'

const { MyNativeModule } = NativeModules

export const processDataWithCallback = async (input) => {
  try {
    const result = await MyNativeModule.processDataWithCallback(input);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

// Promise 形式调用（支持对象参数）
export const processDataWithPromise = (params) => {
  return MyNativeModule.processDataWithPromise(params);
};
