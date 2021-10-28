import 'package:flutter/material.dart';
import 'package:offlinepass/components/notification.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/firstscreen.dart';
import 'package:offlinepass/init_db.dart';
import 'package:offlinepass/lockscreen.dart';
import 'package:offlinepass/themes.dart';
import 'package:shared_preferences/shared_preferences.dart';

String? pincodes;
bool? fingerprints;
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
  pincodes = sharedPreferences.getString("pincode");
  fingerprints = sharedPreferences.getBool("fingerprints");
  // await PushNotification().initialize();
  await InitDb.initialize();
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
          return pincodes != null
              ? const Lockscreen(
                  from: "main",
                )
              : const Firstscreen();
        });
      }),
    );
  }
}
