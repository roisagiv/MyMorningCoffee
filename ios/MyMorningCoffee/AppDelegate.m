/**
 * Copyright (c) 2015-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>
#import <ReactNativeConfig.h>

@import Firebase;

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [self configureFirebase];
  
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];

  return YES;
}

- (void) configureFirebase {
  NSString* googleAppId = [ReactNativeConfig envFor:@"FIREBASE_APP_ID"];
  NSString* gcmSenderID = [ReactNativeConfig envFor:@"FIREBASE_MESSAGING_SENDER_ID"];
  FIROptions* options = [[FIROptions alloc] initWithGoogleAppID:googleAppId
                                                    GCMSenderID:gcmSenderID];
  options.databaseURL = [ReactNativeConfig envFor:@"FIREBASE_DATABASE_URL"];
  options.projectID = [ReactNativeConfig envFor:@"FIREBASE_PROJECT_ID"];
  options.APIKey = [ReactNativeConfig envFor:@"FIREBASE_API_KEY"];
  [FIRApp configureWithOptions:options];
}

@end
