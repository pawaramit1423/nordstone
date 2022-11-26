#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
@import UIKit;
@import FirebaseCore;


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application
    didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [FIRApp configure];

  return YES;
}

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
