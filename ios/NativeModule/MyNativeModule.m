#import <React/RCTBridgeModule.h>
#import <React/RCTLog.h>
# import "MyNativeModule.h"



@implementation MyNativeModule

RCT_EXPORT_MODULE();

// 示例方法：接收参数并返回结果（回调形式）
RCT_EXPORT_METHOD(processDataWithCallback:(NSString *)input resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  if ([input length] == 0) {
    reject(@"ERROR", @"Input cannot be empty", nil);
    return;
  }

  NSString *output = [NSString stringWithFormat:@"iOS processed: %@", [input uppercaseString]];
  resolve(output);
}

// 示例方法：接收对象参数并返回字典（Promise 形式）
RCT_EXPORT_METHOD(processDataWithPromise:(NSDictionary *)params resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString *text = params[@"text"];
  NSNumber *repeat = params[@"repeat"];

  if (!text || !repeat) {
    reject(@"INVALID_PARAMS", @"Missing 'text' or 'repeat'", nil);
    return;
  }

  NSMutableString *result = [NSMutableString string];
  for (int i = 0; i < [repeat integerValue]; i++) {
    [result appendString:text];
  }

  resolve(@{
    @"result": result,
    @"length": @(result.length)
  });
}

@end
