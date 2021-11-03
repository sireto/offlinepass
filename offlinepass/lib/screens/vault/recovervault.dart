import 'package:encrypted_shared_preferences/encrypted_shared_preferences.dart';
import 'package:flutter/material.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/models/password_manager.dart';
import 'package:offlinepass/screens/homescreen/addhost.dart';
import 'package:offlinepass/screens/homescreen/homescreen.dart';
import 'package:bip39/bip39.dart' as bip39;
import 'package:offlinepass/screens/vault/recover_password.dart';

import '/themes.dart';

class Recovervault extends StatefulWidget {
  const Recovervault({Key? key}) : super(key: key);

  @override
  State<Recovervault> createState() => _RecovervaultState();
}

class _RecovervaultState extends State<Recovervault> {
  TextEditingController recovermsk = TextEditingController();
  FocusNode _mskFocus = FocusNode();
  bool isValue = false;
  @override
  void initState() {
    // TODO: implement initState
    _mskFocus.requestFocus();
    super.initState();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    _mskFocus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        title: const Text(
          "Recover Vault",
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              heightspace(10),
              const Text(
                "Master Security Key",
                style: TextStyle(
                  fontSize: 16,
                  fontFamily: 'TitilliumWeb',
                ),
              ),
              heightspace(20),
              Container(
                width: screenWidth,
                // height: 40,
                // margin: const EdgeInsets.all(10),
                // padding: const EdgeInsets.all(10),
                child: TextFormField(
                  controller: recovermsk,
                  focusNode: _mskFocus,
                  onChanged: (value) {
                    setState(() {
                      isValue = true;
                    });
                  },
                  onEditingComplete: () {
                    if (recovermsk.text == "") {
                      setState(() {
                        isValue = false;
                      });
                    }
                    setState(() {
                      _mskFocus.unfocus();
                    });
                  },
                  onSaved: (value) {
                    if (recovermsk.text == "") {
                      setState(() {
                        isValue = false;
                      });
                    }
                    setState(() {
                      _mskFocus.unfocus();
                    });
                  },
                  decoration: InputDecoration(
                      suffixIcon: isValue
                          ? IconButton(
                              onPressed: () {
                                recovermsk.clear();
                                setState(() {
                                  isValue = false;
                                });
                              },
                              icon: Icon(Icons.clear))
                          : null,
                      hintText: "Paste MSK here",
                      // label: const Text("MSK"),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8))),
                ),
              ),
              // heightspace(25),
              // const Text(
              //   "This is the only time the Master Security Key (MSK) is shown so copy the key and store it safely. You’ll need the key on the next screen..",
              //   style: TextStyle(
              //     fontFamily: 'TitilliumWeb',
              //     fontSize: 14,
              //   ),
              // ),
              // heightspace(10),
              // const Text(
              //   "Note: Without this key, the app can not recover your passwords later so please keep it safe and secure.",
              //   style: TextStyle(
              //     fontFamily: 'TitilliumWeb',
              //     fontSize: 14,
              //   ),
              // ),
              heightspace(25),
              Container(
                  height: 50,
                  width: screenWidth,
                  child: ElevatedButton(
                    onPressed: () async {
                      if (recovermsk.text == "" || recovermsk.text.isEmpty) {
                        const snackBar = SnackBar(
                          content: Text("Empty msk"),
                          duration: Duration(seconds: 1),
                        );
                        ScaffoldMessenger.of(context).showSnackBar(snackBar);
                      } else if (bip39.validateMnemonic(recovermsk.text) ==
                          false) {
                        const snackBar = SnackBar(
                          content: Text("Invalid msk"),
                          duration: Duration(seconds: 1),
                        );
                        ScaffoldMessenger.of(context).showSnackBar(snackBar);
                      } else
                      // print(recovermsk.text);
                      // EncryptedSharedPreferences encryptedSharedPreferences =
                      //     EncryptedSharedPreferences();
                      // encryptedSharedPreferences.setString(
                      //     'rmsk', recovermsk.text);

                      {
                        String entropy =
                            bip39.mnemonicToEntropy(recovermsk.text);
                        print(entropy);
                        EncryptedSharedPreferences encryptedSharedPreferences =
                            EncryptedSharedPreferences();
                        encryptedSharedPreferences.setString('msk', entropy);
                        PasswordManager.msk = entropy;
                        Navigator.pushAndRemoveUntil(
                            context,
                            MaterialPageRoute(
                                builder: (context) => HomeScreen()),
                            (route) => false);
                      }
                    },
                    child: const Text(
                      "Recover and get started",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 16,
                        fontFamily: 'TitilliumWeb',
                      ),
                      // style: TextStyle(color: ktextcolor, fontSize: 16),
                    ),
                    style: ElevatedButton.styleFrom(primary: kprimarycolor),
                  ))
            ],
          ),
        ),
      ),
    );
  }
}
