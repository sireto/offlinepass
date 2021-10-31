import 'package:offlinepass/models/pass_model.dart';

abstract class DbOperation {
  // add password to local (returns key)
  Future add(PassModel passModel);

  //update password to local
  Future update(PassModel passModel);

  // gets all password from local
  Future<List<PassModel>> getAll();

  //get password based on id(key)
  Future get(int id);

  // checks if the passModel is contains( returns bool)
  Future contain(PassModel passModel);

  // removes passModel
  Future remove(PassModel passModel);

  // checks if db is empty or not
  Future isEmpty();
}
