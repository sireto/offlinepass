import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:local_auth/local_auth.dart';
import 'package:offlinepass/lockscreen.dart';
import 'package:offlinepass/main.dart';
import 'package:offlinepass/themes.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:toggle_switch/toggle_switch.dart';

class Unlocksettings extends StatefulWidget {
  const Unlocksettings({Key? key}) : super(key: key);

  @override
  State<Unlocksettings> createState() => _UnlocksettingsState();
}

class _UnlocksettingsState extends State<Unlocksettings> {
  int initialindex = 0;
  int fingerprintinitialindex = 0;
  final LocalAuthentication auth = LocalAuthentication();
  _SupportState _supportState = _SupportState.unknown;

  @override
  void initState() {
    // TODO: implement initState
    getstring();
    pincodes != null ? initialindex = 1 : 0;
    fingerprints == true ? fingerprintinitialindex = 1 : 0;
    auth.isDeviceSupported().then((isSupported) => setState(() =>
        _supportState =
            isSupported ? _SupportState.supported : _SupportState.unsupported));
    super.initState();
  }

  getstring() async {
    SharedPreferences sharedPreferences = await SharedPreferences.getInstance();
    pincodes = sharedPreferences.getString("pincode");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        iconTheme: const IconThemeData(color: Colors.white),
        title: const Text(
          "Unlock Settings",
          style: TextStyle(
            fontFamily: 'TitilliumWeb',
          ),
        ),
        centerTitle: false,
      ),
      body: SafeArea(
        child: Column(
          children: [
            heightspace(10),
            Padding(
              padding: const EdgeInsets.all(10.0),
              child: Card(
                // color: Colors.grey,
                shape: RoundedRectangleBorder(
                    side: BorderSide(
                  color: Colors.grey.withOpacity(0.2),
                  width: 1,
                )),
                child: Container(
                  padding: const EdgeInsets.all(10),
                  child: Column(
                    children: [
                      InkWell(
                        onTap: () {
                          Future value = Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => const Lockscreen(
                                        from: "putpincode",
                                      )));
                          value.then((value) async {
                            SharedPreferences pref =
                                await SharedPreferences.getInstance();
                            pref.setString("pincode", value);
                            if (value != null) {
                              setState(() {
                                initialindex = 1;
                              });
                              const snackBar = SnackBar(
                                content: Text("Pincode set successfully"),
                                duration: Duration(milliseconds: 500),
                              );
                              ScaffoldMessenger.of(context)
                                  .showSnackBar(snackBar);
                            }
                          });
                        },
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                const Icon(FontAwesomeIcons.lock),
                                widthspace(20),
                                const Text(
                                  "Pin code",
                                  style: TextStyle(
                                      fontSize: 20, fontFamily: 'TitilliumWeb'),
                                )
                              ],
                            ),
                            ToggleSwitch(
                              minWidth: 50.0,
                              cornerRadius: 20.0,
                              activeBgColors: [
                                [Colors.green[800]!],
                                [Colors.red[800]!]
                              ],
                              activeFgColor: Colors.white,
                              inactiveBgColor: Colors.grey,
                              inactiveFgColor: Colors.white,
                              initialLabelIndex: initialindex,
                              totalSwitches: 2,
                              labels: ['Off', 'On'],
                              radiusStyle: true,
                              onToggle: (index) async {
                                SharedPreferences sharedPreferences =
                                    await SharedPreferences.getInstance();
                                print('switched to: $index');
                                if (index == 1) {
                                  setState(() {
                                    initialindex = 0;
                                  });

                                  Future value = Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) =>
                                              const Lockscreen(
                                                from: "putpincode",
                                              )));
                                  value.then((value) {
                                    sharedPreferences.setString(
                                        "pincode", value);
                                    if (value != null) {
                                      setState(() {
                                        initialindex = 1;
                                      });
                                      const snackBar = SnackBar(
                                        content:
                                            Text("Pincode set successfully"),
                                        duration: Duration(milliseconds: 500),
                                      );
                                      ScaffoldMessenger.of(context)
                                          .showSnackBar(snackBar);
                                    }
                                  });
                                } else if (index == 0) {
                                  setState(() {
                                    initialindex = 0;
                                  });
                                  sharedPreferences.remove("pincode");
                                  String? hello =
                                      sharedPreferences.getString("pincode");
                                  print("$hello");
                                }
                              },
                            ),
                          ],
                        ),
                      ),
                      _supportState == _SupportState.supported
                          ? heightspace(30)
                          : heightspace(0),
                      _supportState == _SupportState.supported
                          ? Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Row(
                                  children: [
                                    const Icon(FontAwesomeIcons.fingerprint),
                                    widthspace(20),
                                    const Text(
                                      "Fingerprint Lock",
                                      style: TextStyle(
                                          fontSize: 20,
                                          fontFamily: 'TitilliumWeb'),
                                    )
                                  ],
                                ),
                                ToggleSwitch(
                                  minWidth: 50.0,
                                  cornerRadius: 20.0,
                                  activeBgColors: [
                                    [Colors.green[800]!],
                                    [Colors.red[800]!]
                                  ],
                                  activeFgColor: Colors.white,
                                  inactiveBgColor: Colors.grey,
                                  inactiveFgColor: Colors.white,
                                  initialLabelIndex: fingerprintinitialindex,
                                  totalSwitches: 2,
                                  labels: ['Off', 'On'],
                                  radiusStyle: true,
                                  onToggle: (index) async {
                                    SharedPreferences sharedPreferences =
                                        await SharedPreferences.getInstance();
                                    print('switched to: $index');
                                    if (index == 0) {
                                      setState(() {
                                        fingerprintinitialindex = 0;
                                      });
                                      sharedPreferences.remove("fingerprints");
                                    } else if (index == 1) {
                                      sharedPreferences.setBool(
                                          "fingerprints", true);
                                    }
                                  },
                                ),
                              ],
                            )
                          : heightspace(0)
                    ],
                  ),
                  color: Colors.white54,
                ),
              ),
            )
          ],
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
