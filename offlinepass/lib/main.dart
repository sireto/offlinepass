import 'package:flutter/material.dart';
import 'package:offlinepass/components/notification.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/firstscreen.dart';
import 'package:offlinepass/themes.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await PushNotification().initialize();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: theme(),
      home: LayoutBuilder(builder: (context, constraints) {
        return OrientationBuilder(builder: (context, orientation) {
          screenHeight = constraints.maxHeight;
          screenWidth = constraints.maxWidth;
          return const Firstscreen();
        });
      }),
    );
  }
}
