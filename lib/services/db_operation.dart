import 'package:offlinepass/models/pass_model.dart';

abstract class DbOperation {
  // add password to local (returns key)
  Future add(PassModel passModel);

  //update password to local
  Future update(PassModel passModel);

  // gets all password from local
  Future<List<dynamic>> getAll();

  //get password based on id(key)
  Future get(int id);

  // checks if the subscription is contains( returns bool)
  Future contain(PassModel passModel);
}
