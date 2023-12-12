adb -s <device name> reverse tcp:8081 tcp:8081


<!-- Build release apk -->
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res