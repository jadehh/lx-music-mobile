//
//  Aes.m
//  Crypto
//
//  Created by 简得辉 on 2025/4/22.
//

# import "Aes.h"
#import <CommonCrypto/CommonCryptor.h>


@implementation AES

- (NSData *) decodeBase64:(NSString *) data{
    return  [[NSData alloc] initWithBase64EncodedString:data options:0];
}

-(NSString *) encodeBase64:(NSData *) data{
    return [data base64EncodedStringWithOptions:NSDataBase64Encoding64CharacterLineLength];
}

- (NSString *) encrypt:(NSString *)data key:(NSString *)key iv:(NSString *)iv mode:(NSString *)mode{
    // 参数解码
    NSData *textData = [[NSData alloc] initWithBase64EncodedString:data options:0];
    NSData *keyData = [[NSData alloc] initWithBase64EncodedString:key options:0];
    NSData *ivData = [[NSData alloc] initWithBase64EncodedString:iv options:0];
    size_t encryptedLength = 0;
    if ([mode isEqual: @"AES/CBC/PKCS7Padding"]){
        // 加密操作
        size_t bufferSize = textData.length + kCCBlockSizeAES128;
        void *buffer = malloc(bufferSize);
        CCCryptorStatus cryptStatus = CCCrypt(kCCEncrypt,
                                              kCCAlgorithmAES,
                                              kCCOptionPKCS7Padding,
                                              keyData.bytes,
                                              kCCKeySizeAES256,
                                              ivData.bytes,
                                              textData.bytes,
                                              textData.length,
                                              buffer,
                                              bufferSize,
                                              &encryptedLength);

        // 结果处理
        if (cryptStatus != kCCSuccess) {
            free(buffer);
            return nil;
        }
        NSData *encryptedData = [NSData dataWithBytesNoCopy:buffer length:encryptedLength];
        return [encryptedData base64EncodedStringWithOptions:0];
    }else if ([mode  isEqual: @"AES"]){
        NSData *paddedData = [self addPKCS7Padding:textData blockSize:kCCKeySizeAES128];
        size_t bufferSize = paddedData.length;
        void *buffer = malloc(bufferSize);
        CCCryptorStatus cryptStatus = CCCrypt(kCCEncrypt,
                                              kCCAlgorithmAES,
                                              kCCOptionECBMode, // ECB 模式
                                              keyData.bytes,
                                              keyData.length,
                                              NULL, // ECB 不需要 IV
                                              paddedData.bytes,
                                              paddedData.length,
                                              buffer,
                                              bufferSize,
                                              &encryptedLength);

        // 结果处理
        if (cryptStatus != kCCSuccess) {
            free(buffer);
            return nil;
        }
        NSData *encryptedData = [NSData dataWithBytesNoCopy:buffer length:bufferSize];
        return [encryptedData base64EncodedStringWithOptions:0];
    }else{
        return nil;
    }

}

- (NSData *)addPKCS7Padding:(NSData *)data blockSize:(size_t)blockSize {
    NSUInteger paddingLength = blockSize - (data.length % blockSize);
    NSMutableData *paddedData = [NSMutableData dataWithData:data];

    unsigned char padding[paddingLength];
    memset(padding, paddingLength, sizeof(padding));
    [paddedData appendBytes:padding length:paddingLength];

    return paddedData;
}

- (NSString *) decrypt:(NSString *)data key:(NSString *)key iv:(NSString *)iv mode:(NSString *)mode{
    NSData *textData = [[NSData alloc] initWithBase64EncodedString:data options:0];
    NSData *keyData = [[NSData alloc] initWithBase64EncodedString:key options:0];
    NSData *ivData = [[NSData alloc] initWithBase64EncodedString:iv options:0];
    size_t encryptedLength = 0;
    if ([mode isEqual: @"AES/CBC/PKCS7Padding"]){
        size_t bufferSize = textData.length + kCCBlockSizeAES128;
        void *buffer = malloc(bufferSize);
        CCCryptorStatus cryptStatus = CCCrypt(kCCDecrypt,
                                              kCCAlgorithmAES,
                                              kCCOptionPKCS7Padding,
                                              keyData.bytes,
                                              kCCKeySizeAES256,
                                              ivData.bytes,
                                              textData.bytes,
                                              textData.length,
                                              buffer,
                                              bufferSize,
                                              &encryptedLength);

        // 结果处理
        if (cryptStatus != kCCSuccess) {
            free(buffer);
            return nil;
        }
        NSData *encryptedData = [NSData dataWithBytesNoCopy:buffer length:encryptedLength];
        return [[NSString alloc] initWithData:encryptedData encoding:NSUTF8StringEncoding];
    }else if ([mode isEqual: @"AES"]){
        size_t bufferSize = textData.length;
        void *buffer = malloc(bufferSize);
        CCCryptorStatus cryptStatus = CCCrypt(kCCDecrypt,
                                              kCCAlgorithmAES,
                                              kCCOptionECBMode, // ECB 模式
                                              keyData.bytes,
                                              keyData.length,
                                              NULL, // ECB 不需要 IV
                                              textData.bytes,
                                              textData.length,
                                              buffer,
                                              bufferSize,
                                              &encryptedLength);

        // 结果处理
        if (cryptStatus != kCCSuccess) {
            free(buffer);
            return nil;
        }
        NSData *encryptedData = [NSData dataWithBytesNoCopy:buffer length:bufferSize];
        return [[NSString alloc] initWithData:[self removePKCS7Padding:encryptedData]  encoding:NSUTF8StringEncoding];
    } else{
        return nil;
    }
}

-(NSData *)removePKCS7Padding:(NSData *)paddedData  {
    const uint8_t *bytes = [paddedData bytes];
    // 获取最后一个字节的填充值
    uint8_t lastByte = bytes[paddedData.length - 1]; // 获取最后一个字节
    NSUInteger lastByteAsInteger = lastByte; // 将 uint8_t 转换为 NSUInteger
    return [paddedData subdataWithRange:NSMakeRange(0, paddedData.length - lastByteAsInteger)];
}
@end
