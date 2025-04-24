//
//  CryptoModule.m
//  LxMusicMobile
//
//  Created by 简得辉 on 2025/4/21.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
#import "CryptoModule.h"
#import "AES.h"
#import "Rsa.h"

@implementation CryptoModule

RCT_EXPORT_MODULE();

//AES
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(aesEncryptSync:(NSString *)data key:(NSString*)key iv:(NSString*)iv mode:(NSString*)mode){
  AES *aes = [[AES alloc] init];
  NSString *result = [aes encrypt:data key:key iv:iv mode:mode];
  NSLog(@"使用Aes异步加密,明文:%@,密文:%@,IV为:%@,mode为:%@,结果为:%@",data,key,iv,mode,result);
  return result;
};

RCT_EXPORT_METHOD(aesEncrypt:(NSString *)data key:(NSString*)key iv:(NSString*)iv mode:(NSString*)mode resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  AES *aes = [[AES alloc] init];
  NSString *result = [aes encrypt:data key:key iv:iv mode:mode];
  NSLog(@"使用Aes同步加密,明文:%@,密文:%@,IV为:%@,mode为:%@,结果为:%@",data,key,iv,mode,result);
  resolve(result);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(aesDecryptSync:(NSString *)data key:(NSString*)key iv:(NSString*)iv mode:(NSString*)mode){
  AES *aes = [[AES alloc] init];
  NSString *result = [aes decrypt:data key:key iv:iv mode:mode];
  NSLog(@"使用Aes异步解密,明文:%@,密文:%@,IV为:%@,mode为:%@,结果为:%@",data,key,iv,mode,result);
  return result;
};

RCT_EXPORT_METHOD(aesDecrypt:(NSString *)data key:(NSString*)key iv:(NSString*)iv mode:(NSString*)mode resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  AES *aes = [[AES alloc] init];
  NSString *result = [aes decrypt:data key:key iv:iv mode:mode];
  NSLog(@"使用Aes同步解密,明文:%@,密文:%@,IV为:%@,mode为:%@,结果为:%@",data,key,iv,mode,result);
  resolve(result);
}

//RSA操作
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(rsaEncryptSync:(NSString *)data publicKey:(NSString*)publicKey mode:(NSString*)mode){
  RSA *rsa = [[RSA alloc] init];
  NSString *result = [rsa encrypt:data publicKey:publicKey mode:mode];
  NSLog(@"使用RSA异步公钥加密,明文:%@,密文:%@,mode为:%@,结果为:%@",data,publicKey,mode,result);
  return result;
};

RCT_EXPORT_METHOD(rsaEncrypt:(NSString *)data publicKey:(NSString*)publicKey mode:(NSString*)mode resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  RSA *rsa = [[RSA alloc] init];
  NSString *result = [rsa encrypt:data publicKey:publicKey mode:mode];
  NSLog(@"使用RSA同步公钥加密,明文:%@,密文:%@,mode为:%@,结果为:%@",data,publicKey,mode,result);
  resolve(result);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(rsaDecryptSync:(NSString *)data privateKey:(NSString*)privateKey mode:(NSString*)mode){
  RSA *rsa = [[RSA alloc] init];
  NSString * result = [rsa decrypt:data privateKey:privateKey mode:mode];
  NSLog(@"使用RSA异步私钥解密,明文:%@,密文:%@,mode为:%@,结果为:%@",data,privateKey,mode,result);
  return result;
};

RCT_EXPORT_METHOD(rsaDecrypt:(NSString *)data privateKey:(NSString*)privateKey  mode:(NSString*)mode resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  RSA *rsa = [[RSA alloc] init];
  NSString * result = [rsa decrypt:data privateKey:privateKey mode:mode];
  NSLog(@"使用RSA同步私钥解密,明文:%@,密文:%@,mode为:%@,结果为:%@",data,privateKey,mode,result);
  resolve(result);
}

RCT_EXPORT_METHOD(generateRsaKey:resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  RSA *rsa = [[RSA alloc] init];
  NSDictionary * result = [rsa generateRsaKey];
  NSLog(@"使用RSA生成公钥和私钥:%@",result);
  resolve(result);
}
@end

