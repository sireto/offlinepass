import 'package:encrypted_shared_preferences/encrypted_shared_preferences.dart';
import 'package:flutter/material.dart';
import 'package:offlinepass/init_db.dart';
import 'package:offlinepass/services/notification.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/firstscreen.dart';
import 'package:offlinepass/screens/homescreen/homescreen.dart';
import 'package:offlinepass/themes.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await PushNotification().initialize();
  await InitDb.initialize();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    EncryptedSharedPreferences encryptedSharedPreferences =
        EncryptedSharedPreferences();
    return MaterialApp(
      theme: theme(),
      home: LayoutBuilder(builder: (context, constraints) {
        return OrientationBuilder(builder: (context, orientation) {
          screenHeight = constraints.maxHeight;
          screenWidth = constraints.maxWidth;
          return encryptedSharedPreferences.getString('msk') != null
              ? HomeScreen()
              : Firstscreen();
        });
      }),
    );
  }
}
