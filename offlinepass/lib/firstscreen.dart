import 'package:flutter/material.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/themes.dart';
import 'package:offlinepass/vault/newvault.dart';
import 'package:offlinepass/vault/recovervault.dart';

class Firstscreen extends StatefulWidget {
  const Firstscreen({Key? key}) : super(key: key);

  @override
  _FirstscreenState createState() => _FirstscreenState();
}

class _FirstscreenState extends State<Firstscreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            mainAxisSize: MainAxisSize.max,
            children: [
              heightspace(30),
              const Text(
                "Offline Pass",
                style: TextStyle(fontSize: 20, color: ktextcolor),
              ),
              heightspace(20),
              const Text(
                "App for better password hygiene",
                style: TextStyle(color: ktextcolor, fontSize: 16),
              ),
              heightspace(30),
              Container(
                  padding: const EdgeInsets.all(10),
                  height: 250,
                  child: const Image(image: AssetImage("asset/logo.png"))),
              heightspace(30),
              Container(
                width: MediaQuery.of(context).size.width,
                height: 50,
                padding: const EdgeInsets.only(left: 20, right: 20),
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const NewVaultScreen()));
                  },
                  child: const Text(
                    "New Vault",
                    style: TextStyle(
                      fontSize: 16,
                      fontFamily: 'TitilliumWeb',
                    ),
                    // style: TextStyle(color: ktextcolor, fontSize: 16),
                    textAlign: TextAlign.center,
                  ),
                  //  style: ElevatedButton.styleFrom(primary: Colors.grey),
                ),
              ),
              heightspace(20),
              Container(
                width: MediaQuery.of(context).size.width,
                height: 50,
                padding: const EdgeInsets.only(left: 20, right: 20),
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const Recovervault()));
                  },
                  child: const Text(
                    "Recover Vault",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                      fontSize: 16,
                      fontFamily: 'TitilliumWeb',
                    ),
                    //style: TextStyle(color: ktextcolor, fontSize: 16),
                  ),
                  // style: ElevatedButton.styleFrom(primary: Colors.grey),
                ),
              ),
              heightspace(10),
            ],
          ),
        ),
      ),
    );
  }
}
