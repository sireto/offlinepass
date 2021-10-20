import 'package:flutter/material.dart';
import 'package:offlinepass/color.dart';
import 'package:offlinepass/vault/newvault.dart';

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
              const SizedBox(
                height: 30,
              ),
              Text(
                "Offline Pass",
                style: TextStyle(fontSize: 20, color: textcolor),
              ),
              const SizedBox(
                height: 20,
              ),
              Text(
                "App for better password hygiene",
                style: TextStyle(color: textcolor, fontSize: 16),
              ),
              const SizedBox(
                height: 20,
              ),
              Container(
                  padding: const EdgeInsets.all(10),
                  height: 250,
                  child: const Image(image: AssetImage("asset/logo.png"))),
              const SizedBox(
                height: 90,
              ),
              Container(
                width: MediaQuery.of(context).size.width,
                height: 50,
                padding: const EdgeInsets.only(left: 20, right: 20),
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) => const NewVault()));
                  },
                  child: Text(
                    "New Vault",
                    style: TextStyle(color: textcolor, fontSize: 16),
                    textAlign: TextAlign.center,
                  ),
                  style: ElevatedButton.styleFrom(primary: Colors.grey),
                ),
              ),
              const SizedBox(
                height: 20,
              ),
              Container(
                width: MediaQuery.of(context).size.width,
                height: 50,
                padding: const EdgeInsets.only(left: 20, right: 20),
                child: ElevatedButton(
                  onPressed: () {},
                  child: Text(
                    "Recover Vault",
                    textAlign: TextAlign.center,
                    style: TextStyle(color: textcolor, fontSize: 16),
                  ),
                  style: ElevatedButton.styleFrom(primary: Colors.grey),
                ),
              ),
              const SizedBox(
                height: 10,
              )
            ],
          ),
        ),
      ),
    );
  }
}
