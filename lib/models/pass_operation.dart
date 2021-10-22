import 'package:get_it/get_it.dart';
import 'package:offlinepass/models/pass_model.dart';
import 'package:offlinepass/services/db_operation.dart';
import 'package:sembast/sembast.dart';

class PassOperation extends DbOperation {
  final Database _db = GetIt.I.get();

  StoreRef _store = intMapStoreFactory.store('password_store');

  @override
  Future add(PassModel passModel) async {
    var result = await _store.add(_db, passModel.toMap(passModel: passModel));
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
    if (passModel.id != null) {
      var result = await _store.record(passModel.id).exists(_db);
      return result;
    } else {
      return false;
    }
  }

  @override
  Future remove(PassModel passModel) async {
    // TODO: implement remove
    var result = await _store.record(passModel.id).delete(_db);
    return result;
  }
}
