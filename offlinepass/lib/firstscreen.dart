import 'package:flutter/material.dart';
import 'package:local_auth/local_auth.dart';
import 'package:offlinepass/components/local_auth_api.dart';
import 'package:offlinepass/constants.dart';
import 'package:offlinepass/main.dart';
import 'package:offlinepass/themes.dart';
import 'package:offlinepass/screens/vault/newvault.dart';
import 'package:offlinepass/screens/vault/recovervault.dart';
import 'package:shared_preferences/shared_preferences.dart';

class Firstscreen extends StatefulWidget {
  const Firstscreen({Key? key}) : super(key: key);

  @override
  _FirstscreenState createState() => _FirstscreenState();
}

class _FirstscreenState extends State<Firstscreen> {
  final LocalAuthentication auth = LocalAuthentication();
  _SupportState _supportState = _SupportState.unknown;
  bool authenticate = false;
  @override
  void initState() {
    super.initState();
    auth.isDeviceSupported().then(
          (isSupported) => setState(() => _supportState = isSupported
              ? _SupportState.supported
              : _SupportState.unsupported),
        );
    //LocalAuthApi.authenticate();
    Future.delayed(Duration(seconds: 1)).then((value) {
      (fingerprints == true && pincodes == null) ? biometric() : null;
    });
  }

  Future biometric() async {
    final isauthenticate = await LocalAuthApi.authenticate();
    if (isauthenticate) {
      setState(() {
        authenticate = true;
      });
    }
  }

  // biometric() {
  //   if (_supportState == _SupportState.unknown) {
  //     return CircularProgressIndicator();
  //   } else if (_supportState == _SupportState.supported) {
  //     return buildButton(
  //       text: 'Authenticate',
  //       icon: Icons.lock_open,
  //       onClicked: () async {
  //         final isAuthenticated = await LocalAuthApi.authenticate();
  //         print("i am out");
  //         if (isAuthenticated) {
  //           print("i am in");
  //           // Navigator.of(context).pushReplacement(
  //           //   MaterialPageRoute(builder: (context) => const Homepage()),
  //           // );
  //         }
  //       },
  //     );
  //   } else {
  //     return const Center(child: Text("Not supported"));
  //   }
  // }

  // Widget buildButton({
  //   required String text,
  //   required IconData icon,
  //   required VoidCallback onClicked,
  // }) =>
  //     ElevatedButton.icon(
  //       style: ElevatedButton.styleFrom(
  //         minimumSize: const Size.fromHeight(50),
  //       ),
  //       icon: Icon(icon, size: 26),
  //       label: Text(
  //         text,
  //         style: const TextStyle(fontSize: 20),
  //       ),
  //       onPressed: onClicked,
  //     );
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
                width: screenWidth,
                height: 50,
                padding: const EdgeInsets.only(left: 20, right: 20),
                child: ElevatedButton(
                  onPressed: () {
                    //   print(_supportState);
                    //   final isAuthenticated = await LocalAuthApi.authenticate();
                    //   print("i am out");
                    //   if (isAuthenticated) {
                    //     print("i am in");
                    // Navigator.of(context).pushReplacement(
                    //   MaterialPageRoute(
                    //       builder: (context) => const Homepage()),
                    // );
                    //  }
                    //await LocalAuthApi.authenticate();
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
                width: screenWidth,
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

enum _SupportState {
  unknown,
  supported,
  unsupported,
}
