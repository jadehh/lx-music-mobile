//
//  Aes.h
//  Crypto
//
//  Created by 简得辉 on 2025/4/22.
//

#import <Foundation/Foundation.h>

@interface AES : NSObject
- (NSString *) encrypt:(NSString *)data key:(NSString *)key iv:(NSString *)iv mode:(NSString *)mode;
- (NSString *) decrypt:(NSString *)data key:(NSString *)key iv:(NSString *)iv mode:(NSString *)mode;
@end
