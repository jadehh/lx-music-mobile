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


@implementation CryptoModule

RCT_EXPORT_MODULE();


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
  resolve([aes encrypt:data key:key iv:iv mode:mode]);
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
  resolve([aes encrypt:data key:key iv:iv mode:mode]);
}



@end

