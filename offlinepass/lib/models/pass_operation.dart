import 'package:get_it/get_it.dart';
import 'package:offlinepass/models/pass_model.dart';
import 'package:offlinepass/models/password_manager.dart';
import 'package:offlinepass/services/db_operation.dart';
import 'package:sembast/sembast.dart';
import 'package:shared_preferences/shared_preferences.dart';

class PassOperation extends DbOperation {
  final Database _db = GetIt.I.get();

  StoreRef _store = intMapStoreFactory.store('password_store');

  @override
  Future add(PassModel passModel) async {
    var data = passModel.toMap(passModel: passModel);
    var preferences = await SharedPreferences.getInstance();
    int? index = preferences.getInt('$data');
    if (index == null || index == '') {
      preferences.setInt('$data', 0);
    } else {
      preferences.setInt('$data', ++index);
    }
    var result = await _store.add(_db, data);
    return result;
  }

  @override
  Future<List<PassModel>> getAll() async {
    final snapshots = await _store.find(_db);

    return snapshots
        .map((snapshot) => PassModel.fromMap(snapshot.key, snapshot.value))
        .toList();
  }

  @override
  Future update(PassModel passModel) async {
    await _store.record(passModel.id).update(_db, passModel.toMap());
  }

  @override
  Future get(int id) async {
    var data = await _store.record(id).get(_db);
    return PassModel.fromMap(id, data);
  }

  @override
  Future contain(PassModel passModel) async {
    var map = passModel.toMap(passModel: passModel);
    //if (passModel.id != null) {
    var result = await _store.find(_db,
        finder: Finder(
            filter: Filter.and(map.entries
                .map((e) => Filter.equals(e.key, e.value))
                .toList())));
    print(result);
    return result.isNotEmpty ? true : false;
    // } else {
    //   return false;
    // }
  }

  @override
  Future remove(PassModel passModel) async {
    // TODO: implement remove
    var data = passModel.toMap(passModel: passModel);
    PasswordManager.preferences.remove('$data');
    var result = await _store.record(passModel.id).delete(_db);
    return result;
  }

  @override
  Future isEmpty() async {
    List<RecordSnapshot<dynamic, dynamic>> snapshots = await _store.find(_db);
    print(snapshots);
    print(snapshots.length);
    return snapshots.isEmpty ? true : false;
  }
}
