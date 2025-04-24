//
//  Rsa.h
//  Crypto
//
//  Created by 简得辉 on 2025/4/23.
//
#import <Foundation/Foundation.h>

@interface RSA : NSObject
- (NSString *) encrypt:(NSString *)data publicKey:(NSString *)publicKey mode:(NSString *)mode;
- (NSString *) decrypt:(NSString *)data privateKey:(NSString *)privateKey mode:(NSString *)mode;
- (NSDictionary *) generateRsaKey;
@end
