import 'package:flutter/material.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/screens/homescreen/addhost.dart';
import 'package:offlinepass/screens/homescreen/homescreen.dart';

import '/themes.dart';

class Recovervault extends StatelessWidget {
  const Recovervault({Key? key}) : super(key: key);

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
                  decoration: InputDecoration(
                      hintText: "Paste MSK here",
                      // label: const Text("MSK"),
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(8))),
                ),
              ),
              heightspace(25),
              const Text(
                "This is the only time the Master Security Key (MSK) is shown so copy the key and store it safely. You’ll need the key on the next screen..",
                style: TextStyle(
                  fontFamily: 'TitilliumWeb',
                  fontSize: 14,
                ),
              ),
              heightspace(10),
              const Text(
                "Note: Without this key, the app can not recover your passwords later so please keep it safe and secure.",
                style: TextStyle(
                  fontFamily: 'TitilliumWeb',
                  fontSize: 14,
                ),
              ),
              heightspace(25),
              Container(
                  height: 50,
                  width: screenWidth,
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.pushAndRemoveUntil(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const HomeScreen()),
                          (route) => false);
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
                    // style: ElevatedButton.styleFrom(primary: Colors.grey),
                  ))
            ],
          ),
        ),
      ),
    );
  }
}
