import 'package:encrypted_shared_preferences/encrypted_shared_preferences.dart';
import 'package:flutter/material.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/models/password_manager.dart';
import 'package:offlinepass/screens/homescreen/addhost.dart';
import 'package:offlinepass/screens/homescreen/homescreen.dart';
import 'package:offlinepass/themes.dart';

class Confirmvault extends StatefulWidget {
  final String msk;
  final String entropy;
  const Confirmvault({Key? key, required this.msk, required this.entropy})
      : super(key: key);

  @override
  _ConfirmvaultState createState() => _ConfirmvaultState();
}

class _ConfirmvaultState extends State<Confirmvault> {
  TextEditingController _mskController = TextEditingController();
  FocusNode _mskfocus = FocusNode();
  bool isValue = false;
  @override
  void initState() {
    // TODO: implement initState
    _mskfocus.requestFocus();
    super.initState();
  }

  @override
  void dispose() {
    // TODO: implement dispose
    _mskController.dispose();
    _mskfocus.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    print(widget.msk);
    return Scaffold(
      appBar: AppBar(
        // iconTheme: const IconThemeData(color: Colors.black),
        title: const Text(
          "Confirm Vault",
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
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.w400
                    //  fontFamily: 'TitilliumWeb',
                    ),
              ),
              heightspace(20),
              Container(
                width: screenWidth,
                // height: 40,
                // margin: const EdgeInsets.all(10),
                // padding: const EdgeInsets.all(10),
                child: TextFormField(
                  controller: _mskController,
                  focusNode: _mskfocus,
                  onSaved: (value) {
                    if (_mskController.text == "") {
                      setState(() {
                        isValue = false;
                      });
                    }
                    setState(() {
                      _mskfocus.unfocus();
                    });
                  },
                  onChanged: (value) {
                    setState(() {
                      isValue = true;
                    });
                  },
                  onEditingComplete: () {
                    if (_mskController.text == "") {
                      setState(() {
                        isValue = false;
                      });
                    }
                    setState(() {
                      _mskfocus.unfocus();
                    });
                  },
                  style: TextStyle(fontSize: 16, fontWeight: FontWeight.w400),
                  decoration: InputDecoration(
                      hintText: "Paste MSK here",
                      suffixIcon: isValue
                          ? IconButton(
                              onPressed: () {
                                _mskController.clear();
                                setState(() {
                                  isValue = false;
                                });
                              },
                              icon: Icon(Icons.clear))
                          : null,
                      // label: const Text("MSK"),
                      hintStyle:
                          TextStyle(fontSize: 15, fontWeight: FontWeight.w400),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8))),
                ),
              ),
              // heightspace(25),
              // Text(
              //   "This is the only time the Master Security Key (MSK) is shown so copy the key and store it safely. You’ll need the key on the next screen..",
              //   style: TextStyle(
              //       fontFamily: 'TitilliumWeb',
              //       fontSize: 14,
              //       color: Colors.grey.shade700),
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
                    onPressed: () {
                      if (_mskController.text != "") {
                        if (_mskController.text == widget.msk) {
                          final snackBar = SnackBar(
                            content: Text("Vault created successfully"),
                            backgroundColor: Colors.grey.shade600,
                            duration: Duration(seconds: 1),
                          );
                          EncryptedSharedPreferences
                              encryptedSharedPreferences =
                              EncryptedSharedPreferences();
                          encryptedSharedPreferences.setString(
                              'msk', widget.entropy);
                          PasswordManager.msk = widget.entropy;
                          ScaffoldMessenger.of(context).showSnackBar(snackBar);
                          Navigator.pushAndRemoveUntil(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => HomeScreen()),
                              (r) => false);
                        } else {
                          final snackBar = SnackBar(
                            content: Text("MSK doesnot matched!!"),
                            backgroundColor: Colors.grey.shade600,
                          );
                          ScaffoldMessenger.of(context).showSnackBar(snackBar);
                        }
                      } else {
                        final snackBar = SnackBar(
                          content: Text("Please paste your MSK!!"),
                          backgroundColor: Colors.grey.shade600,
                        );
                        ScaffoldMessenger.of(context).showSnackBar(snackBar);
                      }
                    },
                    child: const Text(
                      "Confirm and get started",
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 15,
                        //  fontFamily: 'TitilliumWeb',
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
