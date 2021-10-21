import 'package:flutter/material.dart';
import 'package:offline_pass/components/notification.dart';
import 'package:offline_pass/constants.dart';
import 'package:offline_pass/screens/newVault/newVault.dart';
import 'package:offline_pass/themes.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await PushNotification().initialize();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: theme(),
      home: LayoutBuilder(builder: (context, constraints) {
        return OrientationBuilder(builder: (context, orientation) {
          screenHeight = constraints.maxHeight;
          screenWidth = constraints.maxWidth;
          return NewVaultScreen();
        });
      }),
    );
  }
}
