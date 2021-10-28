import 'dart:io';

import 'package:get_it/get_it.dart';
import 'package:path_provider/path_provider.dart';
import 'package:path/path.dart';
import 'package:sembast/sembast.dart';
import 'package:sembast/sembast_io.dart';

class InitDb {
  static Future initialize() async {
    await _initSembast();
  }

  static Future _initSembast() async {
    final appDir = await getApplicationDocumentsDirectory();

    await appDir.create(recursive: true);
    GetIt.I.registerSingleton<Directory>(appDir);
    final databasePath = join(appDir.path, "offlinePass.db");

    final database = await databaseFactoryIo.openDatabase(databasePath);
    GetIt.I.registerSingleton<Database>(database);
    //GetIt.I.registerLazySingleton<UserModel>(() => UserModel());

    // if (userData != null) {
    // UserModel userModel = UserModel.fromMap(jsonDecode(userData));
    // GetIt.I.registerSingleton<UserModel>(userModel);
    //  }

    // CheckExpiration checkExpiration = CheckExpiration();
    // await checkExpiration.check();
  }
}
